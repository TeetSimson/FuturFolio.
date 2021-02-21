import React, { Component } from 'react';
import '../../App.css';
import "./Topbar.css";
import profilepic from './profilepic.jpg';


export default class Topbar extends Component {
    render() {
        return (
            <Navbar>
                <NavItem icon= {profilepic}/>
            </Navbar>
        )
    }
}

function Navbar(props){ //function of the navbar which is the topbar
    return(
        <nav className="topbar">
            <ul className="topbar-nav">{props.children}</ul>
                
        </nav>
    );
}

function NavItem(props){//function for the items within the navbar
    return(
        <li className="nav-item">
            <a href="#" className = "icon-button">
                {props.icon}
            </a>
        </li>
    );
}


