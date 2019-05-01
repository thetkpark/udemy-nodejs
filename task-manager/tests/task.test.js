const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/tasks');
const { userOne, userOneID, setupDatabase } = require('./fixtures/db');

//Clean data and setup new data for everytest
beforeEach(setupDatabase)

test('Should create task for user', async () => {

})

