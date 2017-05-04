import React, { Component } from 'react';


class NoteMaker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputText: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ inputText: event.target.value });
  }

  deleteHandler(event) {
    if (event.key === 'Delete') {
      this.setState({ inputText: '' });
    }
  }

  render() {
    return (
      <div className="noteMaker">
        <input className="noteInput" placeholder="Note Title" onChange={this.onInputChange} onKeyUp={this.deleteHandler} />
        <button className="noteButton" onClick={() => this.props.addNote(this.state.inputText, this.props.counter)}>
          New Note
        </button>
      </div>
    );
  }
}

export default NoteMaker;
