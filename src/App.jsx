import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";
import NavBar from "./NavBar.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {
                name: "",
                color: null
            },
            messages: [
                {
                    type: "incomingNotification",
                    content: "Welcome to ChattyApp. Chat with others now~~~~"
                }
            ],
            usersOnline: 1
        };
        this.socket = new WebSocket("ws://localhost:3001/");
    }

    addNewMessage = (username, message, color) => {
        const newMessageObject = {
            id: null,
            type: "postMessage",
            username: username,
            content: message,
            color: color
        };
        if (!username) {
            newMessageObject.username = "Anonymous";
        }
        // if the username is different it means the username was changed so change the state of username and send notification object to server
        if (this.state.currentUser.name != username) {
            let oldname = this.state.currentUser.name;
            let newname = username;
            // if this.state.currentUser.name is "" then call it Anonymous in the notification
            oldname
                ? (oldname = this.state.currentUser.name)
                : (oldname = "Anonymous");
            // if person changed their usename to "" then call it Anonymous in the notification
            newname ? (newname = username) : (newname = "Anonymous");
            const newNotificationObject = {
                type: "postNotification",
                content: `${oldname} has changed their name to ${newname}`
            };
            this.socket.send(JSON.stringify(newNotificationObject));
            this.setState({
                currentUser: {
                    name: newname,
                    color: this.state.currentUser.color
                }
            });
        }
        // send websocket server the new message object
        this.socket.send(JSON.stringify(newMessageObject));
    };

    componentDidMount() {
        this.socket.onopen = event => {
            console.log("You have connected to the socket server");
        };

        // response from websocket server
        this.socket.onmessage = event => {
            const socketResponse = JSON.parse(event.data);

            switch (socketResponse.type) {
                case "incomingMessage":
                    let messages = this.state.messages.concat(socketResponse);
                    this.setState({ messages: messages });
                    break;
                case "incomingNotification":
                    messages = this.state.messages.concat(socketResponse);
                    this.setState({ messages: messages });
                    break;
                case "usersOnline":
                    this.setState({
                        usersOnline: socketResponse.amountOfUsers
                    });
                    break;
                case "userColor":
                    this.setState({
                        currentUser: {
                            name: this.state.currentUser.name,
                            color: socketResponse.color
                        }
                    });
                    break;
                default:
                    console.log("Unsupported message:", socketResponse);
            }
        };
    }

    render() {
        const incomingMessageItems = this.state.messages.map(
            (message, index) => {
                return (
                    <Message
                        key={index}
                        type={message.type}
                        content={message.content}
                        username={message.username}
                        color={message.color}
                    />
                );
            }
        );

        return (
            <div>
                <NavBar usersOnline={this.state.usersOnline} />
                <MessageList messages={incomingMessageItems} />
                <ChatBar
                    username={this.state.currentUser.name}
                    newMessageFunction={this.addNewMessage}
                    color={this.state.currentUser.color}
                />
            </div>
        );
    }
}

export default App;
