//CRUD create read update delete
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

//const connectionURL = `mongodb://127.0.0.1:27017`;
const databaseName = `task-manager`;

/*
const id = new ObjectID();
//ObjectID is actually store in binary which 1/2 size of string. 
//the value of _id field in document is a function to vistualize the string instead of binary 
console.log(id.id.length);
console.log(id.toHexString().length);
*/

MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, client) => { //establish the connection to db
    if(err) return console.log('Unable to connect to database');

    const db = client.db(databaseName); //return the ref to db

    //////////////Create////////////////////////////////////////////////////////////
     /* //InsertOne//
    db.collection('users').insertOne({
        //_id: id, we can assign ObjectID by outself but why!
        name: 'Alton',
        age: 50
    }, (err, result) => {
        if(err) return console.log('Unable to insert user');

        console.log(result.ops);
    })
    */
    
    /* //InsertMany//
    db.collection('users').insertMany([{
        name: 'Jane',
        age: 28
    }, {
        name: 'Gunther', 
        age: 43
    }], (err ,result) => {
        if (err) return console.log('Unable to insert documents');
        console.log(result.ops);
    })
    */

/*
    db.collection('tasks').insertMany([{
        description: 'Cooking dinner',
        completed: false
    }, {
        description: 'Finish node.js course',
        completed: false
    }, {
        description: 'Driving mom to hospital',
        completed: true
    }], (err, result) => {
        if (err) return console.log('Unable to insert tasks');
        console.log(result.ops);
    })
*/








    //////////////Read////////////////////////////////////////////////////////////
    /*
    //Find only one document//
    db.collection('users').findOne({ _id: ObjectID('5cb6f5622eb7b90bf5093049') }, (err, user) => {
        if (err) return console.log('Unable to fetch');
        console.log(user);
    })
    */
   
   /*
    //find() return array of pointer to those document//
    db.collection('users').find({ name: 'Sethanant' }).toArray((err, users) => {
        console.log(users);
    })
    db.collection('users').find({ name: 'Sethanant' }).count((err, count) => {
        console.log(count);
    }) //by find() return a cursor (pointer) is nice for another method when data in document is not require
    */

   /*
   db.collection('tasks').findOne({ _id: new ObjectID("5cb6f2aa24b86b0ab7e871a4") }, (err, task) => {
       console.log(task);
   })

   db.collection('tasks').find({ completed: false }).toArray((err, tasks) => {
       console.log(tasks);
   })
   */









   //////////////Update////////////////////////////////////////////////////////////

   /* //UpdateOne//
   db.collection('users').updateOne({ 
       _id: new ObjectID("5cb6f1c76b82250a22d2699f") 
    }, {
        $set: {
            name: 'Mike'
        },
       $inc: { //increase the number 
           age: 1 //increase by 1
       }
    }).then(result => console.log(result))
      .catch(error => console.log(error))
    */

    /* //updateMany//
    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then(result => console.log(result.modifiedCount))
      .then(error => console.log(error))
    */









    //////////////Delete////////////////////////////////////////////////////////////

    /* //deleteMany//
    db.collection('users').deleteMany({ age: 28 })
    .then(result => console.log(result.deletedCount))
    .catch(error => console.log(error))
    */

    //deleteOne
    db.collection('tasks').deleteOne({ description: 'Driving mom to hospital' })
    .then(result => console.log(result.deletedCount))
    .catch(error => console.log(error))

})



