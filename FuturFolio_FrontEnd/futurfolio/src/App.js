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
    joined: '',
    stocks: null
  },
  dashboard: 'Dashboard',
  title: 'Dashboard'
}

export default class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

  // Functions to change Dashboards
  DashChangeDash = () => {
    this.setState(Object.assign(this.state, { dashboard: 'Dashboard'}))
    this.setState(Object.assign(this.state, { title: 'Dashboard'}))
  }

  DashChangeStock = () => {
    this.setState(Object.assign(this.state, { dashboard: 'StockDash'}))
    this.setState(Object.assign(this.state, { title: 'Stocks'}))
  }

  DashChangeLoans = () => {
    this.setState(Object.assign(this.state, { dashboard: 'LoansDash'}))
    this.setState(Object.assign(this.state, { title: 'Loans'}))
  }

  DashChangeRealEstate = () => {
    this.setState(Object.assign(this.state, { dashboard: 'RealEstateDash'}))
    this.setState(Object.assign(this.state, { title: 'Real Estate'}))
  }

  DashChangeProfile = () => {
    this.setState(Object.assign(this.state, { dashboard: 'ProfileDash'}))
    this.setState(Object.assign(this.state, { title: 'Profile'}))
  }

  DashChangeSettings = () => {
    this.setState(Object.assign(this.state, { dashboard: 'SettingsDash'}))
    this.setState(Object.assign(this.state, { title: 'Settings'}))
  }

  // Route changes
  onRouteChange = (route) => {
    if (route === 'dashboard') {
      this.setState({isSignedIn: true})
      this.setState(Object.assign(this.state.user, { dashboard: 'Dashboard'}))
      this.setState(Object.assign(this.state.user, { title: 'Dashboard'}))
      this.setState({route: route});
    } else {
      console.log("Error on route change")
    }
  }

  loadUser = (user) => {
    this.setState(Object.assign(this.state.user, { id: user.id}))
    this.setState(Object.assign(this.state.user, { token: user.data.token}))
  }

  setUserStocks = (data) => {
    console.log(data);
    this.setState(Object.assign(this.state.user, { stocks: data}))
  }

  LogOut = () => {
    localStorage.clear();
    this.setState(initialState);
  }

  // RENDERING STARTS
  render() {
    const { isSignedIn, route } = this.state; // so we don´t have to do this.state.isSignedIN

    return (
      <div>
      { isSignedIn && route === 'dashboard' // If we are on "home" page
      ?  <div className="App">
          <Sidebar 
            DashChangeDash={this.DashChangeDash} // Sending functions to sidebar buttons
            DashChangeStock={this.DashChangeStock}
            DashChangeLoans={this.DashChangeLoans}
            DashChangeRealEstate={this.DashChangeRealEstate}
            />
          <Dashboards 
            dashboard={this.state.dashboard} // Sending which dashboard to display
            user={this.state.user} // Sending user data
          />
          <Topbar 
            LogOut={this.LogOut}
            DashChangeProfile={this.DashChangeProfile}
            DashChangeSettings={this.DashChangeSettings}
            title={this.state.title}
            /> 
        </div>
      :  // Else if we are on "profile" page
        isSignedIn && route === 'profile' 
          ? <ProfileScreen />

      : ( // Else if we are on "signin" page
        route === 'signin' 
          ? <Signin loadUser={this.loadUser} setUserStocks={this.setUserStocks} onRouteChange={this.onRouteChange}/> // If on "signin" page
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> // If on "register" page
        )
      
      }
      </div>
    )
  }
}

