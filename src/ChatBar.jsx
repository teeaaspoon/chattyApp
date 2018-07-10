import React, { Component } from "react";
import { log } from "util";

function ChatBar(props) {
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            props.newMessageFunction(props.currentUser, event.target.value);
            event.target.value = "";
        }
    }

    return (
        <footer className="chatbar">
            <input
                className="chatbar-username"
                placeholder="Your Name (Optional)"
                defaultValue={props.currentUser}
            />
            <input
                className="chatbar-message"
                placeholder="Type a message and hit ENTER"
                onKeyPress={handleKeyPress}
            />
        </footer>
    );
}

export default ChatBar;
