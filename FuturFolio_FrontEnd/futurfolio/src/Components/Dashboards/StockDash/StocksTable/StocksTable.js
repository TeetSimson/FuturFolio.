import React, { Component } from 'react'
import './StocksTable.css'
import Table from './Table';
import AddStockMenu from './AddStockMenu/AddStockMenu';

export default class StocksTable extends Component {
    constructor() {
        super();
        this.state = {
            Show: false,
            Scale: true,
            CSS: ".StocksPanel:hover{transform: scale(1.015);}"
        };
      }

    AddStockClick = () => {
        // Have to disable scale because absolute add stock panel not scaling properly
        if (this.state.Scale === true) {
            document.getElementById("AddStockMenuShowBtn").innerHTML = "Close";
            document.getElementById("StocksPanelID").style.transform = "scale(1)";
            document.getElementById("TableBox").style.zIndex = "0";
            this.setState({Scale: false});
            
        } else {
            // Removing the temporary style which disabled the scale
            document.getElementById("AddStockMenuShowBtn").innerHTML = "Add +";
            document.getElementById("StocksPanelID").style.transform = null;
            document.getElementById("TableBox").style.zIndex = "2";
            this.setState({Scale: true});
        }
        this.setState({Show: !this.state.Show}); 
    }
    
    render() {
        return (
            <div className="StocksBox">
                <AddStockMenu Stocks={this.props.stocks} Show={this.state.Show} />
                <div className="TopBar">
                    <p className="Title">Stocks</p>
                    <div className="TopBarBox">
                        <div className="TimerBox">
                            <p className="Market">Market open</p>
                            <p className="Numbers">5 : 29 : 18 </p>
                        
                            <button className="AddStock" onClick={this.AddStockClick}>
                                <p id="AddStockMenuShowBtn" className="Add">Add +</p>
                            </button>
                        </div>
                    </div>
                </div>

                <div id="TableBox">
                        <Table 
                            stocks={this.props.stocks}
                            stockApi={this.props.stockApi}
                        />
                </div>
            </div>
        )
    }
}
