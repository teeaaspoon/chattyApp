import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";

function NavBar(props) {
    return (
        <nav className="navbar">
            <a href="/" className="navbar-brand">
                Chatty
            </a>
            <span>{props.usersOnline} Users Online</span>
        </nav>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: new WebSocket("ws://localhost:3001/"),
            currentUser: {
                name: "",
                color: null
            },
            messages: [
                {
                    type: "incomingMessage",
                    content:
                        "I won't be impressed with technology until I can download food.",
                    username: "Anonymous1"
                },
                {
                    type: "incomingNotification",
                    content: "Anonymous1 changed their name to nomnom"
                }
            ],
            usersOnline: 1
        };
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
        // if the username is different it means the username was changed so reset the state send notification object to server
        if (this.state.currentUser.name != username) {
            let oldname = this.state.currentUser.name;
            let newname = username;
            oldname
                ? (oldname = this.state.currentUser.name)
                : (oldname = "Anonymous");
            newname ? (newname = username) : (newname = "Anonymous");
            const newNotificationObject = {
                type: "postNotification",
                content: `${oldname} has changed their name to ${newname}`
            };
            this.state.socket.send(JSON.stringify(newNotificationObject));
            this.setState({
                currentUser: {
                    name: newname,
                    color: this.state.currentUser.color
                }
            });
        }
        // send websocket server the new message object
        this.state.socket.send(JSON.stringify(newMessageObject));
    };

    componentDidMount() {
        console.log("ComponentDidMount <App />");

        this.state.socket.onopen = event => {
            console.log("You have connected to the socket server");
        };

        // response from websocket server
        this.state.socket.onmessage = event => {
            const socketResponse = JSON.parse(event.data);

            if (
                socketResponse.type === "incomingMessage" ||
                socketResponse.type === "incomingNotification"
            ) {
                const messages = this.state.messages.concat(socketResponse);
                this.setState({ messages: messages });
            } else if (socketResponse.type === "usersOnline") {
                this.setState({ usersOnline: socketResponse.amountOfUsers });
            } else if (socketResponse.type === "userColor") {
                this.setState({
                    currentUser: {
                        name: this.state.currentUser.name,
                        color: socketResponse.color
                    }
                });
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
