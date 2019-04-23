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

/* //Demo JsonWebToken
const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewtoken', { expiresIn: '7 days' }); //(unique id, secret, option)
    console.log(token)

    const data = jwt.verify(token, 'thisismynewtoken')
    console.log(data)
}
myFunction();
*/



/*
//Middleware Functions
app.use((req, res, next) => {
    if(req.method == 'GET'){
        res.send('GET request are disable');
    }else {
        next();
    }

})
*/



