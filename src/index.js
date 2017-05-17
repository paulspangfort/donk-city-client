import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import io from 'socket.io-client';
// import * as firebasedb from './firebasedb';
import Note from './components/Note';
import NoteMaker from './components/note_button';
import './style.scss';

const socketserver = 'http://localhost:9090';

class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      notesCounter: 0,
      thing: 0,
    };

    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });

    this.addNote = this.addNote.bind(this);
    this.increment = this.increment.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.socket.on('notes', (notes) => {
      if (notes != null) {
        this.setState({ notes: Immutable.Map(notes) });
      }
    });
  }

  deleteNote(id) { // eslint-disable-line class-methods-use-this
    this.socket.emit('deleteNote', id).then(() => {
      this.socket.on('notes', (notes) => {
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
      const note = {
        text: '',
        title,
        x: counter * 25,
        y: counter * 25,
      };

      this.socket.emit('createNote', note).then(() => {
        this.socket.on('notes', (notes) => {
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
      return (<Note id={id} title={notes.title} text={notes.text}
        x={notes.x} y={notes.y} deleteNote={this.deleteNote} updateNotes={this.updateNotes}
      />);
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
