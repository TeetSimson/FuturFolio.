import React, { Component } from 'react'
import './StockDash.css';
import NetWorth from './NetWorth/NetWorth';
import StocksTable from './StocksTable/StocksTable';
import Axios from 'axios';

export default class StockDash extends Component {
    constructor() {
        super()
        this.state = {

        };
    }

    render() {

        return (
            <div className="StockDash">
                <div className="NetWorthPanel">
                    <div className="NetWorthPanelInner">
                        <NetWorth />
                    </div>
                </div>
                <div className="CustomPanels">
                    <div className="CustomPanel">

                    </div>
                    <div className="CustomPanel2">

                    </div>
                </div>
                <div id="StocksPanelID" className="StocksPanel">
                    <StocksTable 
                        stocks={this.props.stocks}
                        setNewUserStock={this.props.setNewUserStock}
                    />
                </div>
            </div>
        )
    }
}
