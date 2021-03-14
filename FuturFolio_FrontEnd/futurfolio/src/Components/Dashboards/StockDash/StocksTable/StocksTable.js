import React, { Component } from 'react'
import './StocksTable.css'
import Table from './Table';


export default class StocksTable extends Component {
    render() {
        return (
            <div className="StocksBox">
                <div className="TopBar">
                    <p className="Title">Stocks</p>
                    <div className="TopBarBox">
                        <div className="TimerBox">
                            <p className="Market">Market open</p>
                            <p className="Numbers">5 : 29 : 18 </p>
                        
                            <button className="AddStock">
                                <p className="Add">Add <span>+</span></p>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="TableBox">
                        <Table 
                            stocks={this.props.stocks}
                            stockApi={this.props.stockApi}
                        />
                </div>
            </div>
        )
    }
}
