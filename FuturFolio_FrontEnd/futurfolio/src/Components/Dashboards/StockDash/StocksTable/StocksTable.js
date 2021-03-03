import React, { Component } from 'react'
import './StocksTable.css'

export default class StocksTable extends Component {
    render() {
        return (
            <div>
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
                    <div className="TableBox">

                    </div>
                </div>
            </div>
        )
    }
}
