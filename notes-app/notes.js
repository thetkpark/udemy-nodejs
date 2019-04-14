const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return 'Your notes...'
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (err){
        return []
    }
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const addNotes = function(title, body){
    const notes = loadNotes();
    
    //const duplicateNotes = notes.filter(note => note.title === title);
    const duplicateNotes = notes.find(note => note.title === title);

    if(duplicateNotes){

        console.log(chalk.bold.bgRed('Note title taken!'));
    }
    else {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bold.bgGreen('New note added'));
    } 
}

const removeNotes = function (title) {
    const notes = loadNotes();
    const removeIndex = notes.findIndex(note => {
        return note.title == title;
    });
    if(removeIndex == -1){
        console.log(chalk.bold.bgRed(`There is no '${title}' note to delete`));
    }
    else {
        console.log(chalk.bold.bgGreen(`Deleted '${notes[removeIndex].title}' note`));
        notes.splice(removeIndex,1);
        saveNotes(notes);
    }

}

const listNotes = function () {
    const notes = loadNotes();
    console.log(chalk.bold.inverse('Your notes'));
    notes.forEach(note => {
        console.log(`- ${note.title}`);
    });

}

const readNotes = function (title) {
    const notes = loadNotes();
    note = notes.find(el => el.title == title)
    if(note){
        console.log(chalk.inverse(`${note.title}`));
        console.log(`${note.body}`);
    }
    else {
        console.log(chalk.bgRed('Note not found!'));
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes:readNotes
    
}