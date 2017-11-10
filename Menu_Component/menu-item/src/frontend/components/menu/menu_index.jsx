import React, { Component } from 'react';
import MenuItems from '../../../data/seed.js';
import MenuIndexItem from './menu_index_item';

class MenuIndex extends Component {
  render() {
    let items = MenuItems.map((item) =>
      <MenuIndexItem key={"item"+item.name} item={item}/>
    );
    return (
      <div>
        <h1> Here are the menu items of the day</h1>
        <h2> Click each item to view ingredients </h2>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default MenuIndex;
