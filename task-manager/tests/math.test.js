const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');

test('Should calculate total with tip', () => {
    const total = calculateTip(10,0.3)

    // if(total != 13){
    //     throw new Error(`Total tip should be 13. Got ${total}`)
    // }
    // Build in assertion function in jest that write less code for IF Statement
    expect(total).toBe(13);

})

test('Should calculate with defauly tip',() => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
})


test('Should convert F to C', () => {
    const result = fahrenheitToCelsius(32);
    expect(result).toBe(0);
})

test('Should convert C to F', () => {
    const result = celsiusToFahrenheit(0);
    expect(result).toBe(32);
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done(); //Need to call when finish because JEST doesn't know about async and it just consider 'sucess'
//     }, 2000);
    
// })


//Example with using JEST with async function
test('Should add two numbers', (done) => {
    add(2,3).then(sum => {
        expect(sum).toBe(5);
        done();
    })
})

test('Should add two numbers async await', async () => {
    //async return promise and JEST will wait for either resolve or reject
    const sum = await add(10,22);
    expect(sum).toBe(32)
})