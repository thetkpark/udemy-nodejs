const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

//Create new login functions that can be used in route handler
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });

    if(!user) throw new Error('Unable to login')

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) throw new Error('Unable to login')

    return user
}



userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisistoken')
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token
}


//In route handler 'res.send(user)' automatically use JSON.stringify() to object and .toJSON is called everytime stringify get called
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()

    delete userObject.password;
    delete userObject.tokens;

    return userObject
}




//Hash plain text password before saving
//it takes two argument 1. what process 2.function
userSchema.pre('save', async function (next) {
    //this = docuement that is being save
    const user = this;
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8) //(plain text password,times to hash)
    }

    next() //call for tell mongoose that we're done. Move on
})




//Create a database model
const User = mongoose.model('User', userSchema);

module.exports = User;