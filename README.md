This project currently functions as a basic chat app created with [React](https://reactjs.org/) (frontend) and [Node.js](https://nodejs.org) plus [Socket.io](https://socket.io/) (backend).

To start the project, open a terminal and navigate to the /server folder. Then run `npm start`. The server will now be listening for connections.
To start the client part of the project, naviage to /client and run `npm start`. A browser window will now open with the chat log and input form.
You can open the client (localhost:3000 by default) in multiple tabs or browsers and all instances of the client will receive messages sent by other clients.

![Screenshot of App](screenshot.png)

#Future Improvements
* Clear out chat input box after the user clicks Enter or the Send button.
* Use ExpressJs and PassportJs to add authentication and user accounts.