import React from 'react';
import './Signin.css';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // states which we will update here
          signInEmail: '',
          signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value}) // Get user email input
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value}) // Get user password input
    }

    onSubmitSignIn = () => {
        /* fetch('http://localhost:3000/signin', { // Check with the server does the user exist
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ // Converts JavaScript object to JSON string
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) { // "user.id" cannot be empty list but just "user" can and would always return true
                    this.props.loadUser(user); // If user registration was successful then load app with this user account
                    this.props.onRouteChange('home');
                }
            }) */
        this.props.onRouteChange('home'); // SEND EVERYTHING TO HOME
    }

    render() {
        const { onRouteChange } = this.props;
        return(
            <article>
                <main>
                    <div className="Window">
                        <fieldset id="sign_up" className="Form">
                            <legend className="CaptionLabel">
                            </legend>
                            <div>
                                <label className="Label" htmlFor="email-address">
                                    Email
                                </label>
                                <input className="Email"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange} // Passing input to function to get the value
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
                                className="SigninButton"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div>
                        <button onClick={() => onRouteChange('register')} // Go to register page
                            className="RegisterButton">Register</button>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Signin;
