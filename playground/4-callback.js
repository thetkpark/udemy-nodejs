const doWorkCallback = (callback) => {
    setTimeout(() => {
        //callback('This is error', undefined);
        callback(undefined, [1,4,7]);
    }, 2000);
}

doWorkCallback((err, res) => {
    if(err) return console.log(err);

    console.log(res);
});