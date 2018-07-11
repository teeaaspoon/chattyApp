import React, { Component } from "react";

class MessageList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        // autoscrolls to bottom every update
        this.bottomOfList.scrollIntoView({ behaviour: "smooth" });
    }

    render() {
        return (
            <div>
                <main className="messages">{this.props.messages}</main>
                <div
                    ref={el => {
                        this.bottomOfList = el;
                    }}
                />
            </div>
        );
    }
}

export default MessageList;
