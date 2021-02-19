import React, { Component } from 'react'
import Logo from '../../Sidebar/Futurfolio_logo.png';

export default class StockDash extends Component {
    render() {
        return (
            <div>
                <img id="Logo" src={Logo} alt='Logo'/> {/*Temporary */}
            </div>
        )
    }
}
