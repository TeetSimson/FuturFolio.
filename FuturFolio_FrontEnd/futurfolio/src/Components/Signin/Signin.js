import React from 'react';
import './Signin.css';
import Axios from 'axios';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // states which we will update here
          signInEmail: '',
          signInPassword: ''
        }
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value}) // Get user email input
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value}) // Get user password input
    }

    onSubmitSignIn = () => {
        Axios.post("http://localhost:5000/auth/signin", {
            email: this.state.signInEmail,
            password: this.state.signInPassword
        }).then(response => {
            console.log(response);
            if (response.data.auth === true) {
                this.props.loadUser(response); // If user registration was successful then load app with this user account
                this.props.onRouteChange('dashboard');

                 try{
                    console.log(response.data)
                    var base64Flag = 'data:'+response.data.imageType+';base64,';
                    var imageStr = this.arrayBufferToBase64(response.data.imageBuffer.buffer.data);
                    var profileImage = base64Flag + imageStr
                    
                }catch{
                    var base64Flag = 'data:image/svg+xml;base64,';
                    var imageStr = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjguMSAoMjk2ODcpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPnByb2ZpbGUgWyMxMzQxXTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJEcmliYmJsZS1MaWdodC1QcmV2aWV3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgwLjAwMDAwMCwgLTIxNTkuMDAwMDAwKSIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgIDxnIGlkPSJpY29ucyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTYuMDAwMDAwLCAxNjAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTM0LDIwMDguOTk5OTggQzEzMS43ODM0OTYsMjAwOC45OTk5OCAxMjkuOTgwOTU1LDIwMDcuMjA1OTggMTI5Ljk4MDk1NSwyMDA0Ljk5OTk4IEMxMjkuOTgwOTU1LDIwMDIuNzkzOTggMTMxLjc4MzQ5NiwyMDAwLjk5OTk4IDEzNCwyMDAwLjk5OTk4IEMxMzYuMjE2NTA0LDIwMDAuOTk5OTggMTM4LjAxOTA0NSwyMDAyLjc5Mzk4IDEzOC4wMTkwNDUsMjAwNC45OTk5OCBDMTM4LjAxOTA0NSwyMDA3LjIwNTk4IDEzNi4yMTY1MDQsMjAwOC45OTk5OCAxMzQsMjAwOC45OTk5OCBNMTM3Ljc3NTg5MywyMDA5LjY3Mjk4IEMxMzkuMzcwNDQ5LDIwMDguMzk1OTggMTQwLjI5OTg1NCwyMDA2LjMzMDk4IDEzOS45NTgyMzUsMjAwNC4wNjk5OCBDMTM5LjU2MTM1NCwyMDAxLjQ0Njk4IDEzNy4zNjg5NjUsMTk5OS4zNDc5OCAxMzQuNzIyNDIzLDE5OTkuMDQxOTggQzEzMS4wNzAxMTYsMTk5OC42MTg5OCAxMjcuOTcxNDMyLDIwMDEuNDQ4OTggMTI3Ljk3MTQzMiwyMDA0Ljk5OTk4IEMxMjcuOTcxNDMyLDIwMDYuODg5OTggMTI4Ljg1MTYwMywyMDA4LjU3Mzk4IDEzMC4yMjQxMDcsMjAwOS42NzI5OCBDMTI2Ljg1MjEyOCwyMDEwLjkzMzk4IDEyNC4zOTA0NjMsMjAxMy44OTQ5OCAxMjQuMDA0NjM0LDIwMTcuODkwOTggQzEyMy45NDgzNjgsMjAxOC40ODE5OCAxMjQuNDExNTYzLDIwMTguOTk5OTggMTI1LjAwODM5MSwyMDE4Ljk5OTk4IEMxMjUuNTE5ODE0LDIwMTguOTk5OTggMTI1Ljk1NTg4MSwyMDE4LjYxNTk4IDEyNi4wMDEwOTUsMjAxOC4xMDg5OCBDMTI2LjQwNDAwNCwyMDEzLjY0NTk4IDEyOS44MzcyNzQsMjAxMC45OTk5OCAxMzQsMjAxMC45OTk5OCBDMTM4LjE2MjcyNiwyMDEwLjk5OTk4IDE0MS41OTU5OTYsMjAxMy42NDU5OCAxNDEuOTk4OTA1LDIwMTguMTA4OTggQzE0Mi4wNDQxMTksMjAxOC42MTU5OCAxNDIuNDgwMTg2LDIwMTguOTk5OTggMTQyLjk5MTYwOSwyMDE4Ljk5OTk4IEMxNDMuNTg4NDM3LDIwMTguOTk5OTggMTQ0LjA1MTYzMiwyMDE4LjQ4MTk4IDE0My45OTUzNjYsMjAxNy44OTA5OCBDMTQzLjYwOTUzNywyMDEzLjg5NDk4IDE0MS4xNDc4NzIsMjAxMC45MzM5OCAxMzcuNzc1ODkzLDIwMDkuNjcyOTgiIGlkPSJwcm9maWxlLVsjMTM0MV0iPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
                    var profileImage = base64Flag + imageStr
                }

                localStorage.setItem("profileImage", profileImage);
                localStorage.setItem("token", response.data.token);
            }
        }).then(() => {
                // FETCHING STOCKS
                Axios.post("http://localhost:5000/stocks/",{
                    token: localStorage.getItem("token"),
                })
                .then((data) => {
                    this.props.setUserStocks(data.data);

                    }).catch(err => console.log(err));

        });

        /*  fetch('http://localhost:5000/auth/signin', { // Check with the server does the user exist
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ // Converts JavaScript object to JSON string
                email: this.state.signInEmail,
                password: this.state.signInPassword
            }),
            credentials: "include"
        })
            .then(response => console.log(response.json()))

            .then(data => {
                console.log(data);
               /*  if (data) { // "user.id" cannot be empty list but just "user" can and would always return true
                    console.log(data);
                    //this.props.loadUser(user); // If user registration was successful then load app with this user account
                    this.props.onRouteChange('dashboard');
                }
            }  */
    };

    render() {
        const { onRouteChange } = this.props;
        return(
            <article>
                <main>
                    <div className="SigninWindow">
                        <fieldset id="sign_up" className="SigninForm">
                            <p className = "title">Sign In</p>
                            <div>
                                <input className="RegisterInput"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    placeholder="Email"
                                    onChange={this.onEmailChange} // Passing input to function to get the value
                                />
                            </div>
                            <div>
                                <input className="RegisterInput"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
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
