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
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user) return res.status(404).send()

        res.send(user)
    }
    catch(err){
        res.status(500).send()
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







app.listen(port, () => console.log(`Server is up on port ${port}`))