const app = require('./app');


const port = process.env.PORT;

//Just for runing a express with resource in app.js
app.listen(port, () => console.log(`Server is up on port ${port}`))
