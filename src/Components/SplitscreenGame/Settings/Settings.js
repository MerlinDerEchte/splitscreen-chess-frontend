import React, { useState } from 'react';
import './Settings.scss';

import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Colors from '../../../Model/GameLogic/Colors';


function Settings(props) {

     function preventInnerClick(e){
         e.stopPropagation();
     }

    return (
        <div id="settings-overlay" onClick={e =>  {
            if(props.Board?.turn){ 
            
            e.preventDefault();
            props.setShowSettingsOverlay(false);
            }
        }}>
            <div id="settings-main" onClick={preventInnerClick}>

                <h2><span>Settings</span></h2>

                {props.firstBoard === Colors.WHITE
                    ?
                    <div className={props.screenWidth > 1000 ? "settings-item settings-item-horizontal" : "settings-item settings-item-vertical"}>
                        <div className="white-container">White</div>
                        <div className="settings-item-icon" onClick={props.toggleFirstBoard}>
                            <SyncAltIcon />
                        </div>
                        <div className="black-container">Black</div>
                    </div>
                    :
                    <div className={props.screenWidth > 1000 ? "settings-item settings-item-horizontal" : "settings-item settings-item-vertical"}>
                        <div className="black-container">Black</div>
                        <div className="settings-item-icon" onClick={props.toggleFirstBoard}>
                            <SyncAltIcon />
                        </div>
                        <div className="white-container">White</div>
                    </div>
                }
                <div className={props.screenWidth > 1000 ? "settings-item settings-item-horizontal" : "settings-item settings-item-vertical"}>
                    <button onClick={props.initGame}>New game</button>
                    {props.Board?.turn 
                    ?
                    <button onClick={()=>props.setShowSettingsOverlay(false)}>Close settings</button>
                    :
                    ''
                    }
                    
                </div>
            </div>
        </div>
    )
}



export default Settings;