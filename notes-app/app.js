const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes');

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
        console.log(`Title: ${argv.title} \nBody: ${argv.body}`);
    }
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removing a note');
    }  
});

//Create list command
yargs.command({
    command: 'list',
    describe: 'List all the note',
    handler: function () {
        console.log('Listing out all the note');
    }
});

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read the note',
    handler: function () {
        console.log('Reading the note');
    }
});

yargs.parse()