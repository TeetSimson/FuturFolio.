import React, { Component, useEffect, useState} from 'react'
//for the transition animation
import {CSSTransition} from 'react-transition-group';
//svg files for the icons used
import { ReactComponent as CogIcon } from './Icons/cogIcon.svg';
import { ReactComponent as RightChevron } from './Icons/chevronRight.svg';
import { ReactComponent as LeftChevron } from './Icons/chevronLeft.svg';
import { ReactComponent as PowerIcon } from './Icons/powerIcon.svg';
import { ReactComponent as ProfileIcon } from './Icons/profileIcon.svg';
import { ReactComponent as AppearanceIcon } from './Icons/appearanceIcon.svg';
import { ReactComponent as LanguageIcon } from './Icons/languageIcon.svg';
import { ReactComponent as LocationIcon } from './Icons/locationIcon.svg';
import { ReactComponent as AdvancedIcon } from './Icons/advancedIcon.svg';

var name = "Elon Musk"; // A variable for profile name

export default function DropdownMenu(props){ //dropdownmenu function

    const [activeMenu, setActiveMenu] = useState('main'); //state of the menu
    const [menuHeight, setMenuHeight] = useState(null);




    function calcHeight(el){
        const height = el.offsetHeight;
        setMenuHeight(height);
    }


    function DropdownItem(props){ //Items nested in the function
        return(
            <a href="#" className="menu-item" onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}>
                <span className="icon-button">{props.leftIcon}</span>{/*Icon on the left*/}
                {props.children}

                <span className="icon-right">{props.rightIcon}</span>{/*Icon on the right*/}
                
            </a>
        );
    }

    function ProfileDropItem(props){ //Items nested in the function
        return(
            <a href="#" className="profdrop-item" onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}>
                <span className="profdrop-icon">{props.Icon}</span>{/*Profile Image*/}
                <span className="prof-name">{props.children} </span>              
            </a>
        );
    }


    function DropdownItemBack(props){//Items nested in the function
        return(
            <a href="#" className="menu-item" onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}>
                <span className="leftChevron">{props.leftIcon}</span>{/*Icon on the left*/}
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
                    <ProfileDropItem //The top bit of the menu
                    Icon = {<ProfileIcon/>}
                    >
                        {name} {/* The profile's name */}
                    </ProfileDropItem>


                    {/*adds an item called My Profile*/}
                    <div onClick={props.DashChangeProfile}>
                        <DropdownItem 
                        leftIcon = {<ProfileIcon/>}
                        
                        >
                            My Profile
                        </DropdownItem>
                    </div>
                    {/*adds an item called Settings*/}
                    <DropdownItem
                    leftIcon={<CogIcon />}
                    rightIcon={<RightChevron/>}
                    gotoMenu="settings"
                    >
                        <p>{/*A lot of spaces for styling*/}
                            Settings &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </p>
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
                    <DropdownItemBack //I used a difference function for the Leftchevron styling
                    leftIcon={<LeftChevron className="leftChevron"/>}
                    gotoMenu="main"  //takes back to main menu
                    >
                        Settings
                    </DropdownItemBack>
                    {/*adds an item called Appearance for personalisation*/}
                    <DropdownItem
                    leftIcon={<AppearanceIcon />}
                    rightIcon={<RightChevron/>}
                    gotoMenu="appearance" //goes to Appearance Menu
                    >
                        <p>Appearance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </DropdownItem>

                    <DropdownItem
                    leftIcon={<LanguageIcon />}
                    rightIcon={<RightChevron/>}
                    gotoMenu="language" //goes to Appearance Menu
                    >
                        <p>Language&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </DropdownItem>

                    <DropdownItem
                    leftIcon={<LocationIcon />}
                    rightIcon={<RightChevron/>}
                    gotoMenu="location" //goes to Appearance Menu
                    >
                        <p>Location&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </DropdownItem>
                    
                    <DropdownItem
                    leftIcon={<AdvancedIcon />}
                    >
                        Advanced Settings
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition 
              in={activeMenu === 'appearance'}
              unmountOnExit // unmountOnExit removes the children when main is not active
              timeout={500} //duration of animation
              classNames="menu-tertiary"
              onEnter={calcHeight}
              >
                <div className="menu">
                    {/*adds an item called Settings*/}
                    <DropdownItemBack //I used a difference function for the Leftchevron styling
                    leftIcon={<LeftChevron className="leftChevron"/>}
                    gotoMenu="settings"  //takes back to main menu
                    >
                        Appearance
                    </DropdownItemBack>
                    
                </div>
            </CSSTransition>

            <CSSTransition 
              in={activeMenu === 'language'}
              unmountOnExit // unmountOnExit removes the children when main is not active
              timeout={500} //duration of animation
              classNames="menu-tertiary"
              onEnter={calcHeight}
              >
                <div className="menu">
                    {/*adds an item called Settings*/}
                    <DropdownItemBack //I used a difference function for the Leftchevron styling
                    leftIcon={<LeftChevron className="leftChevron"/>}
                    gotoMenu="settings"  //takes back to main menu
                    >
                        Choose your language
                    </DropdownItemBack>
                    
                </div>
            </CSSTransition>

            <CSSTransition 
              in={activeMenu === 'location'}
              unmountOnExit // unmountOnExit removes the children when main is not active
              timeout={500} //duration of animation
              classNames="menu-tertiary"
              onEnter={calcHeight}
              >
                <div className="menu">
                    {/*adds an item called Settings*/}
                    <DropdownItemBack //I used a difference function for the Leftchevron styling
                    leftIcon={<LeftChevron className="leftChevron"/>}
                    gotoMenu="settings"  //takes back to main menu
                    >
                        Choose your location
                    </DropdownItemBack>
                    
                </div>
            </CSSTransition>
        </div>
    );
}
