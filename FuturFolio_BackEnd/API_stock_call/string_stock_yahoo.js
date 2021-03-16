const express = require('express');
const router = require("express").Router();
const fetch = require('node-fetch');

router.post('/updateJSON/:symbol', async (req, res) => {
  var mergedJSON = [];
  console.log(req.body.stocks);
  let stocks = req.body.stocks;

  async function getJSON(StockName)
  {
    //API_call=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockName}&outputsize=full&apikey=${API_KEY}`;

    return fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=${StockName}&region=US`, {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-key": "7cc3ae701amshf93e4f7eed74bebp16d5aejsnbae90ef4635c",
    		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
    	}
    })
      .then(res => res.json())
      .then(text => {
            return text;
          });
  }

  res.send(await getJSON(req.params.symbol));
})

module.exports = router;
