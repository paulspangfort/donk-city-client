import firebase from 'firebase';

  // Initialize Firebase
const config = {
  apiKey: 'AIzaSyAGBKMka220Kz1TDZmU_qp9FG3PcW-ikgA',
  authDomain: 'lab3-3c5a4.firebaseapp.com',
  databaseURL: 'https://lab3-3c5a4.firebaseio.com',
  projectId: 'lab3-3c5a4',
  storageBucket: 'lab3-3c5a4.appspot.com',
  messagingSenderId: '988256173808',
};

firebase.initializeApp(config);

export function fetchNotes(notes) {
  firebase.database().ref('lab3-3c5a4').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    notes(newNoteState);
  });
}

export function addNewNote(note) {
  return firebase.database().ref().child('lab3-3c5a4').push(note);
}

export function getNewKey() {
  return firebase.database().ref().child('lab3-3c5a4').push().key;
}

export function deleteNote(noteId) {
  return firebase.database().ref('lab3-3c5a4').child(noteId).remove();
}


export function updateNote() {

}
