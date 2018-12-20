const fs = require('fs');

module.exports.addNote = () => {
  console.log('addNote');
  return 'New Note';
};

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
      title,
      body
    };
    var duplicateNotes = notes.filter((note) => note.title === title);
    if(duplicateNotes.length === 0){
      notes.push(note);
      saveNotes(notes);
      return note;
    }

};

var getAll = () => {
  return fetchNotes();
};

var readNote = (title) => {
  var notes = fetchNotes();
  var note = notes.filter((note) => note.title === title);
  return note[0];
  //return fetchNotes().filter((note) => note.title === title);
};

var removeNote = (title) => {
  var notes = fetchNotes(); //Fetching all the notes
  var notesAfterRemoval = notes.filter((note) => note.title !== title);
  saveNotes(notesAfterRemoval);
  return notes.length !== notesAfterRemoval.length;
};

var logNotes = (note) => {
  debugger;
  console.log('----');
  console.log(`title: ${note.title}`);
  console.log(`body: ${note.body}`);
  console.log('----');
};

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote,
  logNotes
};
