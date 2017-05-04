import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import * as firebasedb from './firebasedb';
import Note from './components/Note';
import NoteMaker from './components/note_button';
import './style.scss';


class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      notesCounter: 0,
      thing: 0,
    };

    this.addNote = this.addNote.bind(this);
    this.increment = this.increment.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    firebasedb.fetchNotes((notes) => {
      if (notes != null) {
        this.setState({ notes: Immutable.Map(notes) });
      }
    });
  }

  deleteNote(id) { // eslint-disable-line class-methods-use-this
    firebasedb.deleteNote(id).then(() => {
      firebasedb.fetchNotes((notes) => {
        console.log(notes);
        this.setState({ notes: Immutable.Map(notes) });
      });
    });
  }

  increment() {
    this.setState({ notesCounter: this.state.notesCounter + 1 });
  }


  addNote(title, counter) {
    console.log(title);
    if (title !== '') {
      const newNoteKey = firebasedb.getNewKey();

      const note = {
        text: '',
        title,
        id: newNoteKey,
        x: counter * 25,
        y: counter * 25,
      };

      firebasedb.addNewNote(note).then(() => {
        firebasedb.fetchNotes((notes) => {
          if (notes != null) {
            this.setState({ notes: Immutable.Map(notes) });
          }
        });
      });

      this.increment();
    } else {
      console.log('enter a title ya dingus');
    }
  }

  updateNotes(newNotes) {
    this.setState({ notes: Immutable.Map(newNotes) });
  }


  render() {
    const finalNotes = this.state.notes.entrySeq().map(([id, notes]) => {
      return <Note id={id} title={notes.title} text={notes.text} x={notes.x} y={notes.y} deleteNote={this.deleteNote} />;
    });

    return (
      <div>
        {finalNotes}
        <NoteMaker addNote={this.addNote} counter={this.state.notesCounter} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
