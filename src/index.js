import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
// import * as firebasedb from './firebasedb';
import './style.scss';

const socketserver = 'http://localhost:9090';

function App() {
  const socket = io(socketserver);
  socket.on('connect', () => { console.log('socket.io connected'); });
  socket.on('disconnect', () => { console.log('socket.io disconnected'); });
  socket.on('reconnect', () => { console.log('socket.io reconnected'); });
  socket.on('error', (error) => { console.log(error); });
  return (
    <div>
      helllo
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('main'));
