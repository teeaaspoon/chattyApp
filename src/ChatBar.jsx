import React, { Component } from "react";
import { log } from "util";

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            messageContent: ""
        };
    }

    handleMessageChange = event => {
        this.setState({ messageContent: event.target.value });
    };

    handleNameChange = event => {
        this.setState({ username: event.target.value });
    };

    handleEnter = event => {
        if (event.key === "Enter") {
            this.props.newMessageFunction(
                this.state.username,
                this.state.messageContent,
                this.props.color
            );
            this.setState({ messageContent: "" });
        }
    };

    render() {
        return (
            <footer className="chatbar">
                <input
                    className="chatbar-username"
                    placeholder="Your Name (Optional)"
                    onChange={this.handleNameChange}
                    value={this.state.username}
                />
                <input
                    className="chatbar-message"
                    placeholder="Type a message and hit ENTER"
                    onKeyPress={this.handleEnter}
                    onChange={this.handleMessageChange}
                    value={this.state.messageContent}
                />
            </footer>
        );
    }
}

export default ChatBar;
