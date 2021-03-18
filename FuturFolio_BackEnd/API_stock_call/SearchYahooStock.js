const router = require("express").Router();
const fetch = require('node-fetch');

router.post('/SearchYahoo', async (req, res) => {
  let stocks = req.body.stocks;

  async function getJSON(StockName)
  {

    return fetch(`https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/autocomplete?query=${StockName}&lang=en`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "7cc3ae701amshf93e4f7eed74bebp16d5aejsnbae90ef4635c",
        "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com"
      }
    })
      .then(res => res.json())
      .then(data => {
            return data;
          });
  }

  res.send(await getJSON(stocks));
})

module.exports = router;
