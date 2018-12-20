const fs = require('fs');
const _ = require('lodash')
const yargs = require('yargs');

const  notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new Note', {
      title: titleOptions,
      body: bodyOptions
    })
    .command('list', 'List all Notes')
    .command('read', 'Read a Note', {
      title: titleOptions
    })
    .command('remove', 'Remove a Note', {
      title: titleOptions
    })
    .help()
    .argv;
// console.log('Yargs: ',argv);
// var command = process.argv[2]; //Taking it from Process
var command = argv._[0];
// console.log('Command: ', command);
//console.log(module)
//console.log('Process: ',process.argv);

if(command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if(note){ //Checks if it is undefined or no
    console.log('Note Created');
    notes.logNotes(note);
  } else {
    console.log('Note Creation Failed!');
    console.log(`Note with title ${argv.title} already exists.`);
  }
}else if(command === 'list'){
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} notes`);
  allNotes.forEach((note) => {
    notes.logNotes(note);
  });
}else if(command === 'read'){
  console.log('Note Found');
  var note = notes.readNote(argv.title);
  if(note){
    notes.logNotes(note);
  }else{
    console.log(`Note with title ${argv.title} not found`);
  }
}else if(command === 'remove'){
  var isNoteRemoved = notes.removeNote(argv.title);
  var message = isNoteRemoved ? `Note with title ${argv.title} successfully removed` : `Note with title ${argv.title} does not exist`;
  console.log(message);
}else{
  console.log('Command not recognized');
}
