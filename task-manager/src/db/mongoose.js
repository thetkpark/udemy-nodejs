const mongoose = require('mongoose');
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true,
    useCreateIndex: true
});
//Create a database model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error ('Email is invalid')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')) throw new Error (`Password should not contain 'password'`)
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0) throw new Error('Age must be positive number')
        }
    }
});

/*
const me = new User({
    name: 'Sethanant',
    email: 'EMAIL@email.io',
    password: 'asdfghjkl;',
    age: 23
})

me.save().then((result) => console.log(result)).catch(err => console.log(err))
*/


//Create Task model
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

//create instance of Task model
const firstTask = new Task ({
    description: '    Sleep    ',
});

firstTask.save().then(res => console.log(res)).catch(err => console.log(err))
