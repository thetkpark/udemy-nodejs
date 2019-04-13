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
    
    const duplicateNotes = notes.filter(note => {
        return note.title === title
    });

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bold.bgGreen('New note added'));
    }
    else {
        console.log(chalk.bold.bgRed('Note title taken!'));
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



module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes
}