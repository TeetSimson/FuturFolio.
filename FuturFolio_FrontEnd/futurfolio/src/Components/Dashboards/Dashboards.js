import React, { Component } from 'react';
import '../../App.css';
import StockDash from './StockDash/StockDash';
import ProfileDash from './ProfileDash/ProfileScreen';
import SettingsDash from './SettingsDash/SettingsDash';
import Axios from 'axios';

export default class Dashboards extends Component {
    

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
                            stocks={this.props.user.stocks}
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