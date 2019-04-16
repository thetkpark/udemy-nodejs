const greeter = (name = 'user', age) => {
    console.log(`Hello ${name}`);
}
//set default value for 'name' from undefinded to user
greeter('C');
greeter();