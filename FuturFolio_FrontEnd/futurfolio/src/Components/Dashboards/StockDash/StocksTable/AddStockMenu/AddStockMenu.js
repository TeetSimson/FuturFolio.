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
        console.log("Change");
        let date = document.getElementById("TransactionDate").value;
        console.log(date);
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
                    console.log(data.data.ResultSet.Result[0].name);
                    console.log(data.data.ResultSet.Result[0].symbol);

                    console.log(Transaction);
                    console.log(Price);
                    // ADDING transaction to database NEEDS WORKING
                    Axios.post("http://localhost:5000/stocks/newStock",{
                        stockName: data.data.ResultSet.Result[0].name,
                        stockSymbol: data.data.ResultSet.Result[0].symbol,
                        amount: Amount,
                        date: Transaction,
                        price: Price,
                        fees: Fees,
                        token: localStorage.getItem("token"),
                    })
                    .then(() => {
                        console.log("Data added to database!")

                    }).catch(err => {
                        console.log(err)
                        console.log("Database error")
                    });

                }).catch(err => {
                    console.log(err)
                    console.log("No such stock")
                });

            } else {
                for (let i=0; i<props.Stocks.length; i++) {
                    if (Ticker === props.Stocks[i].stockName) {
                        console.log("Match");
    
                        // AXIOS ADD DIVIDEND TRANSACTION POST HERE
    
                    } else {
                        console.log("Not found");
                    }
                }
            }
            
            
        } else {
            console.log("User does not want to add stock")
        }

        if (DivTicker != '') {
            for (let i=0; i<props.Stocks.length; i++) {
                if (DivTicker === props.Stocks[i].stockName) {
                    console.log("Match");

                    // AXIOS ADD DIVIDEND TRANSACTION POST HERE

                } else {
                    console.log("Not found");
                }
            }
        } else {
            console.log("User does not want to add dividends")
        }

        setAmount(0);
        setBuy(0);
        setFees(0);
        setTicker('');
        setTransaction('');
        setDivTicker('');
        setDivTransaction('')
        setDivAmount(0);
        
    }

    return (
        <div className="AddStockBox">
        { props.Show === true 
                ? 
                  <div className="AddStockPanel">
                    <div className="AddStocksForm">
                        <div className="SwitchBox">
                            
                            <div class="BuySellSwitch">
                                <p className="Title">Add Transaction</p>
                                <input type="radio" 
                                id="BuyBtn" 
                                name="TransactionBtn" 
                                value="Buy"
                                onChange={onBuyChange} 
                                checked
                                />
                                <label for="BuyBtn"><p className="BuySwitchTitle">Buy</p></label>

                                <input type="radio" 
                                id="SellBtn" 
                                name="TransactionBtn" 
                                value="Sell"
                                onChange={onSellChange} 
                                />
                                <label for="SellBtn"><p className="BuySwitchTitle">Sell</p></label>
                            </div>
                        </div>
                        <datalist id="UserSellStocks">
                            {props.Stocks.map(item => (
                                <option value={item.stockName}/>
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
                        onChange={onAmountChange}
                        />
                        <input className="AddStockInput"
                        type="number"
                        name="StockTotalPrice"
                        id="StockTotalPrice"
                        placeholder="Total Price"
                        onChange={onPriceChange}
                        />
                        <input className="AddStockInput"
                        type="number"
                        name="StockFees"
                        id="StockFees"
                        placeholder="Fees"
                        onChange={onFeesChange}
                        />
                    </div>

                    <div className="AddStocksForm">
                        <p className="Title NoMargin">Add Dividends</p>
                        <datalist id="UserStocks">
                            {props.Stocks.map(item => (
                                <option value={item.stockName}/>
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
                        onChange={onDivTransactionChange}
                        />
                        <input className="AddStockInput"
                        type="number"
                        name="Total Dividends"
                        id="TotalDiv"
                        placeholder="Total Dividends"
                        onChange={onDivAmountChange}
                        />
                        <input 
                        onClick={onSubmitData} // When clicked sign in function will check with the server
                        className="AddStockButton" 
                        type="submit" 
                        value="Submit"
                        />
                    </div>

                  </div>
                :
                    <div></div>
        }
        </div>
    )
}