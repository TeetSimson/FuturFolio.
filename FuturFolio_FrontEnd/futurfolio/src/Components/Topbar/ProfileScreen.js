import React, { Component } from 'react';
import profilepic from './profilepic.jpg';
export default class ProfileScreen extends Component{
    render(){
        return(
            <div>
                <div>
                    <div style={{
                        display:"flex",
                        justifyContent: "space-around",
                        margin: "18px 0px",
                        borderBottom:"1px solid grey"
                    }}>
                        <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                        src={profilepic}
                        />
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