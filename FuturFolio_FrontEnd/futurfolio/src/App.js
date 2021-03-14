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
    stocks: null,
    dashboard: 'Dashboard',
    title: 'Dashboard',
    stockApi: null
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // FETCHING STOCKS
  componentDidMount() {
    fetch("http://localhost:5000/stocks/",{method:'post',credentials:"include"})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState(Object.assign(this.state.user, { stocks: data}))
        /*this.setState({ users: data.results });*/
      }); // Catch
    fetch("http://localhost:5000/APIstocks/allData",{method:'post',credentials:"include"})
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.setState(Object.assign(this.state.user, { StockApi: data}))
      /*this.setState({ users: data.results });*/
    }); // Catch
  }

  // Functions to change Dashboards
  DashChangeDash = () => {
    this.setState(Object.assign(this.state.user, { dashboard: 'Dashboard'}))
    this.setState(Object.assign(this.state.user, { title: 'Dashboard'}))
  }

  DashChangeStock = () => {
    this.setState(Object.assign(this.state.user, { dashboard: 'StockDash'}))
    this.setState(Object.assign(this.state.user, { title: 'Stocks'}))
  }

  DashChangeLoans = () => {
    this.setState(Object.assign(this.state.user, { dashboard: 'LoansDash'}))
    this.setState(Object.assign(this.state.user, { title: 'Loans'}))
  }

  DashChangeRealEstate = () => {
    this.setState(Object.assign(this.state.user, { dashboard: 'RealEstateDash'}))
    this.setState(Object.assign(this.state.user, { title: 'Real Estate'}))
  }

  DashChangeProfile = () => {
    this.setState(Object.assign(this.state.user, { dashboard: 'ProfileDash'}))
    this.setState(Object.assign(this.state.user, { title: 'Profile'}))
  }

  DashChangeSettings = () => {
    this.setState(Object.assign(this.state.user, { dashboard: 'SettingsDash'}))
    this.setState(Object.assign(this.state.user, { title: 'Settings'}))
  }

  // Route changes
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState) // If user is not signed in clear state
    } else if (route === 'dashboard') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  // RENDERING STARTS
  render() {
    const { isSignedIn, route } = this.state; // so we don´t have to do this.state.isSignedIN

    return (
      <div>
      { route === 'dashboard' // If we are on "home" page
      ?  <div className="App">
          <Sidebar 
            DashChangeDash={this.DashChangeDash} // Sending functions to sidebar buttons
            DashChangeStock={this.DashChangeStock}
            DashChangeLoans={this.DashChangeLoans}
            DashChangeRealEstate={this.DashChangeRealEstate}
            />
          <Dashboards 
            dashboard={this.state.user.dashboard} // Sending which dashboard to display
            user={this.state.user} // Sending user data
          />
          <Topbar 
            DashChangeProfile={this.DashChangeProfile}
            DashChangeSettings={this.DashChangeSettings}
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

