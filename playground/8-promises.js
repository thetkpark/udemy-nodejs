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






