import React, { Component } from 'react'
import './StockDash.css';
import NetWorth from './NetWorth/NetWorth';
import StocksTable from './StocksTable/StocksTable';

export default class StockDash extends Component {
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
                <div className="StocksPanel">
                    <StocksTable />
                </div>
            </div>
        )
    }
}
