import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ListIndexItem extends Component<{}> {
  render() {
    let steps;
    if (this.props.open === this.props.item.title) {
      steps = this.props.item.steps.map(
        (step) => <Text key={"step"+step} style={styles.instructions}>
          {"\n"}
          {step}
        </Text>
      )
    }
    return (
        <Text style={styles.welcome}>
          {this.props.item.title}
          {steps}
        </Text>
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
    color: 'blue',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});