import React, { Component } from 'react'
import './StocksTable.css'
import Table from './Table/Table';
import AddStockMenu from './AddStockMenu/AddStockMenu';
import TrashIcon from './delete.png';
import Axios from 'axios';

export default class StocksTable extends Component {
    constructor() {
        super();
        this.state = {
            Show: false,
            Scale: true
        };
      }

    AddStockClick = () => {
        // Have to disable scale because absolute add stock panel not scaling properly
        if (this.state.Scale === true) {
            document.getElementById("AddStockMenuShowBtn").textContent = "Close";
            document.getElementById("StocksPanelID").style.transform = "scale(1)";
            document.getElementById("TableBox").style.zIndex = "0";
            this.setState({Scale: false});
            
        } else {
            // Removing the temporary style which disabled the scale
            document.getElementById("AddStockMenuShowBtn").textContent = "Add +";
            document.getElementById("StocksPanelID").style.transform = null;
            document.getElementById("TableBox").style.zIndex = "2";
            this.setState({Scale: true});
        }
        this.setState({Show: !this.state.Show}); 
    }

    removeStock = () => {
        let tableFields = document.getElementById("GetRows");
        let currentStocks = tableFields.children;
        for (var i = 1; i < currentStocks.length; i++) {
            let checkbox = currentStocks[i].children[0].children[0];
            if (checkbox.checked) {
                
                Axios.post("http://localhost:5000/stocks/removeStock",{
                        stockName: checkbox.value,
                        token: localStorage.getItem("token")
                    })
                    .then(() => {
                        console.log("Stock Removed");
                        this.props.removeStockFromTable(checkbox.value);

                    }).catch(err => {
                        console.log(err)
                        console.log("Database error for adding dividends")
                    });
            }
        }
    }
    
    render() {

        return (
            <div className="StocksBox">
                <AddStockMenu 
                    Stocks={this.props.stocks} 
                    Show={this.state.Show} 
                    //setNewUserStock={this.props.setNewUserStock}
                    setStockMarketData={this.props.setStockMarketData} // For updating stocks data
                />
                <div className="TopBar">
                    <p className="Title">Stocks</p>
                    <button id="TrashButton" onClick={this.removeStock}>
                        <img id="TrashIcon" src={TrashIcon} alt="" />
                    </button>
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
                        />
                </div>
            </div>
        )
    }
}
