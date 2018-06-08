/**
 * Stores a note in the localStorage and prints all the current stored items
 */
const saveNote = function (note) {
  let keyNumber = Number(localStorage.getItem('keyNumber'));

  if ((keyNumber > 0 || keyNumber !== null)) {
    localStorage.setItem('keyNumber', String(keyNumber+1));
  } else {
    localStorage.setItem('keyNumber','0');
    keyNumber = 0;
  }
  localStorage.setItem(`key${keyNumber}`, note);

  for (let i = 0;i <= keyNumber; i++) {
    console.log(localStorage.getItem('key'+i));
  }
};

/**
 * Callback function, it gets the note parameter from the html
 */
const notesFunctionCaller = function () {
  let note = document.getElementById('note').value;
  if (!note) {
      note = "I am JS";
  }

  saveNote(note);
}

// saveNote('I am JS')