import React, { Component } from 'react'
import './PlusButton.css';
import Plus from './Icons/+.png';
import PlusX from './Icons/X.png';

export class PlusButton extends Component {
    
    render() {
        return (
            <div>
                { this.props.Show === true 
                    ?   
                    <div>
                        <button className="Plus"
                        onClick={this.props.PlusClick}>
                        <img className="IconX Icons"
                        src={PlusX} alt="X button"/>
                        </button>
                        
                        <div className="Checkboxes">
                            <h3>Choose Dashboards</h3>
                            <input 
                                id="StocksCheck"
                                type="checkbox" 
                                onChange={this.props.StocksChange}
                                label="Stocks" 
                                defaultChecked={this.props.Stocks}
                            /> 
                            <label htmlFor="StocksCheck">Stocks</label><br></br>
                            <input 
                                id="LoansCheck"
                                type="checkbox" 
                                onChange={this.props.LoansChange}
                                label="Loans" 
                                defaultChecked={this.props.Loans}
                            /> 
                            <label htmlFor="LoansCheck">Loans</label><br></br>
                            <input 
                                id="RECheck"
                                type="checkbox" 
                                onChange={this.props.RealEstateChange}
                                label="Real Estate" 
                                defaultChecked={this.props.RealEstate}
                            /> 
                            <label htmlFor="RECheck">Real Estate</label><br></br>
                        </div>
                    </div>
                    : 
                    <div>
                      <button className="Plus"
                        onClick={this.props.PlusClick}>
                        <img className="Icon Icons"
                        src={Plus} alt="Plus button"/>
                      </button>
                    </div>
                }
            </div>
        )
    }
}

export default PlusButton
