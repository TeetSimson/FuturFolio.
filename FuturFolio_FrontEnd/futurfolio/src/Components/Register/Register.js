import React from 'react';
import './Register.css';
import Axios from 'axios';

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
        Axios.post("http://localhost:5000/auth/register", {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            console.log("NEW USER!")
            console.log(response);
        });
            /* if (response.data.auth === true) {
                this.props.loadUser(response); // If user registration was successful then load app with this user account
                this.props.onRouteChange('dashboard');
                localStorage.setItem("token", response.data.token);
            }
        }); */
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
        this.props.onRouteChange('dashboard'); // SEND EVERYTHING TO HOME
    }

    render() {
        const { onRouteChange } = this.props;
        return(
            <main className="RegisterWindow">
                <div className="InnerForm">
                    <fieldset id="sign_up" className="RegisterForm">
                        <p className = "SignInTitle">Register</p>
                        <div className="mt3">
                            <input className="RegisterInput"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full Name"
                            onChange={this.onNameChange} // Passing input to function to get the value
                            />
                        </div>
                        <div className="mt3">
                            <input className="RegisterInput"
                            type="email"
                            name="email-address"
                            id="email-address"
                            placeholder="Email"
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mt3">
                            <input className="RegisterInput"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={this.onPasswordChange}
                            />
                        </div>
                        <div className="SignInButtons">
                            <div className="SignInButtonBox">
                                <input
                                    onClick={this.onSubmitSignIn} // When clicked sign in function will check with the server
                                    className="SignInButton"
                                    type="submit"
                                    value="Sign up"
                                />
                            </div>
                            <div className="SignInButtonBox">
                                <button onClick={() => onRouteChange('signin')} // Go to signin page
                                className="BackButton">
                                    Back
                                </button>
                            </div>
                        </div>
                    </fieldset>
                   
                </div>
            </main>

        )

    }
}

export default Register;
