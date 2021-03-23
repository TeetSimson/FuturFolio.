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


  render() {
    const { stock, index } = this.props;
    let dividend = parseFloat(stock.marketData.trailingAnnualDividendYield);
    let dividendYield = parseFloat(stock.marketData.trailingAnnualDividendYield);
    let currency = "£"
    if (stock.marketData.currency === 'USD') currency = '$';
    else if (stock.marketData.currency === 'EUR') currency = '€';
    
    console.log(stock.marketData);
    
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
            <p>{stock.marketData.bid}</p>
          </td>
          <td>
            <p>{currency}{stock.marketData.regularMarketChange}/{stock.marketData.regularMarketChangePercent.toFixed(2)}%</p>
          </td>
          <td>
            <p>{currency}{stock.marketData.fiftyTwoWeekLow}</p>
          </td>
          <td>
            <p>___---_|=</p>
          </td>
          <td>
            <p>{currency}{dividend.toFixed(2)}/{dividendYield.toFixed(2)}%</p>
          </td>
          <td>
            {stock.marketData.dividendDate}
          </td>
          <td>
            <p>1.02</p>
          </td>
          <td>
            <p>
              {stock.transactions[0].amount}
            </p>
          </td>
          <td>
            <p>{stock.price}</p>
          </td>
          <td>
            <p>£161.80</p>
          </td>
          <td>
            <p>£181.80</p>
          </td>
          <td>
            <p>+£19.32</p>
          </td>
          <td>
            <p>+4.23%</p>
          </td>
          <td>
            <p>{stock.dividends}</p>
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

