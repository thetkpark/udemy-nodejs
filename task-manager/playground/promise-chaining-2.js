require('../src/db/mongoose');
const Task = require('../src/models/tasks');

/*
Task.findByIdAndDelete('5cb84e87c80c740df7677be9')
.then(res => {
    console.log(res)
    return Task.countDocuments({ completed: false })
})
.then(count => {
    console.log(count);
})
.catch(err => {
    console.log(err);
})
*/

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await (Task.countDocuments({ completed: false }))
    return count;
}

deleteTaskAndCount('5cb84f166fd8290e56eb70a4')
.then(result => console.log(result))
.catch(err => console.log(err))
