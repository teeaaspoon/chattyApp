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
        </nav>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: new WebSocket("ws://localhost:3001/"),
            currentUser: { name: "Bob" },
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
            ]
        };
    }

    addNewMessage = (username, message) => {
        const newMessageObject = {
            id: null,
            type: "incomingMessage",
            username: username,
            content: message
        };
        // if the username is different it means the username was changed so reset the state
        if (this.state.currentUser.name != username) {
            this.setState({ currentUser: { name: username } });
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
            const newMessage = JSON.parse(event.data);
            const messages = this.state.messages.concat(newMessage);
            this.setState({ messages: messages });
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
                    />
                );
            }
        );

        return (
            <div>
                <NavBar />
                <MessageList messages={incomingMessageItems} />
                <ChatBar
                    username={this.state.currentUser.name}
                    newMessageFunction={this.addNewMessage}
                />
            </div>
        );
    }
}

export default App;
