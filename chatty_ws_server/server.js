const express = require("express");
const WebSocket = require("ws").Server;
const uuid = require("uuid");

const PORT = 3001;

const server = express()
    .use(express.static("public"))
    .listen(PORT, "0.0.0.0", "localhost", () =>
        console.log(`listening on ${PORT}`)
    );

const wss = new WebSocket({ server });

const arrayOfColors = ["red", "orange", "blue", "purple"];
const randomInt = () => {
    return Math.floor(Math.random() * Math.floor(4));
};

wss.on("connection", ws => {
    console.log("Client connected");
    // send the user color to the user
    ws.send(
        JSON.stringify({ type: "userColor", color: arrayOfColors[randomInt()] })
    );
    // send the updated usercount to everyone
    let userCountObject = {
        type: "usersOnline",
        amountOfUsers: wss.clients.size
    };
    wss.broadcast(JSON.stringify(userCountObject));

    ws.on("message", data => {
        handleMessage(data);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
        // update usercount
        userCountObject.amountOfUsers = wss.clients.size;
        // send the updated usercount to everyone
        wss.broadcast(JSON.stringify(userCountObject));
    });
});

//  FUNCTIONS

// handles message event
const handleMessage = data => {
    const newMessage = JSON.parse(data);
    switch (newMessage.type) {
        case "postMessage":
            newMessage.id = uuid();
            newMessage.type = "incomingMessage";
            console.log(
                `User ${newMessage.username} said ${newMessage.content}`
            );
            break;
        case "postNotification":
            newMessage.type = "incomingNotification";
            break;
        default:
            console.log("unsupported message type:", newMessage);
    }
    wss.broadcast(JSON.stringify(newMessage));
};

// broadcast function
wss.broadcast = data => {
    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(data);
        }
    });
};
