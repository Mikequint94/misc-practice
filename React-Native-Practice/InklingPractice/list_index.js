/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import SeedList from './seed';
import ListIndexItem from './list_index_item';

export default class ListIndex extends Component<{}> {
  static navigationOptions = {
   title: 'To-Do List',
  };
  constructor() {
    super();
    this.state = {open: ""};
  }
  
  handleTap(title) {
    if (this.state.open === title) {
      this.setState({open: ""})
    } else {
      this.setState({open: title});
    }
  }
  render() {
    let items = SeedList.map(
      (item) => 
      <TouchableHighlight underlayColor="white" onPress={this.handleTap.bind(this, item.title)}>
        <View>
          <ListIndexItem key={"item" + item.title} open={this.state.open} item={item}/>
        </View>
      </TouchableHighlight>)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Here are the Lists
        </Text>
        <Text style={styles.instructions}>
          Click an item to see the steps
        </Text>
        {items}
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
