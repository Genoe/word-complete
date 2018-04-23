import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chatroom from './chatroom';
// import { emitUsername } from './api';

let messageHistory = [
    "Welcome to a new game!"
];

ReactDOM.render(
    <Chatroom messageHistory={messageHistory} />,
    document.getElementById('root')
);

