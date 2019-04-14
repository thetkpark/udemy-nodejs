const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//Customise yards version
yargs.version('1.10.0');

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNotes(argv.title, argv.body);
    }
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNotes(argv.title);
    }  
});

//Create list command
yargs.command({
    command: 'list',
    describe: 'List all the note',
    handler: function () {
        notes.listNotes();
    }
});

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title: {
            describe: 'title of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.readNotes(argv.title);
    }
});

yargs.parse()