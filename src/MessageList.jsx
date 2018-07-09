import React, { Component } from "react";

function MessageList(props) {
    return <main className="messages">{props.messages}</main>;
}

export default MessageList;
