import React from 'react'
import './NetWorthTab.css';

export default function NetWorthTab(props) {
    return (
        <div className="NetWorthTab">
            <h1 className="NetWorthNumber">{props.Currency}{props.NetWorth}</h1>
        </div>
    )
}
