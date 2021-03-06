import React, { useEffect, useState} from 'react';
import Axios from 'axios';
import './AddStockMenu.css';

export default function AddStockMenu(props) {
    const [Buy, setBuy] = useState(true); 
    
    // Add stock
    const [Ticker, setTicker] = useState(''); 
    const [Transaction, setTransaction] = useState('');
    const [Amount, setAmount] = useState(0);
    const [Price, setPrice] = useState(0);
    const [Fees, setFees] = useState(0);
    // Add Dividends
    const [DivTicker, setDivTicker] = useState(''); 
    const [DivTransaction, setDivTransaction] = useState('');
    const [DivAmount, setDivAmount] = useState(0);

    // Add Stock
    function onTickerChange(event) {
        setTicker(event.target.value);
    }

    function onTransactionChange() {
        let date = document.getElementById("TransactionDate").value;
        setTransaction(date);
    }

    function onAmountChange(event) {
        setAmount(event.target.value);
    }

    function onPriceChange(event) {
        setPrice(event.target.value);
    }

    function onFeesChange(event) {
        setFees(event.target.value);
    }

    // Add Dividends
    function onDivTickerChange(event) {
        setDivTicker(event.target.value);
    }

    function onDivTransactionChange(event) {
        setDivTransaction(event.target.value);
    }

    function onDivAmountChange(event) {
        setDivAmount(event.target.value);
    }

    function onBuyChange() {
        setBuy(true);
    }

    function onSellChange() {
        setBuy(false);
    }

    function onSubmitData() {
        if (Ticker != '') {
            if (Buy === true) {
                Axios.post("http://localhost:5000/APIstocks/SearchYahoo",{
                    stocks: Ticker,
                    token: localStorage.getItem("token"),
                })
                .then((data) => {
                    console.log(data.data);
                    // ADDING transaction to database NEEDS WORKING
                    Axios.post("http://localhost:5000/stocks/newStock",{
                        stockName: data.data.ResultSet.Result[0].name,
                        stockSymbol: data.data.ResultSet.Result[0].symbol,
                        amount: Amount,
                        date: Transaction,
                        price: Price,
                        fees: Fees,
                        token: localStorage.getItem("token")
                    })
                    .then(() => {
                        console.log("Buy data added to database!")
                        props.setStockMarketData();

                    }).catch(err => {
                        console.log(err)
                        console.log("Database error for buy")
                    });

                }).catch(err => {
                    console.log(err)
                    console.log("No such stock")
                });

            } else {
                for (let i=0; i<props.Stocks.length; i++) {
                    if (Ticker === props.Stocks[i].stockName) {
                        console.log("Sell Match");
                        
                        Axios.post("http://localhost:5000/stocks/sellStock",{
                            stockName: props.Stocks[i].stockName,
                            stockSymbol: props.Stocks[i].stockSymbol,
                            amount: Amount,
                            date: Transaction,
                            price: Price,
                            fees: Fees,
                            token: localStorage.getItem("token")
                        })
                        .then(() => {
                            console.log("Sell data added to database!")
                            props.setStockMarketData();

                        }).catch(err => {
                            console.log(err)
                            console.log("Database error for selling")
                        });
                            
    
                    } else {
                        console.log("Not found to sell");
                    }
                }
            }
            
            
        } else {
            console.log("User does not want to add stock")
        }

        if (DivTicker != '') {
            for (let i=0; i<props.Stocks.length; i++) {
                if (DivTicker === props.Stocks[i].stockName) {

                    Axios.post("http://localhost:5000/stocks//addDividend",{
                        stockName: props.Stocks[i].stockName,
                        date: DivTransaction,
                        total: DivAmount,
                        token: localStorage.getItem("token")
                    })
                    .then(() => {
                        console.log("Dividends added to database!")
                        props.setStockMarketData();

                    }).catch(err => {
                        console.log(err)
                        console.log("Database error for adding dividends")
                    });

                } else {
                    console.log("Not found to add dividend");
                }
            }
        } else {
            console.log("User does not want to add dividends")
        }
        
    }

    return (
        <div className="AddStockBox">
        { props.Show === true 
                ? 
                  <div className="AddStockPanel">
                    <div className="AddStocksForm">
                        <div className="SwitchBox">
                            
                            <div className="BuySellSwitch">
                                <p className="Title">Add Transaction</p>
                                <input type="radio" 
                                id="BuyBtn" 
                                name="TransactionBtn" 
                                value="Buy"
                                onChange={onBuyChange}
                                onClick={onBuyChange}
                                />
                                <label htmlFor="BuyBtn"><p className="BuySwitchTitle">Buy</p></label>

                                <input type="radio" 
                                id="SellBtn" 
                                name="TransactionBtn" 
                                value="Sell"
                                onChange={onSellChange}
                                onClick={onSellChange}  
                                />
                                <label htmlFor="SellBtn"><p className="BuySwitchTitle">Sell</p></label>
                            </div>
                        </div>
                        <datalist id="UserSellStocks">
                            {props.Stocks.map((item, index) => (
                                <option key={index} value={item.stockName}/>
                            ))}
                        </datalist> 
                        <input className="AddStockInput"
                        list="UserSellStocks"
                        name="StockName"
                        id="StockName"
                        placeholder="Ticker/name"
                        onChange={onTickerChange}
                        />
                        <input className="AddStockInput"
                        type="date"
                        name="Transaction Date"
                        id="TransactionDate"
                        onChange={onTransactionChange}
                        />
                        <input className="AddStockInput"
                        type="number"
                        name="Amount"
                        id="StockAmount"
                        placeholder="Amount"
                        min='0'
                        onChange={onAmountChange}
                        />
                        <input className="AddStockInput"
                        type="number"
                        name="StockTotalPrice"
                        id="StockTotalPrice"
                        placeholder="Total Price"
                        min='0'
                        onChange={onPriceChange}
                        />
                        <input className="AddStockInput"
                        type="number"
                        name="StockFees"
                        id="StockFees"
                        placeholder="Fees"
                        min='0'
                        onChange={onFeesChange}
                        />
                    </div>

                    <div className="AddStocksForm">
                        <p className="Title NoMargin">Add Dividends</p>
                        <datalist id="UserStocks">
                            {props.Stocks.map((item, index) => (
                                <option key={index} value={item.stockName}/>
                            ))}
                        </datalist>
                        <input className="AddStockInput" 
                            list="UserStocks"
                            name="DivStockName"
                            id="DivStockName"
                            placeholder="Ticker"
                            onChange={onDivTickerChange}
                        /> 
                        <input className="AddStockInput"
                            type="date"
                            name="Dividend Transaction Date"
                            id="DivTransactionDate"
                            placeholder="yyyy-mm-dd"
                            onChange={onDivTransactionChange}
                        />
                        <input className="AddStockInput"
                            type="number"
                            name="Total Dividends"
                            id="TotalDiv"
                            placeholder="Total Dividends"
                            min='0'
                            onChange={onDivAmountChange}
                        />
                        <input 
                        className="AddStockButton" 
                        type="submit" 
                        value="Submit"
                        onClick={onSubmitData} // When clicked sign in function will check with the server
                        />
                    </div>

                  </div>
                :
                    <div></div>
        }
        </div>
    )
}
