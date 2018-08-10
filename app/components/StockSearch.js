import React, { Component } from "react";
import {
  AppRegistry,
  TouchableOpacity,
  Image,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View // Container component
} from "react-native";

import Autocomplete from "react-native-autocomplete-input";

import NavBar from "./NavBar";

export default class StockSearch extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "powderblue",
      elevation: null
    },
    header: null
  };

  constructor() {
    super();

    this.state = {
      ticker: "",
      tickers: ["AAPL", "AMZN", "GOOG", "BRK.B"]
    }
  };

  async onStockSelection(ticker) {
    this.props.navigation.navigate("Dashboard");
  }

  filterTickers(input) {
    if (input === '') {
      return [];
    }

    const { tickers } = this.state;
    const regex = new RegExp(`${input.trim()}`, 'i');
    return tickers.filter(ticker => ticker.search(regex) >= 0);
  }

  render() {
    const { ticker } = this.state;
    const data = this.filterTickers(ticker);

    return (
      <View style={styles.container}>
        <NavBar navigation={this.props.navigation} />
        <Autocomplete
          data={data}
          defaultValue={ticker}
          onChangeText={input => this.setState({ ticker: input })}
          renderItem={item => (
            <TouchableOpacity
              onPress={() => this.onStockSelection(item)}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "powderblue"
  },
  buttonContainer: {
    backgroundColor: "white",
    borderColor: "powderblue",
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  buttonText: {
    color: "black",
    fontSize: 18
  }
});

AppRegistry.registerComponent("StockSearch", () => StockSearch);
