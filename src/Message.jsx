import React, { Component } from "react";

class Message extends Component {
    usernameStyle = {
        color: this.props.color
    };
    render() {
        if (this.props.type === "incomingMessage") {
            // regular messages
            return (
                <div className="message">
                    <span
                        className="message-username"
                        style={this.usernameStyle}
                    >
                        {this.props.username}
                    </span>
                    <span className="message-content">
                        {this.props.content}
                    </span>
                </div>
            );
        } else {
            //notification message
            return <div className="message system">{this.props.content}</div>;
        }
    }
}

export default Message;
