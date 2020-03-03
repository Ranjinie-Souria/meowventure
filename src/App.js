import React from 'react';
import logo from './logo.svg';
import New from "./New";
import Game from "./Game";

function getGame() {
  if(!localStorage.getItem('playerData')) {
    return <New/>;
  }
  else {
    console.log('data found');
    return <Game/>
  }

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {getGame()}
    </div>
  );
}

export default App;
