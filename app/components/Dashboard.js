import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

export default class Dashboard extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "powderblue",
      elevation: null
    },
    headerLeft: null
  };
  render() {
    return <Text>OLA</Text>;
  }
}

const styles = StyleSheet.create({});

AppRegistry.registerComponent("Dashboard", () => Dashboard);
