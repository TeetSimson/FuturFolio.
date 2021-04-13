import React from 'react'
import './NetWorthTab.css';

export default function NetWorthTab(props) {
    return (
        <div className="NetWorthTab">
            <h1 className="NetWorthNumber">{props.Currency}{props.NetWorth}</h1>
            <div className="RightSide">
                <label className="form-switch">
                    <p className="LeftLabel">Include Tax -20%</p>
                    <input type="checkbox"
                        onChange={props.includeTax}
                    />
                    <i></i>
                </label>
            </div>
            
        </div>
    )
}
