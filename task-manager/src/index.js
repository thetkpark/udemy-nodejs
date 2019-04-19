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