const express = require('express');

//Establish mongodb connection
require('./db/mongoose'); 

//For route handler
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json()) //automatically parse json to object


app.use(userRouter)
app.use(taskRouter)




app.listen(port, () => console.log(`Server is up on port ${port}`))

/*
const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const password = 'red12345678'
    const hashedPassword = await bcrypt.hash(password, 8) //(plain text password,times to hash)
    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare('red12345678', hashedPassword) //plain text to compare, hashed password
    console.log(isMatch)
}

myFunction();
*/