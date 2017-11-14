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
  TouchableHighlight,
  TextInput
} from 'react-native';

import SeedList from './seed';
import ListIndexItem from './list_index_item';

export default class ListIndex extends Component<{}> {
  static navigationOptions = {
   title: 'To-Do List',
  };
  constructor() {
    super();
    this.state = {open: "", text: ""};
  }

  handleTap(title) {
    if (this.state.open === title) {
      this.setState({open: ""})
    } else {
      this.setState({open: title});
    }
  }

  searchList(text) {

  }

  render() {
    let SeedsShown;
    if (this.state.text === "") {
      SeedsShown = SeedList;
    } else {
      SeedsShown = SeedList.filter(
        (item) => {return item.title.slice(0,this.state.text.length) === this.state.text})
    }
    let items = SeedsShown.map(
      (item) =>
      <TouchableHighlight underlayColor="white" onPress={this.handleTap.bind(this, item.title)}>
        <View>
          <ListIndexItem key={"item" + item.title} open={this.state.open} item={item}/>
        </View>
      </TouchableHighlight>);
    let searchBar = (
      <TextInput
        style={{width: 300, height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) =>
          this.setState({text})}
        value={this.state.text}
      />
    );
    return (
      <View style={styles.container}>
      {searchBar}
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
