import React from 'react';
import PropTypes from 'prop-types';
import Message from './message';
import { subscribeToChat, emitMessage, emitUsername, subscribeToMatchingService } from './api';

// let username;

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    Chatroom.propTypes = { // typechecking in development mode.
      messageHistory: PropTypes.string.isRequired,
    };
    this.state = {
      chats: props.messageHistory,
    };
    subscribeToChat((err, msg) => this.setState({
      // timestamp
      chats: this.state.chats.concat(msg),
    }));
    this.username = prompt('Please enter a username'); // TODO: When the react app is first ran (npm start) the prompt doesn't appear. Have to refresh the page.
    emitUsername(this.username);
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

  render() {
    // const messages = messageHistory;
    const messages = this.state.chats;
    const listMessages = messages.map((msg, index) =>
      <Message key={index} value={msg} />);

    return (
      <div id="container">
        <ul id="messages">{listMessages}</ul>
        <form onSubmit={this.handleSubmit}>
          <input id="m" type="text" autoComplete="off" ref={(c) => { this.msg = c; }} /><button>Send</button>
        </form>
      </div>
    );
  }
}

export default Chatroom;
