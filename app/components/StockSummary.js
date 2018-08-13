import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  TextInput,
  View, // Container component
  SafeAreaView
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
      stockInfo: {
        price: "",
        dayHigh: "",
        dayLow: "",
        monthHigh: "",
        monthLow: "",
        yearHigh: "",
        yearLow: "",
        historical: [],
        owned: []
      },
      widths: [
        175,
        50,
        50,
        50,
        50
      ],
      bsData: []
    }
  }

  componentDidMount() {
    var ticker = this.props.navigation.getParam("ticker");
    lookupStock(global.userId, ticker)
      .then(res => {
        var stock = res.body;
        var stockInfo = {
          price: stock.currentValue,
          dayHigh: "$" + stock.todaysHigh,
          dayLow: "$" + stock.todaysLow,
          monthHigh: "$" + stock.monthHigh,
          monthLow: "$" + stock.monthLow,
          yearHigh: "$" + stock.yearHigh,
          yearLow: "$" + stock.yearLow,
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

  async handleBuyStock(leagueName, quantity) {
    var leagueId = this.state.bsData.find(data => data.leagueName === leagueName).leagueId;
    buyStock(global.userId, leagueId, this.state.ticker, quantity).then(() => this.componentDidMount());
  }

  async handleSellStock(leagueName, quantity) {
    var leagueId = this.state.bsData.find(data => data.leagueName === leagueName).leagueId;
    sellStock(global.userId, leagueId, this.state.ticker, quantity).then(() => this.componentDidMount());
  }

  renderChart() {
    var stockInfo = this.state.stockInfo;
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

  renderBSHeader() {
    var widths = [ 0.43, 0.1575, 0.1375, 0.1375, 0.1375 ].map(i => window.width * i);

    return ["League", "Owned", "Qty", "Buy", "Sell"].map((cell, i) => {
      return (
        <View key={i} style={[styles.cell, {width: widths[i]}]}>
          <Text style={styles.cellText}>{cell}</Text>
        </View>
      );
    });
  }

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
        <Text style={styles.text}>${stockInfo.price}</Text>
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
          {this.renderBSContents()}
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
    height: window.height
  },
  text: {
    textAlign: "center",
    color: "black",
    fontSize: 30,
    fontWeight: "bold"
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
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 2
  },
  cellText: {
    textAlign: "center",
    color: "black",
    fontSize: 14,
    fontWeight: "bold"
  }
});

AppRegistry.registerComponent("StockSummary", () => StockSummary);
