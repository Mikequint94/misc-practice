import React, { Component } from 'react';
import MenuItems from '../../../data/seed.js';
import MenuIndexItem from './menu_index_item';

class MenuIndex extends Component {
  constructor(){
    super();
    this.state={showIngredients: ""};

    // this.showIngredients = this.showIngredients.bind(this);
  }

  showIngredients(name){
    if (this.state.showIngredients === name) {
      this.setState({showIngredients: ""});
    } else {
      this.setState({showIngredients: name});
    }
  }

  render() {
    let items = MenuItems.map((item) =>
      <div key={"item"+item.name} onClick={this.showIngredients.bind(this, item.name)}>
        <MenuIndexItem show={this.state.showIngredients} item={item}/>
      </div>
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
