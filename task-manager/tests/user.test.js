const request = require('supertest'); //used for sent request to express
const app = require('../src/app');
const User = require('../src/models/users');

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: 'red12345'
}

//Delete all the data before running every test
beforeEach(async () => {
    await User.deleteMany() //Drop all data
    await new User(userOne).save() //create user for another test
})

test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Sethanant',
        email: 'thetkpark@email.com',
        password: 'asdfghjkl;'
    }).expect(201)
    
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'passwordThatGonnaFailed'
    }).expect(400)
})


