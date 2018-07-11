# ChattyApp

A real time chat application that allows users to send text or images with anyone whos also on the app. Built with React and WebSockets

### Installation

-   Clone the repo into any folder <br />
-   Install the dependences in the chattyApp Main Folder <br />
-   IMPORTANT: cd into the chatty_ws_server folder and install the dependencies there too <br />
-   Start the WebSockets Server in chatty_ws_server with node server.js <br />
-   In a new terminal, Start the WebpackDev Server with npm start

```
git clone git@github.com:teeaaspoon/chattyApp.git
cd chattyApp
npm install
cd chatty_ws_server
npm install
# inside chatty_ws_server start the ws server
node server.js
# with another terminal, go back to main chattyApp and start the WebpackDev Server
cd ..
npm start
open http://localhost:3000
```

### Screenshots

!["Screenshot of chattyApp"](https://github.com/teeaaspoon/chattyApp/blob/master/docs/ChattyApp%20Screenshot.png)
