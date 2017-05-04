import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = { inputText: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleKeyInput = this.handleKeyInput.bind(this);
  }

  onInputChange(event) {
    this.setState({ inputText: event.target.value });
    console.log(event.target.value);
  }

  handleKeyInput(event) {
    if (event.key === 'Enter') {
      this.setState({ outputText: 'dingdon', inputText: '' });
    }
  }

  render() {
    return (
      <div>
        <input onKeyUp={this.handleKeyInput} onChange={this.onInputChange} value={this.state.searchterm} />
        <p> {this.state.inputText} </p>
        <p> {this.state.outputText} </p>
      </div>
    );
  }
}

export default SearchBar;
