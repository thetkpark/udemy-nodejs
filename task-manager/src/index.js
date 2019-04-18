const express = require('express');

require('./db/mongoose'); //For mongodb connection
const User = require('./models/users');
const Task = require('./models/tasks');

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json()) //automatically parse json to object

//For create new user
app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save()
    .then( () => res.status(201).send(user))
    .catch(err => res.status(400).send(err))
})

//For create new task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save()
    .then( () => res.status(201).send(task))
    .catch(err => res.status(400).send(err))
})

//Fetch all users
app.get('/users', (req, res) => {
    User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send())
})

//Fetch user by id
app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id)
    .then(user => {
        if(!user) return res.status(404).send()

        res.send(user)
    })
    .catch(err => res.status(500).send())
})

//Fetch all tasks
app.get('/tasks', (req, res) => {
    Task.find()
    .then(tasks => res.send(tasks))
    .catch(err => res.status(500).send())
})

//Fetch task by id
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id)
    .then(task => {
        if(!task) return res.status(404).send()
        res.send(task)
    })
    .catch(err => res.status(500).send())
})







app.listen(port, () => console.log(`Server is up on port ${port}`))