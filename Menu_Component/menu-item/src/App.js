import React, { Component } from 'react';
import logo from './logo.svg';
import burger from './food.svg';
import pizza from './pizza.svg';
import './App.css';
import MenuIndex from './frontend/components/menu/menu_index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={pizza} className="App-logo-reverse" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={burger} className="App-logo-reverse" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={pizza} className="App-logo-reverse" alt="logo" />
          <h1 className="App-title">Welcome to Mikes Menu</h1>
        </header>
        <MenuIndex/>
      </div>
    );
  }
}

export default App;
