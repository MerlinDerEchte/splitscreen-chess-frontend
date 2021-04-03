import React from 'react';
import './HomeComponent.scss';
import { useHistory } from 'react-router-dom';

function HomeComponent(props) {

    const history = useHistory();
    function handleSplitscrenNavigation(e) {
        const animatedKnight = document.getElementById("animated-knight");
        animatedKnight.classList.remove("animated-knight-init", "animated-knight-online");
        animatedKnight.classList.add("animated-knight-split");


        setTimeout(() => {

            history.push("/splitscreen")
        }, 1000)

    }

    function handleOnlineGameNavigation(e) {
        const animatedKnight = document.getElementById("animated-knight");
        animatedKnight.classList.remove("animated-knight-init", "animated-knight-split");
        animatedKnight.classList.add("animated-knight-online");

        setTimeout(() => {
            props.createNewGame();
        }, 1500)

    }


    return (
        <div className="home-component-body">
            <div className="image-container">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="3 3 40 40">
                    <defs>
                        <linearGradient id="splitGradient" gradientTransform="rotate(15)" >
                            <stop offset="0%" stop-color="#52658f" />
                            <stop offset="65%" stop-color="#52658f">
                                <animate attributeName="stop-color" values="#e8e8e8; #52658f" dur="2s" begin="0s" />
                                <animate attributeName="offset" values="-1; 0.65" dur="2s" begin="0s" />
                            </stop>
                            <stop offset="65%" stop-color="#f7f5e6" >
                                <animate attributeName="stop-color" values="#e8e8e8; #f7f5e6" dur="2s" begin="0s" />
                                <animate attributeName="offset" values="2; 0.65" dur="2s" begin="0s" />
                            </stop>
                            <stop offset="100%" stop-color="#f7f5e6" />
                        </linearGradient>
                        <linearGradient id="onlineGradient"  >

                            <stop offset="0%" stop-color="#52658f">
                                <animate attributeName="stop-color" values="#f7f5e6; #52658f" dur="1.5s" begin="0.5s" />
                                
                            </stop>
                            
                            <stop offset="100%" stop-color="#52658f">
                                
                                
                            </stop>

                        </linearGradient>

                    </defs>
                    <g>
                        <path class="animated-knight-init" id="animated-knight"
                            d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 24.38,18 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
                        />
                    </g>
                </svg>

            </div>
            <div className="nav-container">
                <button
                    id="online-game-button"
                    onClick={handleOnlineGameNavigation}>
                    Online game
                </button>
                <button onClick={handleSplitscrenNavigation}>
                    splitscreen
                </button>

            </div>

        </div>
    )


}


export default HomeComponent;