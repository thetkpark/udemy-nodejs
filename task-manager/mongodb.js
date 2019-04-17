//CRUD create read update delete
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = `mongodb://127.0.0.1:27017`;
const databaseName = `task-manager`;

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
    if(err) return console.log('Unable to connect to database');

    const db = client.db(databaseName); //return the ref to db
    db.collection('users').insertOne({
        name: 'Sethanant',
        age: 19
    }, (err, result) => {
        if(err) return console.log('Unable to insert user');

        console.log(result.ops);
    })

})



