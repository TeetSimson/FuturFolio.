import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import StockDash from './Components/StockDash/StockDash';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

import React, { Component } from 'react'


const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState) // If user is not signed in clear state
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route } = this.state; // so we don´t have to do this.state.isSignedIN

    return (
      <div>
      { route === 'home' // If we are on "home" page
      ?  <div className="App">
          <Sidebar />
          <StockDash />
        </div>
      : ( // Else if we are on "signin" page
        route === 'signin' 
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> // If on "signin" page
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> // If on "register" page
        )
      }
      </div>
    )
  }
}

