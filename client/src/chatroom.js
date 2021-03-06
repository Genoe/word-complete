import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message';
import { subscribeToChat, emitMessage } from './api';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            chats: props.messageHistory
        };
        subscribeToChat((err, msg) => this.setState({ 
            // timestamp 
            chats: this.state.chats.concat(msg)
          }));
    }
    
    handleSubmit(event) {
        // messageHistory.concat(this.state.value);
        emitMessage(ReactDOM.findDOMNode(this.refs.msg).value)
        this.setState({ 
            chats: this.state.chats.concat([ReactDOM.findDOMNode(this.refs.msg).value]) 
        });
        event.preventDefault();
    }

    render() {
        // const messages = messageHistory;
        const messages = this.state.chats;
        const listMessages = messages.map((msg, index) =>
            <Message key={index} value={msg} />
        );
        return (
            <div id="container">
                <ul id="messages">{listMessages}</ul>
                <form onSubmit={this.handleSubmit}>
                    <input id="m" type="text" autoComplete="off" ref="msg" /><button>Send</button>
                </form>
            </div>         
        );
    }
}

export default Chatroom;