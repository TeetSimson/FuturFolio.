import React, { Component } from 'react';
import '../../App.css';
import StockDash from './StockDash/StockDash';
import ProfileDash from './ProfileDash/ProfileScreen';
import SettingsDash from './SettingsDash/SettingsDash';
import Axios from 'axios';

export default class Dashboards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stocks: props.user.stocks
        };
    }

    setStockMarketData = () => {
        Axios.post("http://localhost:5000/stocks/",{
            token: localStorage.getItem("token"),
        })
        .then((data) => {
            // Fetching stock market data
            Axios.post("http://localhost:5000/APIstocks/updateJSON",{
                stocks: data.data,
                token: localStorage.getItem("token"),
            })
            .then((data) => {
                this.setState({ stocks: data.data });
            })
        })
        .catch(err => console.log(err));

      }

    // DOESNT WORK
    removeStockFromTable = (numberOfStock) => {
        //newStocksArray = newStocksArray.concat(this.state.stocks[0]);
/*         newStocksArray.splice(numberOfStock-1,1, undefined);
        console.log(newStocksArray); */
        this.setState({stocks: [this.state.stocks[0].splice(numberOfStock-1,1, undefined), this.state.stocks[1]]});
    }

    render() {
        console.log(this.state.stocks)
        return (
            <div className="background"> {/* On which Dashboard */}
                {this.props.dashboard === 'Dashboard'
                ? 
                    console.log("Shows Dashboard")
                :
                    (this.props.dashboard === 'StockDash'
                    ? 
                        <StockDash 
                            stocks={this.state.stocks}
                            removeStockFromTable={this.removeStockFromTable}
                            setStockMarketData={this.setStockMarketData} // For updating stocks data
                        />
                    :
                        (this.props.dashboard === 'LoansDash'
                        ? 
                            console.log("Shows Loans actually")
                        :
                            (this.props.dashboard === 'RealEstateDash'
                            ? 
                                console.log("Shows RE actually")
                            :
                                (this.props.dashboard === 'ProfileDash'
                                ? 
                                    <ProfileDash 
                                        DashChangeSettings={this.props.DashChangeSettings}
                                    />
                                :
                                    (this.props.dashboard === 'SettingsDash'
                                    ? 
                                        <SettingsDash />
                                    :
                                        console.log("ERROR")
                                    )
                                )
                            )

                        )
                    )
                }

            </div>
        )
    }
}