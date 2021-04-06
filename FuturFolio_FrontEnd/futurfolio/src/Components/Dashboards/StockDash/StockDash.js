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
            netWorthList: [0]
        };
    }

    stockAmount = (stock) => {
        const amountTotal = stock.transactions.reduce(function(prev, cur) {
          return prev + cur.amount;
        }, 0);
    
        return (amountTotal);
    }

    stockValue = (stock) => {
        const valueTotal = stock.transactions.reduce(function(prev, cur) {
          return prev + cur.price;
        }, 0);

        const feesTotal = stock.transactions.reduce(function(prev, cur) {
            return prev + cur.fees;
          }, 0);

        return (valueTotal+feesTotal);
    }

    sumToGetNetWorth = (currentValue) => {
        console.log(this.state.netWorthList);
        this.state.netWorthList.push(parseFloat(currentValue));
    }

    render() {
        return (
            <div className="StockDash">
                <div className="NetWorthPanel">
                    <div className="NetWorthPanelInner">
                        <NetWorth 
                            stocks={this.props.stocks}
                            netWorthList={this.state.netWorthList}
                        />
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
                            stockValue={this.stockValue}
                            stocks={this.props.stocks[0]}
                        />
                    </div>
                </div>
                <div id="StocksPanelID" className="StocksPanel">
                    <StocksTable 
                        stocks={this.props.stocks[0]}
                        removeStockFromTable={this.props.removeStockFromTable}
                        setStockMarketData={this.props.setStockMarketData} // For updating stocks data
                        sumToGetNetWorth={this.sumToGetNetWorth}
                    />
                </div>
            </div>
        )
    }
}
