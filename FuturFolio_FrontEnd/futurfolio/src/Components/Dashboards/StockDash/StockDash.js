import React, { Component } from 'react'
import './StockDash.css';
import NetWorth from './NetWorth/NetWorth';
import StocksTable from './StocksTable/StocksTable';
import Axios from 'axios';

export default class StockDash extends Component {
    constructor() {
        super()
        this.state = {
            stockApi: null
        };
    }

    // UPDATE STOCKS 
    componentDidMount() {
        Axios.post("http://localhost:5000/APIstocks/updateJSON",{
            stocks: this.props.stocks,
            token: localStorage.getItem("token"),
        })
        .then((data) => {
            console.log(data.data);
            this.setState({ stockApi: data });
        }).catch(err => console.log(err));
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
                <div className="StocksPanel">
                    <StocksTable 
                        stocks={this.props.stocks}
                        stockApi={this.props.stockApi}
                    />
                </div>
            </div>
        )
    }
}
