
import './App.scss';
import React, { useState, useEffect } from 'react';

import { Router, Route, Link, useHistory } from 'react-router-dom';

import SplitscreenGame from './Components/SplitscreenGame/SplitscreenGame';
import OnlineGame from './Components/OnlineGame/OnlineGame';
import NavigationMenu from './Components/Shared/NavigationMenu/NavigationMenu';
import NavigationButton from './Components/Shared/NavigationButton/NavigationButton';
import HomeComponent from './Components/Home/HomeComponent';
import newGameEndpoint from './backendEndpoint';



function App() {

    const history = useHistory();
    const [showNavigationMenu, setShowNavigationMenu] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);



    function createNewGame() {
        fetch(`${newGameEndpoint}/newgame`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {

                history.push(`/online/${data.gameID}`)
            })
            .catch(err => console.log(err))
    }

    function toggleShowNavigationMenu(e) {
        e.stopPropagation();
        showNavigationMenu === 0
            ? setShowNavigationMenu(1)
            :
            showNavigationMenu === 1
                ?
                setShowNavigationMenu(2)
                :
                setShowNavigationMenu(1);

    }
    function clickDisplay(e) {
        if (showNavigationMenu === 1) toggleShowNavigationMenu(e);
    }


    useEffect(() => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
        const handleScreenResize = () => {setScreenWidth(window.innerWidth); setScreenHeight(window.innerHeight)};
        window.addEventListener('resize', handleScreenResize);
        return () => window.removeEventListener('resize', handleScreenResize)

    }, [])

    
    return (
        <header className="App" onClick={clickDisplay}>
            <NavigationButton
                screenWidth={screenWidth}
                screenHeight={screenHeight}
                showNavigationMenu={showNavigationMenu}
                toggleShowNavigationMenu={toggleShowNavigationMenu}
            />
            <NavigationMenu
                screenWidth={screenWidth}
                screenHeight={screenHeight}
                showNavigationMenu={showNavigationMenu}
                createNewGame={createNewGame}
                toggleShowNavigationMenu={toggleShowNavigationMenu}
            />

            {/* <Link to="/"> home</Link> */}
            <Route exact path={ "/"} render={() => (
                <HomeComponent createNewGame={createNewGame}/>
            )}>
                {/* <Link to="/Splitscreen" >Splitscreen game </Link>
                <button onClick={createNewGame}> create new game </button> */}
            </Route>
            <Route path={"/Splitscreen"} render={() => (
                <SplitscreenGame
                    screenWidth = {screenWidth}
                    screenHeight = {screenHeight}
                />)}>

            </Route>
            <Route path={"/online/:id"} render={(props) => (
                < OnlineGame key={window.location.pathname} {...props}
                    screenWidth = {screenWidth}
                    screenHeight = {screenHeight}
                />)} >

            </Route>


        </header>
    )
}



export default App;
