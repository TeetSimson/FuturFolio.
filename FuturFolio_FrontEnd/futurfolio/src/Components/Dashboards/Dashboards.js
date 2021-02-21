import React, { Component } from 'react';
import '../../App.css';
import StockDash from './StockDash/StockDash';
import ProfileDash from './ProfileDash/ProfileScreen';

export default class Dashboards extends Component {
    render() {

        return (
            <div className="background">
                {this.props.dashboard === 'Dashboard'
                ? 
                    console.log("Shows Dashboard")
                :
                    (this.props.dashboard === 'StockDash'
                    ? 
                        <StockDash />
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
                                    console.log("ERROR")
                                )
                            )

                        )
                    )
                }

            </div>
        )
    }
}