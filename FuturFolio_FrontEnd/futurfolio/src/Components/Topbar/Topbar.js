import React, { Component, useEffect, useReducer, useState} from 'react';
import '../../App.css';
import "./Topbar.css";
/*import { ReactComponent as ProfileIcon } from './Icons/profileIcon.svg';*/
import { ReactComponent as BellIcon } from './Icons/bellIcon.svg';
import DropdownMenu from './DropdownMenu'
import NotificationMenu from './NotificationMenu';

function Navbar(props){ //function of the navbar which is the topbar

    return(
        <nav className="topbar">
            <ul className="topbar-nav">{props.children}</ul>
                
        </nav>
    );
}

function NavItem(props){//function for the items within the navbar

    //returns two values in an array
    //first value is state called open, boolean which tells us if menu is open
    //second value is function that changes state
    const [open, setOpen] = useState(false); //closed by default, so parameter set to false


    return(
        <li className="nav-item">
            <a href="#" className = "nav-icon-button" onClick={() => setOpen(!open)}>{/*changes state on a click, toggles the boolean*/}
                {props.icon}
            </a>

            {open && props.children} {/* if open is true then it will show the children*/ }
        </li>
    );
}


export default class Topbar extends Component {

    

    render() {
        const ProfileIcon = localStorage.getItem("profileImage");
        return (
            <Navbar>
                <h1 className="DashboardTitle">{this.props.title}</h1>
                <span className="Stick"></span>
                <NavItem icon={<BellIcon />}>
                    <NotificationMenu/>
                </NavItem>
                <NavItem icon={<img src = {ProfileIcon} height ="30px" width = "30px" />}>
                    {/*Dropdown goes here*/}
                    <DropdownMenu 
                        LogOut={this.props.LogOut}
                        DashChangeProfile={this.props.DashChangeProfile}
                        DashChangeSettings={this.props.DashChangeSettings}
                        name={this.props.user.name}
                        />
                </NavItem>

            </Navbar>
        );
    }
}
