import React from 'react';
import PropTypes from 'prop-types';
import Message from './message';
import { subscribeToChat, emitMessage, emitUsername, subscribeToMatchingService } from './api';
import Modal from './modal';

// let username;

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    Chatroom.propTypes = { // typechecking in development mode.
      messageHistory: PropTypes.string.isRequired,
    };
    this.state = {
      chats: props.messageHistory,
      isOpen: true, // for the modal
    };
    
    // this.username = window.prompt('Please enter a username'); // TODO: When the react app is first ran (npm start) the prompt doesn't appear. Have to refresh the page.
    // emitUsername(this.username);
  }

  componentDidMount() {

  }

  handleSubmit(event) {
    // messageHistory.concat(this.state.value);
    emitMessage(this.msg.value);
    this.setState({
      // chats: this.state.chats.concat([ReactDOM.findDOMNode(this.refs.msg).value]), // findDOMNode will be depreciated.
      chats: this.state.chats.concat([this.msg.value]),
    });
    event.preventDefault();
  }

  toggleModal(event) {
    this.setState({
      isOpen: !this.state.isOpen,
    });
    // After a username has been sent back to the server, wait for a match
    subscribeToMatchingService((err, msg) => {
      if (err) {
        this.setState({
          chats: this.state.chats.concat(JSON.stringify(err)),
        });
      }
      this.setState({
        chats: this.state.chats.concat(msg),
      });
    });
    subscribeToChat((err, msg) => this.setState({
      // timestamp
      chats: this.state.chats.concat(msg),
    }));
    emitUsername(this.usernameinput.value);
    event.preventDefault();
  }

  render() {
    // const messages = messageHistory;
    const messages = this.state.chats;
    const listMessages = messages.map((msg, index) =>
      <Message key={index} value={msg} />);

    return (
      <div id="container">
        <Modal
          show={this.state.isOpen}
        >
          <form id="usernameform" onSubmit={this.toggleModal}>
            <input id="usernameinput" type="text" autoComplete="off" ref={(c) => { this.usernameinput = c; }} /><button>Send</button>
          </form>
        </Modal>
        <ul id="messages">{listMessages}</ul>
        <form id="messageform" onSubmit={this.handleSubmit}>
          <input id="m" type="text" autoComplete="off" ref={(c) => { this.msg = c; }} /><button>Send</button>
        </form>
      </div>
    );
  }
}

export default Chatroom;
