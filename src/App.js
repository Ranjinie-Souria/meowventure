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

function checkNpcData() {
    if (!localStorage.getItem('npcData')) {
        localStorage.setItem('npcData', '{"Magimiu" : {"name" : "Magimiu","hp" : 100, "pw" : 100, "skills" : [["Fireball","15","30"]]},' +
            '"Blob" : {"name" : "Jelly Blob","hp" : 20, "pw" : 0, "skills" : [["Blob !","3","0"]]}}');
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
                {checkNpcData()}
                {getGame()}
            </div>);
    }
}

export default App;
