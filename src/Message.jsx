import React, { Component } from "react";

class Message extends Component {
    render() {
        if (this.props.type === "incomingMessage") {
            // regular messages
            return (
                <div className="message">
                    <span className="message-username">
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
