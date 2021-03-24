import React from "react";
import { render } from "react-dom";
import { slideDown, slideUp } from "./Animate";
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


  render() {
    const { stock, index } = this.props;
    let dividend = parseFloat(stock.marketData.trailingAnnualDividendRate);
    let dividendYield = parseFloat(stock.marketData.trailingAnnualDividendYield*100);
    let dividendData = '';
    let currency = "£";
    let divDate = 'NaN';
    let stockAmount = stock.marketData.marketCap/stock.marketData.regularMarketPrice;
    let DCR = stock.marketData.epsTrailingTwelveMonths*stockAmount/(dividend*stockAmount);
    let ROE = stock.marketData.epsTrailingTwelveMonths*stockAmount/(stock.marketData.bookValue*stockAmount)*100;    
    if (stock.marketData.currency === 'USD') currency = '$';
    else if (stock.marketData.currency === 'EUR') currency = '€';
    
    let stockAmountValue = this.stockAmount();
    let investmentValue = this.investmentAmount();
    let currentInvestValue = stockAmountValue*stock.marketData.regularMarketPrice;
    
    if (stock.marketData.dividendDate != null) divDate = stock.marketData.dividendDate; 
    let dividendsTotal = '-';

    if (dividend.toString() === 'NaN') {
      dividendData = '-';
    } else {
      dividendData = currency + dividend.toFixed(2) + "/" + dividendYield.toFixed(2) + "%";
      dividendsTotal = this.dividendAmount();
      dividendsTotal = dividendsTotal + "/" + (dividend*stockAmountValue).toFixed(2)
    }

    return [
        <tr key="main" onClick={this.toggleExpander}>
          <td>
            <input className="uk-checkbox" type="checkbox" value={stock.stockName}/>
          </td>
          <td className="uk-text-nowrap">{stock.stockSymbol}</td>
          <td>
            <p>{stock.stockName}</p>
          </td>
          <td>
            <p>{currency}{stock.marketData.bid}</p>
          </td>
          <td>
            <p>{stock.marketData.regularMarketChange.toFixed(2)}/{stock.marketData.regularMarketChangePercent.toFixed(2)}%</p>
          </td>
          <td>
            <p>{currency}{stock.marketData.fiftyTwoWeekLow}</p>
          </td>
          <td>
            <p>___---_|=</p>
          </td>
          <td>
            <p>{stock.marketData.trailingPE.toFixed(2)}</p>
          </td>
          <td>
            <p>{stock.marketData.priceToBook.toFixed(2)}</p>
          </td>
          <td>
            <p>{ROE.toFixed(2)}%</p>
          </td>
          <td>
            <p>{dividendData}</p>
          </td>
          <td>
            {divDate}
          </td>
          <td>
            <p>{DCR.toFixed(3)}</p>
          </td>
          <td>
            <p>{stockAmountValue}</p>
          </td>
          <td>
            <p>{currency}{(investmentValue/stockAmountValue).toFixed(2)}</p>
          </td>
          <td>
            <p>{currency}{investmentValue}</p>
          </td>
          <td>
            <p>{currency}{(currentInvestValue).toFixed(2)}</p>
          </td>
          <td>
            <p>{(currentInvestValue-investmentValue).toFixed(2)}</p>
          </td>
          <td>
            <p>{(((currentInvestValue-investmentValue)/investmentValue)*100).toFixed(2)}</p>
          </td>
          <td>
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

