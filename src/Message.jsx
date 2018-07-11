import React, { Component } from "react";

class Message extends Component {
    usernameStyle = {
        color: this.props.color
    };
    checkIfPicture(content) {
        if (
            content.startsWith("http") &&
            (content.endsWith("jpg") ||
                content.endsWith("png") ||
                content.endsWith("gif"))
        ) {
            return true;
        } else {
            return false;
        }
    }
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
                        {/* if the content is a link to a picture, render an img tag, if not then just put the content*/}
                        {this.checkIfPicture(this.props.content) ? (
                            <img src={this.props.content} />
                        ) : (
                            this.props.content
                        )}
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
