import React, { Component } from 'react';
import '../../App.css';
import profilepic from './profilepic.jpg';
import ProfileScreen from './ProfileScreen';


export default class Topbar extends Component {
    render() {
        return (
            <nav className="topbarItems">
                <div className="Profile">
                    <button><img id="profilepic" src={profilepic} alt="profile" onClick={ProfileScreen}/></button>
                </div>
            </nav>
        )
    }
}

