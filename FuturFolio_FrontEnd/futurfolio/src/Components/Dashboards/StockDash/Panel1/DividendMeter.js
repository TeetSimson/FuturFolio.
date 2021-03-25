import React from 'react'
import ReactSpeedometer from "react-d3-speedometer";
import './DividendMeter.css';
import DivLegend from './DivLegend';

export default function DividendMeter(props) {
    let dividendAmount = 0;
    let totalDivAmount = 0;
    let totalStocks = 0;
    let estimateDiv = 0;
    let totalEstimateDiv = 0;
    let divList = [0];
    let legendList = [];

    // Get how many dividends has user recived for 1 stock
    function divAmount(stock){
        let divTotal = stock.divTransactions.reduce(function(prev, cur) {
          return prev + cur.total;
        }, 0);
    
        return (divTotal);
    }

    // Get total amount of divs user has got and estimate
    let i = 0;
    for (var item of props.stocks) {
        dividendAmount = divAmount(item);
        if (dividendAmount != 0) divList.push(divList[i] + dividendAmount);
        i++

        legendList.push(item.stockSymbol);
        totalDivAmount += dividendAmount;
        totalStocks = props.stockAmount(item);
        estimateDiv = totalStocks*parseFloat(item.marketData.trailingAnnualDividendRate);
        totalEstimateDiv += estimateDiv;

    }

    divList.push(totalEstimateDiv);
    console.log(legendList);
    
    return (
        <div className="DivMeterLoadingBox">
            <div className="DividendMeterBox">
                <p className="Panel1Title">Dividends collected</p>
                <ReactSpeedometer 
                    customSegmentStops={divList}
                    segmentColors={["#E17148", "#D99724", "#15C16A"]}
                    value={totalDivAmount}
                    minValue={0}
                    maxValue={totalEstimateDiv}
                    fluidWidth={true}
                    needleTransitionDuration={2000}
                    needleColor="#303030"
                />
                <div className="DivCollectedLegend">
                    {legendList.map((symbol, index) => (
                        <DivLegend key={index} index={index} symbol={symbol} />                 
                    ))
                    }
                </div>
            </div>
        </div>
    )
}
