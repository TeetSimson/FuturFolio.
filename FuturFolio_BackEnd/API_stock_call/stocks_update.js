const express = require('express');
const router = require("express").Router();
const fetch = require('node-fetch');
const bodyParser = require("body-parser");
/*
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
*/

var stockName;
var API_call;
const API_KEY="NNL94ZONNPS8XSPS";

router.post('/updateJSON', async (req, res) => {
  var mergedJSON = [];


  async function update(mergedJSON)
  {
    var JSONsList = req.body.data.stocks;
    JSONsList = JSON.parse(JSONsList);


    for (var item of JSONsList)
    {
      stockName = item['stockName'];
      API_call=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=full&apikey=${API_KEY}`;

      try{
        var response = await fetch(API_call);
        jsonBlock = await response.text().json();
        /*
        fetch(API_call)
            .then(res => res.json())
            .then(text => {
                res.json(text);
              });
        */
        mergedJSON.append(jsonBlock);
      } catch (e){
        console.log('Ohh oh');
        console.error(e);
      }
    }
    //res.json(mergedJSON);
  }

  res.json(update(mergedJSON));
})

module.exports = router;
