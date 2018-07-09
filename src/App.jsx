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
                },
                {
                    type: "incomingMessage",
                    content:
                        "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
                    username: "Anonymous2"
                },
                {
                    type: "incomingMessage",
                    content: "...",
                    username: "nomnom"
                },
                {
                    type: "incomingMessage",
                    content:
                        "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
                    username: "Anonymous2"
                },
                {
                    type: "incomingMessage",
                    content: "This isn't funny. You're not funny",
                    username: "nomnom"
                },
                {
                    type: "incomingNotification",
                    content: "Anonymous2 changed their name to NotFunny"
                }
            ]
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
                <ChatBar />
            </div>
        );
    }
}

export default App;
