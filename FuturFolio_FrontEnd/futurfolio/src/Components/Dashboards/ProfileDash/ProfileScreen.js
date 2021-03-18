import React, { Component} from 'react';
import "./ProfileScreen.css"
import { ReactComponent as ProfileIcon } from './Icons/profileIcon.svg';
import { ReactComponent as CogIcon } from './Icons/cogIcon.svg';






export default class ProfileScreen extends Component{
    Settings(props){
        function Profsetbutton(props){//settings button
            return(
                <div className="profsetitem">
                    <a href="#" className = "profsetbutton" onClick={props.DashChangeSettings}>
                    <span className="leftIcon">{props.leftIcon}</span>{/*Icon on the left*/}
                        {props.children}
                    </a>
                </div>
            );
        }
        return(
                <div>
                    <Profsetbutton DashChangeSettings={props.DashChangeSettings}
                        leftIcon={<CogIcon />}
                        >
                        Profile Settings
                    </Profsetbutton>
                </div>
        );
    }
    
    
    nameInfo(){
        const name = "Elon Musk";
        return(
            <div className="Name"><h1>{name}</h1></div>  
        );
    }

    description(){
        const descripvar= "Hello there I am using Futurfolio for my finances";
        return(
                <div className = "Description">
                    <h3>{descripvar}</h3>
                </div>
        );
    }

   email(){
        const emailvar= "email@mail.com";
        return(
                <div className = "Email">
                    <h2>Email:</h2>
                    <h3>{emailvar}</h3>
                </div>
        );
    }

    location(){
        const locvar= "United Kingdom";
        return(
                <div className = "Location">
                    <h2>Location:</h2>
                    <h3>{locvar}</h3>
                </div>
        );
    }

    friends(){
        const friendvar= "0";
        return(
                <div className = "Friends">
                    <h2>Friends:</h2>
                    <h3>{friendvar}</h3>
                </div>
        );
    }


    render(){
        return(
                <div>
                    <div>
                        <div className="ProfilePos">
                            <div className="ProfileIcon">
                                <ProfileIcon/>
                            </div>
                            <div>
                                <this.nameInfo/>
                                <this.description/>
                                <this.Settings
                                DashChangeSettings={this.props.DashChangeSettings}
                                />
                                
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                   
                    <div>
                        <div className="Credentials">
                            <div className="Column"><this.email/></div>
                            <div className="Column"><this.location/></div>
                            <div className="Column"><this.friends/></div>
                        </div>
                        <div>
                            <div className="Acheivements">
                                <h1>Acheivements</h1>
                            </div>
                        </div>
                    </div>
                </div>
                    
        );
    }
}