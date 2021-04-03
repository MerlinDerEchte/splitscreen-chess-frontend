import React from 'react';
import './NavigationButton.scss';

function NavigationButton(props){

    const navigationButtonClass = props.showNavigationMenu === 0 
    ?
    "navigation-button navigation-button-default"
    :
        props.showNavigationMenu % 2 === 0
        ?
        "navigation-button navigation-button-inactive"
        :
        "navigation-button navigation-button-active"

    return(
        <button 
            className={navigationButtonClass}
            onClick={e =>props.toggleShowNavigationMenu(e)}
        >

        <div id="top-bar"></div>
        <div id="mid-bar"></div>
        <div id="bottom-bar"></div>
            
        </button>
    )
}

export default NavigationButton;