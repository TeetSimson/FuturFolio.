import React from 'react';
import "../../App.css";
import "./Sidebar.css";
import Logo from './Futurfolio_logo.png';

function Sidebar() {
    return (
        <nav className="Sidebar">
            <img id="Logo" src={Logo} alt='Logo'/>

            {/* Sample icon, will be replaced by function later*/}
            <div className="Dashboards">
                <img className="DashboardLogo"
                src="https://img.icons8.com/fluent-systems-regular/128/000000/real-estate.png" 
                alt="Real Estate Dashboard"/>
            </div>

            <div className="VersionBox">
                <p className="Version">v0.1</p>
            </div>
        </nav>
    )
}

export default Sidebar
