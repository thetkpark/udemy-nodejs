const express = require('express');

require('./db/mongoose'); //For mongodb connection
const User = require('./models/users');
const Task = require('./models/tasks');

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json()) //automatically parse json to object

//For create new user //We don't care when async return the promise because we didn' use it and express didn't care anyway
app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//Fetch all users
app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }
    catch (err) {
        res.status(500).send()
    }
})

//Fetch user by id
app.get('/users/:id', async (req, res) => {
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
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body) //return a string of keys of that object
    const allowUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowUpdates.includes(update))
    //check if the updates is valid to do
    if(isValidOperation == false){
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    //actually update the data
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!user) return res.status(404).send()
        res.send(user)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//Delete the user
app.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).send()
        res.send(user)
    }
    catch(err){
        res.status(500).send(err)
    }

})



/////////////TASKS SECTION///////////////////



//For create new task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

//Fetch all tasks
app.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }
    catch(err){
        res.status(500).send()
    }
})

//Fetch task by id
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id)
        if(!task) return res.status(404).send()
        res.send(task)
    }
    catch(err){
        res.status(500).send()
    }
})

//Update a task
app.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const allowUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowUpdates.includes(update))

    if(isValidOperation == false){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if(!task) return res.status(404).send()
        res.send(task)
    }
    catch(err){
        res.status(400).send(err)
    }

})

//Delete the task 
app.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).send()
        res.send(task)
    }
    catch(err){
        res.status(500).send(err)
    }
})





app.listen(port, () => console.log(`Server is up on port ${port}`))