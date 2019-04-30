const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math');

test('Should calculate total with tip', () => {
    const total = calculateTip(10,0.3)

    // if(total != 13){
    //     throw new Error(`Total tip should be 13. Got ${total}`)
    // }
    // Build in assertion function in jest that write less code for IF Statement
    expect(total).toBe(13)

})

test('Should calculate with defauly tip',() => {
    const total = calculateTip(10);
    expect(total).toBe(12.5)
})


test('Should convert F to C', () => {
    const result = fahrenheitToCelsius(32);
    expect(result).toBe(0)
})

test('Should convert C to F', () => {
    const result = celsiusToFahrenheit(0);
    expect(result).toBe(32)
})