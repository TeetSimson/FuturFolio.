import React, { Component } from 'react';
import '../../App.css';
import "./Topbar.css";
import profilepic from './profilepic.jpg';
import ProfileScreen from './ProfileScreen';


export default class Topbar extends Component {
    render() {
        return (
            <nav className="Topbar">
                <img className="profilepic" src={profilepic} alt="profile" onClick={this.props.ChangeProfileScreen}/>
            </nav>
        )
    }
}

