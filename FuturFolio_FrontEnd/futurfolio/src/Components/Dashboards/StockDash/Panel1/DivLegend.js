import React from 'react';
import './DividendMeter.css';

export default function DivLegend(props) {
    const colors = ["#E17148", "#D99724", "#15C16A"];
    return (
        <div className="LegendsDivCollected">
            <div className="CircleLegendDivCollected" 
                style={{backgroundColor: colors[props.index] }}>
            </div>
            <p className="LegendSymbolDivCollected">{props.symbol}</p>
        </div>
    )
}
