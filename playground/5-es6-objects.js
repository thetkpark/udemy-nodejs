const name = 'Sethanant';
const userAge = 19;

const user = {
    name,
    age: userAge,
    location: 'Thailand'
}

console.log(user)

//object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    sellPrice: undefined
}
/*
const {label:productLabel, stock} = product
// {key pair that want to destruct} = object
console.log(productLabel); //change the name of variable from one in object
console.log(stock);
*/

const transaction = (type, { label, stock }) => {
    //this is how to destructure in fucntion in another way
    //Now I have label and stock varible with value in use
}

transaction('order', product);