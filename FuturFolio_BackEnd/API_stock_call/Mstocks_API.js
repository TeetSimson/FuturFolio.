const express = require('express');
const router = require("express").Router();
const fetch = require('node-fetch');


var stockName;
var data;
var API_call;
const API_KEY="NNL94ZONNPS8XSPS";

router.post('/allData/:symbol', (req, res) => {

  stockName = req.params.symbol;
  API_call=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=full&apikey=${API_KEY}`;


  fetch(API_call)
      .then(res =>
        //console.log(res);
        res.json()
      )
      .then(text =>{
        //console.log("==============\n");
        //console.log(res);
          res.json(text);
          data = text;
          console.log(data);
        });

  //res.json(text);
/*
  fetch(API_call)
        .then(res => res.json())
        .then(text => {
            res.json(text);
          });
*/
})


module.exports = router;
