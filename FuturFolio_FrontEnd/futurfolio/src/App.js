import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Dashboards from './Components/Dashboards/Dashboards';
import Topbar from './Components/Topbar/Topbar';
import ProfileScreen from './Components/Dashboards/ProfileDash/ProfileScreen';
import React, { Component } from 'react';


const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    dashboard: 'Dashboard',
    title: 'Stocks'
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // Functions to change Dashboards
  DashChangeDash = () => {
    this.setState(Object.assign(this.state.user, { dashboard: 'Dashboard'}))
  }

  DashChangeStock = () => {
    this.setState(Object.assign(this.state.user, { dashboard: 'StockDash'}))
  }

  DashChangeLoans = () => {
    this.setState(Object.assign(this.state.user, { dashboard: 'LoansDash'}))
  }

  DashChangeRealEstate = () => {
    this.setState(Object.assign(this.state.user, { dashboard: 'RealEstateDash'}))
  }

  DashChangeProfile = () => {
    this.setState(Object.assign(this.state.user, { dashboard: 'ProfileDash'}))
    console.log("Worked")
  }

  // Route changes
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState) // If user is not signed in clear state
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  // RENDERING STARTS
  render() {
    const { isSignedIn, route } = this.state; // so we don´t have to do this.state.isSignedIN

    return (
      <div>
      { route === 'home' // If we are on "home" page
      ?  <div className="App">
          <Sidebar 
            DashChangeDash={this.DashChangeDash} // Sending functions to sidebar buttons
            DashChangeStock={this.DashChangeStock}
            DashChangeLoans={this.DashChangeLoans}
            DashChangeRealEstate={this.DashChangeRealEstate}
            />
          <Dashboards 
            dashboard={this.state.user.dashboard} // Sending which dashboard to display
          />
          <Topbar 
            DashChangeProfile={this.DashChangeProfile}
            title={this.state.user.title}
            /> 
        </div>
      :  // Else if we are on "profile" page
        route === 'profile' 
          ? <ProfileScreen />

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

