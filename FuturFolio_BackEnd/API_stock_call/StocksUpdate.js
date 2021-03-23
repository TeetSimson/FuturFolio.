const router = require("express").Router();
const fetch = require('node-fetch');


router.post('/updateJSON', async (req, res) => {
  var arrayAPI = [];
  let stocks = req.body.stocks;
  let StocksWithData = [];


  async function update(Stocks){
    let stocks = Stocks;

    for (var item of Stocks) {
      arrayAPI.push(item.stockSymbol);
    }

    return fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${arrayAPI.toString()}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "7cc3ae701amshf93e4f7eed74bebp16d5aejsnbae90ef4635c",
        "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com"
      }
    })
    .then(res => res.json())
    .then(text => {
      TextAPI = text;
      return fetch("https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/chart/AAPL?interval=5m&range=5y&comparisons=MSFT%2CTSLA&events=div%2Csplit", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "7cc3ae701amshf93e4f7eed74bebp16d5aejsnbae90ef4635c",
          "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com"
        }
      })
      .then(res => res.json())
      .then(data => {

        let bigChart = data;
        let i = 0;
        let j = 1;
        for (var item of stocks) {
          StocksWithData.push({
            stockName: item.stockName,
            stockSymbol: item.stockSymbol,
            marketData: TextAPI[i],
            transactions: item.transactions,
            divTransactions: item.divTransactions,
            chart: [0],//data.chart[0].comparisons[j],
            chartTime: [0] //data.chart[0].timestamp
          });
          i++;
        }
        


        return [StocksWithData, bigChart]; 
      })
      .catch(e => {
        
        return console.log(e);
      });
    });    
  }
  
  res.send(await update(stocks));
});

module.exports = router;
