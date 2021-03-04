import React from "react";
import { render } from "react-dom";
import { slideDown, slideUp } from "./Animate";
import "./Table.css";
import Header from  './Header';

function formatDate(str) {
  return str.substr(0, 10);
}

function capitalize(str) {
  return str
    .split(" ")
    .map((s) => {
      return s.charAt(0).toUpperCase() + s.substr(1);
    })
    .join(" ");
}

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
    const { user } = this.props;
    return [
        <tr key="main" onClick={this.toggleExpander}>
          <td>
            <input className="uk-checkbox" type="checkbox" />
          </td>
          <td className="uk-text-nowrap">{this.props.index}</td>
          <td>
            <p>Merko Ehitus</p>
          </td>
          <td>
            <p>£12.809</p>
          </td>
          <td>
            <p>+£12.80/2.34%</p>
          </td>
          <td>
            <p>£9.63</p>
          </td>
          <td>
            <p>___---_|=</p>
          </td>
          <td>
            <p>£0.83/8.08%</p>
          </td>
          <td>
            {formatDate(user.registered)}
          </td>
          <td>
            <p>1.02</p>
          </td>
          <td>
            <p>231</p>
          </td>
          <td>
            <p>£9.230</p>
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
            <p>£9.21/10.21</p>
          </td>
        </tr>,
        this.state.expanded && (
          <tr className="expandable" key="tr-expander">
            <td className="uk-background-muted Expanded" colSpan={17} >
              <div ref="expanderBody" className="inner uk-grid">
                <div className="uk-width-1-4 uk-text-center">
                  <img
                    className="uk-preserve-width uk-border-circle"
                    src={user.picture.large}
                    alt="avatar"
                  />
                </div>
                <div className="uk-width-3-4">
                  <h3>{capitalize(user.name.first + " " + user.name.last)}</h3>
                  <p>
                    Address:
                    <br />
                    <i>
                      {capitalize(user.location.street)}
                      <br />
                      {user.location.postcode} {capitalize(user.location.city)}
                      <br />
                      {user.nat}
                    </i>
                  </p>
                  <p>
                    E-mail: {user.email}
                    <br />
                    Phone: {user.phone}
                  </p>
                  <p>Date of birth: {formatDate(user.dob)}</p>
                </div>
              </div>
            </td>
          </tr>
        )
    ];
  }
}

export default class Table extends React.Component {
  state = { 
    users: null,
    ticker: "MRK1T"
  };

  componentDidMount() {
    fetch("https://randomuser.me/api/1.1/?results=15")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data.results });
      });
  }

  render() {
    const { users } = this.state;
    const isLoading = users === null;
    return (
      <main className="Table">
        <div className="table-container">
            <div id="div2" className="uk-overflow-auto">
              <table className="uk-table uk-table-hover uk-table-middle Row">
                <tbody className="Row">
                  <Header />
                  {isLoading ? (
                    <tr>
                      <td colSpan={17}>
                        <em>Loading...</em>
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                        <UserTableRow key={index} index={this.state.ticker} user={user} />                 
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

