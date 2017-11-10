import React, { Component } from 'react';

class MenuIndexItem extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {showIngredients: false};
  // }

  // toggleIngredients(){
  //   if (this.state.showIngredients){
  //     this.setState({showIngredients: false});
  //   } else {
  //     this.setState({showIngredients: true});
  //   }
  // }
  render() {
    let ingredients;
    if (this.props.show === this.props.item.name) {
      ingredients = this.props.item.ingredients.map(
        (ingredient) => <li key={"ingredient"+ingredient}>{ingredient}</li>);
    }

    return (
      <div className="Menu-item">
        <button> {this.props.item.name} </button>
        <ul>{ingredients}</ul>
      </div>
    );
  }
}

export default MenuIndexItem;
