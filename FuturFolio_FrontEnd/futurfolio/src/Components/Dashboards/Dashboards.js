import React, { Component } from 'react';
import '../../App.css';
import StockDash from './StockDash/StockDash';
import ProfileDash from './ProfileDash/ProfileScreen';
import SettingsDash from './SettingsDash/SettingsDash';
import Axios from 'axios';

export default class Dashboards extends Component {
    constructor() {
        super()
        this.state = {
            stocks: null,
            stockApi: null
        };
      }
        // FETCHING STOCKS
    componentDidMount() {
    Axios.post("http://localhost:5000/stocks/",{
        token: this.props.user.token,
    })
        .then((data) => {
        console.log(data);
        this.setState({ stocks: data });
        }).catch(
            console.log("Error getting user stocks!")
        );

    Axios.post("http://localhost:5000/APIstocks/allData",{
        token: this.props.user.token,
    })
    .then((data) => {
        console.log(data);
        this.setState({ stockApi: data });
    }).catch(
        console.log("Error fetching API")
    )
    }

    render() {
        console.log(this.state.stocks + "??????");
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
                            stockApi={this.state.stockApi}
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
                                    <ProfileDash />
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