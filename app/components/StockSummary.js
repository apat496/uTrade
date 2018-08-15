import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import Autocomplete from "react-native-autocomplete-input";

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme
} from "victory-native";

import NavBar from "./NavBar";
import Table from "./Table";

import {
  lookupStock,
  buyStock,
  sellStock
} from "./Fetcher";

export default class StockSummary extends Component {
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
      stockInfo: {
        price: 0,
        dayHigh: "",
        dayLow: "",
        monthHigh: "",
        monthLow: "",
        yearHigh: "",
        yearLow: "",
        historical: [],
        owned: []
      },
      bsData: []
    }
  }

  // Asynchronous Data Gathering for Stock Summary States on Load
  componentDidMount() {
    // Get Ticker from Stock Search Navigation Argument
    var ticker = this.props.navigation.getParam("ticker");

    // Back End Call to Lookup Given Stock
    lookupStock(global.userId, ticker)
      .then(res => {
        var stock = res.body;
        var stockInfo = {
          price: stock.currentValue,
          dayHigh: "$" + stock.todaysHigh.toFixed(2),
          dayLow: "$" + stock.todaysLow.toFixed(2),
          monthHigh: "$" + stock.monthHigh.toFixed(2),
          monthLow: "$" + stock.monthLow.toFixed(2),
          yearHigh: "$" + stock.yearHigh.toFixed(2),
          yearLow: "$" + stock.yearLow.toFixed(2),
          historical: stock.yearSummary.reverse().map((value, i) => {
            return {
              date: i,
              value: value
            }
          }),
          owned: global.leagues.map(league => {
            return {
              leagueId: league.id,
              leagueName: league.name,
              quantity: stock.owned[league.name] || 0
            }
          })
        }
        var bsData = stockInfo.owned.map(league => {
          return {
            leagueId: league.leagueId,
            leagueName: league.leagueName,
            quantity: 0
          }
        })
        this.setState({ ticker, stockInfo, bsData });
      });
  }

  // Button Handler for Buy Stock
  async handleBuyStock(leagueName, quantity) {
    var leagueId = this.state.bsData.find(data => data.leagueName === leagueName).leagueId;

    // Back End Call to Buy a Stock
    buyStock(global.userId, leagueId, this.state.ticker, quantity).then(() => this.componentDidMount());
  }

  // Button Handler for Sell Stock
  async handleSellStock(leagueName, quantity) {
    var leagueId = this.state.bsData.find(data => data.leagueName === leagueName).leagueId;

    // Back End Call to Sell a Stock
    sellStock(global.userId, leagueId, this.state.ticker, quantity).then(() => this.componentDidMount());
  }

  // Helper Function to Render Historical Data Chart
  renderChart() {
    var stockInfo = this.state.stockInfo;

    // Ignore No Historical Data
    if (stockInfo.historical.length === 0) {
      return (
        <View/>
      )
    }
    return (
      <VictoryChart theme={VictoryTheme.material}
                    padding={{ top: 5, bottom: 15, left: 50, right: 50 }}
                    height={200}>
        <VictoryLine style={{
                       data: { stroke: "black" },
                       parent: { border: "1px solid #ccc"}
                     }}
                     data={stockInfo.historical}
                     x="date"
                     y="value"
        />
      </VictoryChart>
    );
  }

  // Helper Function to Render Header of Buy/Sell Table
  renderBSHeader() {
    // Predefined Widths for Page Fill
    var widths = [ 0.43, 0.1575, 0.1375, 0.1375, 0.1375 ].map(i => window.width * i);

    // Render Cells
    return ["League", "Owned", "Qty", "Buy", "Sell"].map((cell, i) => {
      return (
        <View key={i} style={[styles.cell, {width: widths[i]}]}>
          <Text style={styles.cellText}>{cell}</Text>
        </View>
      );
    });
  }

  // Helper Function to Render Contents of Buy/Sell Table
  renderBSContents() {
    var owned = this.state.stockInfo.owned;
    var bsData = this.state.bsData;
    var widths = [ 0.43, 0.1575, 0.1375, 0.1375, 0.1375 ].map(i => window.width * i);

    return owned.map((league, i) => (
      <View key={i} style={styles.row}>
        <View style={[styles.cell, {width: widths[0]}]}>
          <Text style={styles.cellText}>{league.leagueName}</Text>
        </View>
        <View style={[styles.cell, {width: widths[1]}]}>
          <Text style={styles.cellText}>{league.quantity}</Text>
        </View>
        <TextInput
          value={bsData.find(data => data.leagueName === league.leagueName).quantity.toString()}
          onChangeText={qty => { bsData.find(data => data.leagueName === league.leagueName).quantity = qty; this.setState({ bsData })}}
          style={[styles.cell, {width: widths[2]}]}
          returnKeyType="go"
          keyboardType="number-pad"
        />
        <TouchableOpacity
          style={[styles.cell, {width: widths[3]}]}
          onPress={() => this.handleBuyStock(league.leagueName,
                                             bsData.find(data => data.leagueName === league.leagueName).quantity)}
        >
          <Text style={styles.cellText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cell, {width: widths[4]}]}
          onPress={() => this.handleSellStock(league.leagueName,
                                              bsData.find(data => data.leagueName === league.leagueName).quantity)}
        >
          <Text style={styles.cellText}>Sell</Text>
        </TouchableOpacity>
      </View>
    ));
  }

  render() {
    var stockInfo = this.state.stockInfo;
    var statHeader = ["Stat", "Value", "Stat", "Value"];
    var statContents = [
      ["DayHigh", stockInfo.dayHigh, "DayLow",  stockInfo.dayLow],
      ["MonthHigh", stockInfo.monthHigh, "MonthLow", stockInfo.monthLow],
      ["YearHigh",  stockInfo.yearHigh,  "YearLow", stockInfo.yearLow]
    ];

    return (
      <SafeAreaView style={styles.container}>
        <NavBar navigation={this.props.navigation}/>
        <Text style={styles.text}>{this.state.ticker}</Text>
        <Text style={styles.text}>${stockInfo.price.toFixed(2)}</Text>
        {this.renderChart()}
        <Text style={styles.text}>Stats</Text>
        <Table headerContent={statHeader}
               tableContents={statContents}
        />
        <Text style={styles.text}>Buy/Sell</Text>
        <View style={styles.column}>
          <View style={styles.headerRow}>
            {this.renderBSHeader()}
          </View>
          <ScrollView>
            {this.renderBSContents()}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "powderblue",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  row: {
    flexDirection: "row"
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "dimgray"
  },
  column: {
    flexDirection: "column"
  },
  cell: {
    height: 30,
    borderColor: "black",
    borderWidth: 2
  },
  cellText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold"
  }
});

AppRegistry.registerComponent("StockSummary", () => StockSummary);
