import React from 'react';
import './UndoMoveComponent.scss';

function UndoMoveComponent(props) {



    return (
        <div className="undo-move-overlay">
            <div className="undo-move-container">
                <div> Player X wants to undo the move </div>
                <div className="buttons-container">
                    <button onClick={props.acceptUndoMove}>accept</button>
                    <button >reject </button>
                </div>
            </div>
        </div>)
}

export default UndoMoveComponent;