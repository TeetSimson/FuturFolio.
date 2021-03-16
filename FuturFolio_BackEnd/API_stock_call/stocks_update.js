const express = require('express');
const router = require("express").Router();
const fetch = require('node-fetch');
const bodyParser = require("body-parser");
/*
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
*/

var StockName;
var API_call;
const API_KEY="NNL94ZONNPS8XSPS";

router.post('/updateJSON', async (req, res) => {
  var mergedJSON = [];
  console.log(req.body.stocks);
  let stocks = req.body.stocks;

  async function getJSON(StockName)
  {
    API_call=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockName}&outputsize=full&apikey=${API_KEY}`;

    return fetch(API_call)
      .then(res => res.json())
      .then(text => {
            return text;
          });
  }





  async function update(stocks)
  {
    mergedJSON = [];
    // var JSONsList = stocks;
    // JSONsList = JSON.parse(JSONsList);
    for (var item of stocks)
    {

      StockName = item.stockName;
      //API_call=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockName}&outputsize=full&apikey=${API_KEY}`;

      try{
        var response = await getJSON(StockName);
        //jsonBlock = await response.text().json();
        /*
        fetch(API_call)
            .then(res => res.json())
            .then(text => {
                res.json(text);
              });
        */
        mergedJSON.push(response);
        console.log(mergedJSON);
      } catch (e){
        console.log('Ohh oh');
        console.error(e);
      }
    }
    //res.json(mergedJSON);
    return mergedJSON;
  }

  res.send(await update(stocks));
  //res.send(await getJSON("IBM"));
})

module.exports = router;
