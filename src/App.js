import React from 'react';
import logo from './logo.svg';
import New from "./New";
import Game from "./Game";

function getGame() {
  if (localStorage.getItem('playerData')) {
    return <Game/>;
  }
  else {
    return <New/>
  }

}

function App() {

    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
    } else {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                {getGame()}
            </div>);
    }
}

export default App;
