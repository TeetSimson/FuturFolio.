import React, { Component } from 'react'
import "../../App.css";
import "./Sidebar.css";
import Logo from './Futurfolio_logo.png';
import PlusButton from './PlusButton';
import SidebarItems from './SidebarItems';

export default class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            Show: false,
            Stocks: true,
            Loans: true,
            RealEstate: true
        };
      }

    // What dashboard buttons to show
    StocksChange = () => {
    this.setState({Stocks: !this.state.Stocks}) 
    }

    LoansChange = () => {
        this.setState({Loans: !this.state.Loans}); 
        }
    
    RealEstateChange = () => {
        this.setState({RealEstate: !this.state.RealEstate}); 
    }

    // Is the Choose Dashboards menu open or not
    PlusClick = () => {
        this.setState({Show: !this.state.Show}); 
    }

    render() {
        return (
            <nav className="Sidebar">
                <img id="Logo" src={Logo} alt='Logo'/>
                <div className="SidebarButtons">
                    {/* Sample icon, will be replaced by function later*/}
                    <SidebarItems
                        DashChangeDash={this.props.DashChangeDash}
                        DashChangeStock={this.props.DashChangeStock}
                        DashChangeLoans={this.props.DashChangeLoans}
                        DashChangeRealEstate={this.props.DashChangeRealEstate}
                        Stocks={this.state.Stocks}
                        Loans={this.state.Loans}
                        RealEstate={this.state.RealEstate}
                    />
                </div>
                <div>
                    <PlusButton 
                        Show={this.state.Show}
                        Stocks={this.state.Stocks}
                        Loans={this.state.Loans}
                        RealEstate={this.state.RealEstate}
                        PlusClick={this.PlusClick}
                        StocksChange={this.StocksChange}
                        LoansChange={this.LoansChange}
                        RealEstateChange={this.RealEstateChange}
                    />
                </div>
                <div className="VersionBox">
                    <p className="Version">v0.2</p>
                </div>
            </nav>
        )
    }
}
