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
            stocks: props.user.stocks,
            firstTime: true
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

    // When the stock market data arrives update current component state as well
    componentDidUpdate(){
        if (this.state.stocks !== this.props.user.stocks && this.state.firstTime) {
            this.setState({stocks: this.props.user.stocks});
            this.setState({firstTime: false})
        }
    }

    removeStockFromTable = (Name) => {
        const newArray = this.state.stocks[0].filter((item) => item.stockName !== Name);
        this.setState({stocks: [newArray, this.state.stocks[1]]});
    }

    render() {
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
                                        user={this.props.user}
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