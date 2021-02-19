import React, { Component } from 'react'
import StocksLogo from "./Icons/profits.png" ;
import DashLogo from "./Icons/speedometer.png" ;
import LoansLogo from "./Icons/hand.png" ;

export default class SidebarItem extends Component {
    render() {
        return (
            <div>
                <button className="Dashboards">
                            <img className="DashboardLogo"
                            src={DashLogo}
                            alt="Stocks Dashboard"
                            onClick={this.props.DashChangeDash}/> {/* Use the DashChange function in App.js */}
                        </button>

                { this.props.Stocks === true
                    ?   
                        <button className="Dashboards">
                            <img className="DashboardLogo"
                            src={StocksLogo}
                            alt="Stocks Dashboard"
                            onClick={this.props.DashChangeStock}/>
                        </button>
                    : 
                        <div></div>
                    
                }

                { this.props.Loans === true
                    ?   
                        <button className="Dashboards">
                            <img className="DashboardLogo"
                            src={LoansLogo}
                            alt="Loans Dashboard"
                            onClick={this.props.DashChangeLoans}/>
                        </button>
                    : 
                        <div></div>
                    
                }

                { this.props.RealEstate === true
                    ?   
                        <button className="Dashboards">
                            <img className="DashboardLogo"
                            src="https://img.icons8.com/fluent-systems-regular/128/000000/real-estate.png" 
                            alt="Real Estate Dashboard"
                            onClick={this.props.DashChangeRealEstate}/>
                        </button>
                    : 
                        <div></div>
                    
                }
            </div>
        )
    }
}

