import React, { Component } from 'react'
import './StockDash.css';
import NetWorth from './NetWorth/NetWorth';
import StockPie from './Panel2/StockPie';
import DividendMeter from './Panel1/DividendMeter';
import StocksTable from './StocksTable/StocksTable';

export default class StockDash extends Component {
    constructor() {
        super()
        this.state = {

        };
    }

    stockAmount = (stock) => {
        let amountTotal = stock.transactions.reduce(function(prev, cur) {
          return prev + cur.amount;
        }, 0);
    
        return (amountTotal);
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
                        <DividendMeter
                            stockAmount={this.stockAmount}
                            stocks={this.props.stocks[0]}
                        />
                    </div>
                    <div className="CustomPanel2">
                        <StockPie
                            stockAmount={this.stockAmount}
                            stocks={this.props.stocks[0]}
                        />
                    </div>
                </div>
                <div id="StocksPanelID" className="StocksPanel">
                    <StocksTable 
                        stocks={this.props.stocks[0]}
                        setNewUserStock={this.props.setNewUserStock}
                    />
                </div>
            </div>
        )
    }
}
