import React from 'react';
import './NavigationMenu.scss'
import { Router, Route, Link, useHistory } from 'react-router-dom';
import URL from '../../../URL';
function NavigationMenu(props) {

    const navigationMenuClass = props.showNavigationMenu === 0
        ?
        "navigation-menu-body navigation-menu-body-default"
        :
        props.showNavigationMenu % 2 === 0
            ?
            "navigation-menu-body navigation-menu-body-inactive"
            :
            "navigation-menu-body navigation-menu-body-active"

    return (

        <div className={navigationMenuClass} onClick={e => e.stopPropagation()}>
            <div className="navigation-menu-list">
                <ul>
                    <li >
                        <Link onClick = {props.toggleShowNavigationMenu} to={URL + "/"}>
                        <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick= {props.toggleShowNavigationMenu} to={URL + "/Splitscreen"}>
                        <span>Splitscreen</span>
                        </Link>
                    </li>
                    <li>
                        <a onClick={e => {props.createNewGame();props.toggleShowNavigationMenu(e)} }>
                        <span>New online game</span></a>
                    </li>
                </ul>
            </div>
        </div>)

}

export default NavigationMenu;