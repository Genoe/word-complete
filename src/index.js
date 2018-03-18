import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chatroom from './chatroom';

let messageHistory = [
    "Hi",
    "Wow",
    "Such Realtime",
    "Very React"
];


// component to display messages
// class Messages extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         const messages = this.props.messages;
//         const listMessages = messages.map((msg, index) =>
//             <Message key={index} value={msg} />
//         );
//         return (
//             <ul id="messages">{listMessages}</ul>
//         );
//     }
// }



ReactDOM.render(
    <Chatroom />,
    document.getElementById('root')
);

