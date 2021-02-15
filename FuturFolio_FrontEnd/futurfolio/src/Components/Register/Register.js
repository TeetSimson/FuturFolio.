import React from 'react';
import './Register';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // states which we will update here
          email: '',
          password: '',
          name: ''
        }
    }
    
    onNameChange = (event) => {
        this.setState({name: event.target.value}) // Get user name input
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value}) // Get user email input 
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value}) // Get user password input
    }

    onSubmitSignIn = () => {
        /* fetch('http://localhost:3000/register', {  // Send inputs to database through server as json with POST
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ // Converts JavaScript object to JSON string
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) { // "user.id" cannot be empty list but just "user" can and would always return true
                    this.props.loadUser(user) // If user registration was successful then load app with this user account
                    this.props.onRouteChange('home');
                }
            }) */
        this.props.onRouteChange('home'); // SEND EVERYTHING TO HOME
    }
    
    render() {
        const { onRouteChange } = this.props;
        return(
            <article>
                <main className="Window">
                    <div className="InnerForm">
                        <fieldset id="sign_up" className="Form">
                            <legend className="CaptionLabel">
                                Register
                            </legend>
                            <div className="mt3">
                                <label className="Label" htmlFor="name">
                                    Full name
                                </label>
                                <input className="Name" 
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={this.onNameChange} // Passing input to function to get the value
                                />
                            </div>
                            <div className="mt3">
                                <label className="Label" htmlFor="email-address">
                                    Email
                                </label>
                                <input className="Email"
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                                />
                            </div>
                            <div>
                                <label className="Label" htmlFor="password">
                                    Password
                                </label>
                                <input className="Password"
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div>
                            <input 
                                onClick={this.onSubmitSignIn} // When clicked sign in function will check with the server
                                className="SignUpButton" 
                                type="submit" 
                                value="Sign up"
                            />
                        </div>
                        <div> 
                        <button onClick={() => onRouteChange('signin')} // Go to signin page
                            className="RegisterButton">Back</button>
                        </div>
                    </div>
                </main>
            </article>
        )
                
    }
} 

export default Register;