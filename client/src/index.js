import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chatroom from './chatroom';

let messageHistory = [
    "Welcome to a new game!"
];

ReactDOM.render(
    <Chatroom messageHistory={messageHistory} />,
    document.getElementById('root')
);

