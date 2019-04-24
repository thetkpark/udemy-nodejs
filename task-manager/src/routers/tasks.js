const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');

const Task = require('../models/tasks');

//For create new task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body, //spread the req.body to key pair value 
        owner: req.user._id
    });
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

// /GET /tasks?completed=true or false
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    try{
        await req.user.populate({
            path: 'tasks',
            match: match
        }).execPopulate()
        res.send(req.user.tasks)
    }
    catch(err){
        res.status(500).send()
    }
})

//Fetch task by id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try{
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task) return res.status(404).send()
        res.send(task)
    }
    catch(err){
        res.status(500).send()
    }
})

//Update a task
router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const allowUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowUpdates.includes(update))

    if(isValidOperation == false){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        //const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        //const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task) return res.status(404).send()

        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        res.send(task)
    }
    catch(err){
        res.status(400).send(err)
    }

})

//Delete the task 
router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if(!task) return res.status(404).send()
        res.send(task)
    }
    catch(err){
        res.status(500).send(err)
    }
})


module.exports = router
