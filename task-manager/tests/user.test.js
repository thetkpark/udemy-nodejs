const request = require('supertest'); //used for sent request to express
const app = require('../src/app');
const User = require('../src/models/users');
const { userOneID, userOne, setupDatabase } = require('./fixtures/db');

//Clean data and setup new data for everytest
beforeEach(setupDatabase)

test('Should signup a new user', async () => {
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

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneID);
    //.toBe used === to compare and as we know one object doesn't same as onther with the same proproty
    //Use .toEqual instead (It use algo to compare not something in memory)
    expect(user.avatar).toEqual(expect.any(Buffer)) //check if user.avatar is equal to buffer data
})

test(`Should update valid user's fileds`, async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ name: 'Andrew' })
        .expect(200)

    const user = await User.findById(userOneID)
    expect(user.name).toBe('Andrew')
})

test(`Should not update invalid user's fileds`, async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ location: 'Boston' })
        .expect(400)
})
