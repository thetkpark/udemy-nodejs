/*
const fs = require('fs');
const book = {
    title: 'Ego is enemy',
    author: 'Ryan Holiday'
}

const bookJSON = JSON.stringify(book); //Object to JSON
console.log(bookJSON);

const parseData = JSON.parse(bookJSON); //JSON to object
console.log(parseData.author);

fs.writeFileSync('1-json.json', bookJSON); //write to file on disk

const dataBuffer = fs.readFileSync('1-json.json'); //read the file back (in binary not string)
const dataJSON = dataBuffer.toString(); //convert to string
const data = JSON.parse(dataJSON); //convert to object
console.log(data.title);

*/

const fs = require('fs');

let data = JSON.parse(fs.readFileSync('1-json.json').toString());
data.name = 'Sethanant';
data.age = 19;

fs.writeFileSync('1-json.json', JSON.stringify(data));
