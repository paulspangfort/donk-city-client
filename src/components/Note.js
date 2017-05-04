import React, { Component } from 'react';
import marked from 'marked';
import Draggable from 'react-draggable';
import EditModal from './editModal';
// import FontAwesome from 'react-fontawesome';
// import FaIconPack from 'react-icons/lib/fa';

class Note extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      title: props.title,
      id: props.id,
      isEditing: false,
      noteStyle: {
        top: props.y,
        left: props.x,
        zIndex: props.id,
      },
      position: {
        x: 200,
        y: 200,
      },
    };

    this.isEditing = this.isEditing.bind(this);
    this.notEditing = this.notEditing.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  isEditing() {
    this.setState({ isEditing: true });
  }

  notEditing() {
    this.setState({ isEditing: false });
  }

  changeText(text) {
    this.setState({ text });
  }

  renderBodyText() {
    if (this.state.isEditing) {
      return (
        <EditModal text={this.state.text} changeText={this.changeText} stopEdit={this.notEditing} />
      );
    } else {
      return (
        <div className="noteText" dangerouslySetInnerHTML={{ __html: marked(this.state.text || '') }} />
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={this.position}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note" style={this.state.noteStyle}>

          <div className="noteTop">
            <h4><i> {this.state.title} </i></h4>
            <div className="icons">
              <i className="fa fa-edit noteIcon" onClick={() => this.isEditing()} />
              <i className="fa fa-trash-o noteIcon" size="5px" onClick={() => this.props.deleteNote(this.state.id)} />
              <i className="fa fa-arrows note-mover noteIcon" />
            </div>
          </div>

          <div className="noteBody">
            {this.renderBodyText()}
          </div>
        </div>

      </Draggable>
    );
  }

}

export default Note;
