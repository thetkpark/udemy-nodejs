require('../src/db/mongoose');
const User = require('../src/models/users');

/*
User.findByIdAndUpdate('5cb744f295f9c00b98eb7dc6', { age: 1 })
.then(user => {
    console.log(user);
    return User.countDocuments({ age:1 })
}).then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
})
*/

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age });
    const count = await User.countDocuments({ age: age });
    return count
}


updateAgeAndCount('5cb744f295f9c00b98eb7dc6', 2)
.then(result => console.log(result))
.catch(err => console.log(err))