import React, { Component } from 'react'
import NetWorthTab from './NetWorthTab'

export default class NetWorth extends Component {
    constructor() {
        super();
        this.state = {
            NetWorth: "25,023",
            Currency: '£'
        };
      }

    render() {

        return (
            <div>
                <NetWorthTab 
                Currency={this.state.Currency}
                NetWorth={this.state.NetWorth} />
            </div>
        )
    }
}
