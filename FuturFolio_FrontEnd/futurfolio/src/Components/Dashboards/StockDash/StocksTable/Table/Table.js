import React from "react";
import { render } from "react-dom";
import { slideDown, slideUp } from "./Animate";
import { ResponsiveLine } from '@nivo/line';
import "./Table.css";
import Header from  './Header';

class UserTableRow extends React.Component {
  state = { expanded: false };

  toggleExpander = (e) => {
    if (e.target.type === "checkbox") return;

    if (!this.state.expanded) {
      this.setState({ expanded: true }, () => {
        if (this.refs.expanderBody) {
          slideDown(this.refs.expanderBody);
        }
      });
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => {
          this.setState({ expanded: false });
        }
      });
    }
  };

  stockAmount = () => {
    let amountTotal = this.props.stock.transactions.reduce(function(prev, cur) {
      return prev + cur.amount;
    }, 0);

    return (amountTotal);
  }

  investmentAmount = () => {
    let totalTotal = this.props.stock.transactions.reduce(function(prev, cur) {
      return prev + cur.price;
    }, 0);

    let feesTotal = this.props.stock.transactions.reduce(function(prev, cur) {
      return prev + cur.fees;
    }, 0);

    return (totalTotal + feesTotal);
  }

  dividendAmount = () => {
    let divTotal = this.props.stock.divTransactions.reduce(function(prev, cur) {
      return prev + cur.total;
    }, 0);

    return (divTotal);
  }

  

  MyResponsiveLine = (data) => (
    <ResponsiveLine
        data={data}
        height={40}
        width={160}
        margin={{ top: 15, right: 1, bottom: 5, left: 1 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        curve="linear"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        colors={{datum: 'color'}}
        lineWidth={2}
        enablePoints={false}
        isInteractive={false}
        enableCrosshair={false}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        motionConfig="molasses"
    />
  )


  render() {
    const { stock, index } = this.props;
    let chartData = [];
    let stockSmallChart = [];
    let timelength = parseInt((stock.chart.time.length)/5); // Get 1y graph
    for (let i=timelength*4; i<stock.chart.time.length; i++) {
      chartData.push({
        x: stock.chart.time[i],
        y: stock.chart.data.close[i]
      });
    }

    stockSmallChart.push({
      id: stock.stockSymbol,
      color: '#3f80ED',
      data: chartData
    });

    let currentPrice = 0;
    let marketChange = 0;
    let marketChangePerc = 0;
    let lowestPrice = 0;
    let dividend = '-'
    let dividendYield = '-'
    let dividendData = '';
    let currency = '€';
    let divDate = 'NaN';
    let stockAmount = 0; 
    let DCR = 0;
    let PE = 0;
    let PB = 0;
    let ROE = 0;
    let stockAmountValue = 0;
    let investmentValue = 0;
    let currentInvestValue = 0;
    let dividendsTotal = 0;

    if (stock.marketData != null) {
      currentPrice = stock.marketData.regularMarketPrice.toFixed(2);
      marketChange = stock.marketData.regularMarketChange.toFixed(2);
      marketChangePerc = stock.marketData.regularMarketChangePercent.toFixed(2)
      lowestPrice = stock.marketData.fiftyTwoWeekLow.toFixed(2);
      dividend = parseFloat(stock.marketData.trailingAnnualDividendRate);
      dividendYield = parseFloat(stock.marketData.trailingAnnualDividendYield*100);
      currency = "£";
      stockAmount = stock.marketData.marketCap/stock.marketData.regularMarketPrice;
      DCR = stock.marketData.epsTrailingTwelveMonths*stockAmount/(dividend*stockAmount);
      if(stock.marketData.trailingPE != null) PE = stock.marketData.trailingPE.toFixed(2);
      PB = stock.marketData.priceToBook.toFixed(2);
      ROE = stock.marketData.epsTrailingTwelveMonths*stockAmount/(stock.marketData.bookValue*stockAmount)*100;    
      if (stock.marketData.currency === 'USD') currency = '$';
      else if (stock.marketData.currency === 'EUR') currency = '€';
      
      stockAmountValue = this.stockAmount();
      investmentValue = this.investmentAmount();
      currentInvestValue = stockAmountValue*stock.marketData.regularMarketPrice;
      
      if (stock.marketData.dividendDate != null) divDate = stock.marketData.dividendDate; 
      dividendsTotal = '-';

      if (dividend.toString() === 'NaN') {
        dividendData = '-';
      } else {
        dividendData = currency + dividend.toFixed(2) + "/" + dividendYield.toFixed(2) + "%";
        dividendsTotal = this.dividendAmount();
        dividendsTotal = dividendsTotal + "/" + (dividend*stockAmountValue).toFixed(2);
      }
    } else {
      console.log("didnt load");
      dividendsTotal = this.dividendAmount();
    }

    return [
        <tr class="RowShadow" key="main" onClick={this.toggleExpander}>
          <td className="TableTab">
            <input className="uk-checkbox" type="checkbox" value={stock.stockName}/>
          </td>
          <td className="TableTab uk-text-nowrap">{stock.stockSymbol}</td>
          <td className="TableTab">
            <p>{stock.stockName}</p>
          </td>
          <td className="TableTab">
            <p>{currency}{currentPrice}</p>
          </td>
          <td className="TableTab">
            <p>{marketChange}/{marketChangePerc}%</p>
          </td>
          <td className="TableTab">
            <p>{currency}{lowestPrice}</p>
          </td>
          <td className="TableTab">
            {this.MyResponsiveLine(stockSmallChart)}
          </td>
          <td className="TableTab">
            <p>{PE}</p>
          </td>
          <td className="TableTab">
            <p>{PB}</p>
          </td>
          <td className="TableTab">
            <p>{ROE.toFixed(2)}%</p>
          </td>
          <td className="TableTab">
            <p>{dividendData}</p>
          </td>
          <td className="TableTab">
            {divDate}
          </td>
          <td className="TableTab">
            <p>{DCR.toFixed(3)}</p>
          </td>
          <td className="TableTab">
            <p>{stockAmountValue}</p>
          </td>
          <td className="TableTab">
            <p>{currency}{(investmentValue/stockAmountValue).toFixed(2)}</p>
          </td>
          <td className="TableTab">
            <p>{currency}{investmentValue}</p>
          </td>
          <td className="TableTab">
            <p>{currency}{(currentInvestValue).toFixed(2)}</p>
          </td>
          <td className="TableTab">
            <p>{(currentInvestValue-investmentValue).toFixed(2)}</p>
          </td>
          <td className="TableTab">
            <p>{(((currentInvestValue-investmentValue)/investmentValue)*100).toFixed(2)}</p>
          </td>
          <td className="TableTab">
            <p>{dividendsTotal}</p>
          </td>
        </tr>,
        this.state.expanded && (
          <tr className="expandable" key="tr-expander">
            <td className="uk-background-muted Expanded" colSpan={17} >
              <div ref="expanderBody" className="inner uk-grid">
                <div className="uk-width-1-4 uk-text-center">
                  <img
                    className="uk-preserve-width uk-border-circle"
                    src=""
                    alt="avatar"
                  />
                </div>
                <div className="uk-width-3-4">
                  <h3>John Schumacher</h3>
                  <p>
                    Address:
                    <br />
                    <i>
                      Location: UK
                      <br />
                       Location: Manchester
                      <br />
                      239MRL
                    </i>
                  </p>
                  <p>
                    E-mail: john@gmail.com
                    <br />
                    Phone: +44 542132321
                  </p>
                  <p>Date of birth: 21.10.1985</p>
                </div>
              </div>
            </td>
          </tr>
        )
    ];
  }
}

export default class Table extends React.Component {

  render() {
    const { stocks } = this.props;
    const isLoading = stocks === null;
    return (
      <main className="Table">
        <div className="table-container">
            <div id="div2" className="uk-overflow-auto">
              <table className="uk-table uk-table-hover uk-table-middle Row">
                <tbody id="GetRows" className="Row">
                  <Header />
                  {isLoading ? (
                    <tr>
                      <td colSpan={17}>
                        <em>Loading...</em>
                      </td>
                    </tr>
                  ) : (
                    stocks.map((stock, index) => (
                        <UserTableRow key={index} index={index+1} stock={stock} />                 
                    ))
                  )}
                </tbody>
              </table>
            
          </div>
        </div>
      </main>
    );
  }
}

