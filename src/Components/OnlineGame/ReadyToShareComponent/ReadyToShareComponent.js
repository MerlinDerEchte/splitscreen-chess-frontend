import React from 'react';

import './ReadyToShareComponent.scss';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { getThemeProps } from '../../../../node_modules/@material-ui/styles';
function ReadyToShareComponent(props) {
    const URL = window.location.href;


    function copyToClipboard(){
        navigator.clipboard.writeText(window.location.href);

    }

    return (
        <div className="ready-to-share-body">
            <div className="ready-to-share-description">Your game has been created, share the link with the person you want to play with</div>
            <button className="ready-to-share-container" onClick={copyToClipboard}>
            {props.screenWidth > 1000
            ?
            <>
            <span>{URL}</span> 
            <span><FileCopyIcon /></span>
            </>         
            :
            <>
            <span>Click to copy the URL</span>
            <span><FileCopyIcon /></span>
            </>
            }
            </button>

        </div>
    )
}

export default ReadyToShareComponent;