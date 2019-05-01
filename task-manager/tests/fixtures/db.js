const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/users');

const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'red12345',
    tokens: [{
        token: jwt.sign({ _id:userOneID}, process.env.JWT_SECRET )
    }]
}

const setupDatabase = async () => {
    await User.deleteMany() //Drop all data
    await new User(userOne).save() //create user for another test
}

module.exports = {
    userOneID,
    userOne,
    setupDatabase
}
