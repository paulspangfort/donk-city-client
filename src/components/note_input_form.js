import React, { Component } from 'react';

class noteInputForm extends Component {

  constructor(props) {
    super(props);
    this.state = { inputText: props.textEntry };
    this.style = {
      height: 40,
      top: 100,
      left: 200,
      marginBottom: 50,
    };
    this.handleKeyInput = this.handleKeyInput.bind(this);
  }

  handleKeyInput(event) {
    if (event.key === 'Enter') {
      this.setState({ inputText: event.target.value });
    }
  }

  render() {
    return (
      <div>
        <input />
      </div>
    );
  }

}

export default noteInputForm;
