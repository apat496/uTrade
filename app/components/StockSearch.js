import React, { Component } from "react";
import {
  AppRegistry,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

import Autocomplete from "react-native-autocomplete-input";

import NavBar from "./NavBar";

import { getTickers } from "./Fetcher";

// Stock Search Page
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
      tickers: []
    };
  }

  // Asynchronous Data Gathering for Stock Search States on Load
  componentDidMount() {
    // Back End Call to Get All Tickers
    getTickers().then(res => {
      [].push.apply(this.state.tickers, res.body.map(stock => stock.ticker));
    });
  }

  // Button Handler for Stock Selections
  async onStockSelection(ticker) {
    this.props.navigation.navigate("StockSummary", {
      ticker: ticker
    });
  }

  // Filter Function to Filter Tickers on Input
  filterTickers(input) {
    if (input === '') {
      return [];
    }

    const { tickers } = this.state;
    return tickers.filter(ticker => ticker.startsWith(input.toUpperCase()));
  }

  render() {
    // Get User Input
    const { ticker } = this.state;

    // Filter Based on Input
    const data = this.filterTickers(ticker);

    return (
      <SafeAreaView style={styles.container}>
        <NavBar navigation={this.props.navigation} />
        <Autocomplete
          data={data}
          defaultValue={ticker}
          onChangeText={input => this.setState({ ticker: input })}
          renderItem={item => (
            <TouchableOpacity
              onPress={this.onStockSelection.bind(this, item)}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
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
