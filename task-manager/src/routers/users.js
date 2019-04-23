const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');

const User = require('../models/users')

//For create new user //We don't care when async return the promise because we didn' use it and express didn't care anyway
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({user,token})
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//Loging in
router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token })
    }
    catch(err){
        res.status(400).send()
    }

})

//Loging out
router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }
    catch(err){
        res.status(500).send()
    }
})

//Loging out all the token
router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save()
        res.send()
    }
    catch(err){
        res.status(500).send()
    }
})


//Fetch myself
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

//Fetch user by id
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id //from the /users/:id
    try{
        const user = await User.findById(_id)
        if(!user) return res.status(404).send() //if user = null is mean that there is not this user in db so we just send 404 not found
        //this line below will not run when 'return' is excute (when user = null and trigger if statement)
        res.send(user)
    }
    catch(err){
        res.status(500).send()
    }
})

//Update a user
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body) //return a string of keys of that object
    const allowUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowUpdates.includes(update))
    //check if the updates is valid to do
    if(isValidOperation == false){
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    //actually update the data
    try{
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const user = await User.findById(req.params.id)
        updates.forEach(update => user[update] = req.body[update]);
        await user.save()
        
        if(!user) return res.status(404).send()
        res.send(user)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//Delete the user
router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).send()
        res.send(user)
    }
    catch(err){
        res.status(500).send(err)
    }

})






module.exports = router