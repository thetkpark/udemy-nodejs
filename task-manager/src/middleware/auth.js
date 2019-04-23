const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async(req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'thisistoken');
        const user = await User.findOne({ _id: decoded._id , 'tokens.token': token})
        
        if(!user) throw new Error()

        req.user = user; //Add user data into req for not to query again
        next();
    }
    catch(err){
        res.status(401).send({ error: 'Please autherticate' })
    }


}

module.exports = auth;