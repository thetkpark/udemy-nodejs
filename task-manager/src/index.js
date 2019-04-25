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
//Demo Middleware Functions
app.use((req, res, next) => {
    if(req.method == 'GET'){
        res.send('GET request are disable');
    }else {
        next();
    }

})
*/

/*
//Populate Demo//
const Task = require('./models/tasks');
const User = require('./models/users');

const main = async () => {
    //Task -> User's profile//
    // const task = await Task.findById('5cbf28e07c53384bfa189747')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    //From user to tasks by that user
    const user = await User.findById('5cbf28110560a24b8fe09b31');
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()*/

//Multer Demo (File upload)
const multer = require('multer');
const upload = multer({
    dest: 'images', //destination (directory) to store the uploaded file
    limits: {
        fileSize: 1000000 //filezie in byte
    },
    fileFilter(req, file, cb){
        // How to call cb (callback) function
        // cb(new Error('File must be PDF')) // Sent error back
        // cb(undefined, true) // Everthing alright, move on
        // cb(undefined, false) // Silently reject

        if(!file.originalname.match(/\.(doc|docx)$/)){ //regular expression 
            return cb(new Error('Please upload a Word document'))
        }
        cb(undefined, true);
    }
})
//upload.single is a middleware and ('upload') tell multer to look for key 'upload' from the request and get the file
app.post('/upload', upload.single('upload'), (req ,res) => {
    res.send()
})