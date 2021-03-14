const express = require('express');
const router = require("express").Router();
const fetch = require('node-fetch');

const API_KEY="NNL94ZONNPS8XSPS";
const stockName = "IBM";
let API_call=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=full&apikey=${API_KEY}`;

fetch(API_call)
    .then(res => res.json())
    .then(text => {
      router.post('/allData', (req, res) => {
        res.json(text);
      });
    })


module.exports = router;
