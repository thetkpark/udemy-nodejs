

/*
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve([7,4,1])
        reject('This is error')
    }, 2000)
})

doWorkPromise.then((res) => {
    console.log('Success');
    console.log(res);
}).catch((err) => {
    console.log(err);
})
/*                       fufildled (resolve)
                        /
Promise --> pending --> 
                        \
                          reject
*/      

//Promise Chain

const add = (a,b) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b);
        }, 2000);
    })
}

/* //Not a great way to do
add(1,2)
.then(sum => {
    console.log(sum)
    add(sum,5)
    .then(sum2 => {
        console.log(sum2);
    })
    .catch(err => {
        console.log(err);
    })
})
.catch(err => {
    console.log(err)
})
*/

add(1,1)
.then(sum => {
    console.log(sum)
    return add(sum ,4)
})
.then(sum2 => {
    console.log(sum2)
})
.catch(err => {
    console.log(err)
})
