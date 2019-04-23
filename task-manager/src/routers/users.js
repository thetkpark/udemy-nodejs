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

/////////////Need to authen////////////


//Fetch myself
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})


//Update a user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body) //return a string of keys of that object
    const allowUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowUpdates.includes(update))
    //check if the updates is valid to do
    if(isValidOperation == false){
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    //actually update the data
    try{
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) //it bypass the mongoose middleware
        //const user = await User.findById(req.params.id) //we have req.user already from auth middleware
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save()
        
        res.send(req.user)
    }
    catch(err){
        res.status(400).send(err)
    }
})


//Delete the user
router.delete('/users/me', auth, async (req, res) => {
    try{
        // req.user = user docuemtnfrom auth middleware
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user) return res.status(404).send()
        await req.user.remove()

        res.send(req.user)
    }
    catch(err){
        res.status(500).send(err)
    }

})






module.exports = router