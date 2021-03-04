import React, { Component } from 'react';
import profilepic from './profilepic.jpg';
import "./ProfileScreen.css"
import { ReactComponent as ProfileIcon } from './Icons/profileIcon.svg';

export default class ProfileScreen extends Component{
    render(){
        return(
            <div>
                <div>
                    <div className="ProfilePos">
                        <div className="ProfileIcon">
                            <ProfileIcon/>
                        </div>
                        
                    </div>
                    <div>
                        <h4>Name holder</h4>
                        <div style={{diplay:"flex", justifyContent:"space-between", width:"108%"}}>
                            <h6>Location</h6>
                            <h6>Age</h6>
                            <h6>Friends</h6>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}