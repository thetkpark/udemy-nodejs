const request = require('supertest'); //used for sent request to express
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/users');

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

//Delete all the data before running every test
beforeEach(async () => {
    await User.deleteMany() //Drop all data
    await new User(userOne).save() //create user for another test
})

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Sethanant',
        email: 'thetkpark@email.com',
        password: 'asdfghjkl;'
    }).expect(201)
    
    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id) //used the _id that comeback from post request
    expect(user).not.toBeNull() //if there is no user in db null is send back and make sure that it is not null

    //Asserting about the response body
    expect(response.body).toMatchObject({
        user: {
            name: 'Sethanant',
            email: 'thetkpark@email.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('asdfghjkl;') //assert that password is not plain text

})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneID);

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'passwordThatGonnaFailed'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticate user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for authenticate user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneID);

    expect(user).toBeNull()
})

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})
