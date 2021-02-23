import React, { Component, useEffect, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import '../../App.css';
import "./Topbar.css";
import profilepic from './profilepic.jpg';
import { ReactComponent as ProfileIcon } from './Icons/profileIcon.svg';
import { ReactComponent as BellIcon } from './Icons/bellIcon.svg';
import { ReactComponent as CogIcon } from './Icons/cogIcon.svg';
import { ReactComponent as RightChevron } from './Icons/chevronRight.svg';
import { ReactComponent as LeftChevron } from './Icons/chevronLeft.svg';
import { ReactComponent as PowerIcon } from './Icons/powerIcon.svg';




export default class Topbar extends Component {
    render() {
        return (
            <Navbar>
                <NavItem icon={<BellIcon />} onClick={this.props.DashChangeProfile}/>
                <NavItem icon={<ProfileIcon />}>
                    {/*Dropdown goes here*/}
                    <DropdownMenu/>
                </NavItem>

            </Navbar>
        );
    

function DropdownMenu(){//dropdownmenu function

    const [activeMenu, setActiveMenu] = useState('main');//state of the menu
    const [menuHeight, setMenuHeight] = useState(null);




    function calcHeight(el){
        const height = el.offsetHeight;
        setMenuHeight(height);
    }


    function DropdownItem(props){//Items nested in the function
        return(
            <a href="#" className="menu-item" onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}>
                <span className="icon-button">{props.leftIcon}</span>{/*Icon on the left*/}
                {props.children}

                <span className="icon-right">{props.rightIcon}</span>{/*Icon on the right*/}
                
            </a>
        );
    }


    return(
        <div className="dropdown" style={{height: menuHeight}}>
            {/*if activeMenu is main then show children*/}
            <CSSTransition 
              in={activeMenu === 'main'}
              unmountOnExit // unmountOnExit removes the children when main is not active
              timeout={500} //duration of animation
              classNames="menu-primary"
              onEnter={calcHeight}
              >
                <div className="menu">
                    {/*adds an item called My Profile*/}
                    <DropdownItem 
                    leftIcon = {<ProfileIcon/>}
                    rightIcon={<RightChevron/>}
                    >
                        My Profile
                    </DropdownItem>

                    {/*adds an item called Settings*/}
                    <DropdownItem
                    leftIcon={<CogIcon />}
                    rightIcon={<RightChevron/>}
                    gotoMenu="settings"
                    >
                        Settings
                    </DropdownItem>

                    {/*adds an item called Log Out*/}
                    <DropdownItem
                    leftIcon={<PowerIcon />}
                    >
                        Log Out
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition 
              in={activeMenu === 'settings'}
              unmountOnExit // unmountOnExit removes the children when main is not active
              timeout={500} //duration of animation
              classNames="menu-secondary"
              onEnter={calcHeight}
              >
                <div className="menu">
                    {/*adds an item called Settings*/}
                    <DropdownItem
                    leftIcon={<LeftChevron />}
                    gotoMenu="main"
                    >
                        Settings
                    </DropdownItem>
                    <DropdownItem>Dark Mode</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );
}


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
            <a href="#" className = "icon-button" onClick={() => setOpen(!open)}>{/*changes state on a click, toggles the boolean*/}
                {props.icon}
            </a>

            {open && props.children} {/* if open is true then it will show the children*/ }
        </li>
    );
}

}
}
