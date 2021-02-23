import React from 'react';

export function DropdownItem(props) {
    return (
        <a href="#" className="menu-item" onClick={() => props.gotoMenu}>
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}

            <span className="icon-right">{props.rightIcon}</span>

        </a>
    );
}
