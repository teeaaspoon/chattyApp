import React, { Component } from "react";

function NavBar(props) {
    return (
        <nav className="navbar">
            <a href="/" className="navbar-brand">
                Chatty
            </a>
            <span>{props.usersOnline} Users Online</span>
        </nav>
    );
}

export default NavBar;
