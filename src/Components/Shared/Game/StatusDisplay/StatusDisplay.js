import React from 'react';
import Colors from '../../../../Model/GameLogic/Colors';
import './StatusDisplay.scss';
import RestoreIcon from '@material-ui/icons/Restore';
import SettingsIcon from '@material-ui/icons/Settings';

function StatusDisplay(props) {



    return (
        <div className="status-container">
        {props.Board.turn  ? 
        <>
            <div className="vertical-status-item">
                <span>Turn:</span>
                <span>
                    {props.Board.turn === Colors.WHITE
                            ?
                            'White'
                            :
                            'Black'
                        }
                </span>
            </div>
            <div className="vertical-status-item">
                <span>Round: </span>
                <span>
                    {props.Board.round ? props.Board.round : 0}
                </span>
            </div>
            <div className="horizontal-status-item">

                {!props.Board.gameOver
                    ?
                    <span className="icon" title="undo move">
                        <RestoreIcon style={{ 'height': '40px', 'width': '40px' }} onClick={props.undoMove}>

                        </RestoreIcon>
                    </span>
                    :
                    ''
                }

                <span>
                    {props.setShowSettingsOverlay ?
                        <SettingsIcon title="Settings" style={{ 'height': '40px', 'width': '40px' }} onClick={e => props.setShowSettingsOverlay(true)}>

                        </SettingsIcon>
                        :
                        ''
                    }
                </span>
            </div>
            </>
            : 
            <div className="vertical-status-item"><span>Waiting for opponent</span></div>

        }
        </div>
    )
}



export default StatusDisplay;