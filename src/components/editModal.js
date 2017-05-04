import React, { Component } from 'react';

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }

  onInputChange(event) {
    this.setState({ text: event.target.value });
  }

  finishEdit() {
    this.props.changeText(this.state.text);
    this.props.stopEdit();
  }

  render() {
    return (
      <div className="editModal">
        <textarea type="text" className="editInput" value={this.state.text} onChange={this.onInputChange} />
        <button className="finishEditBtn" onClick={this.finishEdit}> Done! </button>
      </div>
    );
  }
}

export default EditModal;
