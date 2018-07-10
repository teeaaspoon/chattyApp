import React, { Component } from "react";
import { log } from "util";

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageContent: ""
        };
    }

    handleChange = event => {
        this.setState({ messageContent: event.target.value });
    };

    handleKeyPress = event => {
        if (event.key === "Enter") {
            this.props.newMessageFunction(
                this.props.currentUser,
                this.state.messageContent
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
                    defaultValue={this.props.currentUser}
                />
                <input
                    className="chatbar-message"
                    placeholder="Type a message and hit ENTER"
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                    value={this.state.messageContent}
                />
            </footer>
        );
    }
}

export default ChatBar;
