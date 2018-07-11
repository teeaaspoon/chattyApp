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

    ws.send(
        JSON.stringify({ type: "userColor", color: arrayOfColors[randomInt()] })
    );

    // send the user count to the client
    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(
                JSON.stringify({
                    type: "usersOnline",
                    amountOfUsers: wss.clients.size
                })
            );
        }
    });

    ws.on("message", data => {
        const newMessage = JSON.parse(data);

        if (newMessage.type === "postMessage") {
            // add uuid to the newMessage
            newMessage.id = uuid();
            newMessage.type = "incomingMessage";
            console.log(
                `User ${newMessage.username} said ${newMessage.content}`
            );
        } else if (newMessage.type === "postNotification") {
            newMessage.type = "incomingNotification";
        } else {
            throw new Error("Unkown event type " + data.type);
        }

        // broadcast newMessage to all clients
        wss.clients.forEach(client => {
            if (client.readyState === 1) {
                console.log("sending message back");
                client.send(JSON.stringify(newMessage));
            }
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected");

        // send the usercount to the client
        wss.clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(
                    JSON.stringify({
                        type: "usersOnline",
                        amountOfUsers: wss.clients.size
                    })
                );
            }
        });
    });
});
