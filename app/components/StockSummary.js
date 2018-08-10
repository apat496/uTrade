import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  TextInput,
  View // Container component
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
      ticker: "AAPL",
      stockInfo: {
        price: "$191.65",
        open: "$191.65",
        high: "$192.64",
        low: "$190.87",
        volume: "3.85M",
        average: "29.79M",
        marketCap: "1000B",
        historical: [
          {
            date: 1,
            value: 2
          },
          {
            date: 2,
            value: 3
          },
          {
            date: 3,
            value: 3
          },
          {
            date: 4,
            value: 5
          },
          {
            date: 5,
            value: 4
          }
        ],
        owned: [
          {
            leagueName: "Super Fun League 1",
            quantity: 1
          },
          {
            leagueName: "Super Fun League 2",
            quantity: 2
          }
        ]
      },
      widths: [
        175,
        50,
        50,
        50,
        50
      ],
      bsData: [
        {
          leagueName: "Super Fun League 1",
          quantity: 0
        },
        {
          leagueName: "Super Fun League 2",
          quantity: 0
        }
      ]
    }
  }

  async handleBuyStock(leagueName, quantity) {
    console.log("Buy");
    console.log(leagueName);
    console.log(this.state.ticker);
    console.log(quantity);
  }

  async handleSellStock(leagueName, quantity) {
    console.log("Sell");
    console.log(leagueName);
    console.log(this.state.ticker);
    console.log(quantity);
  }

  renderChart() {
    var stockInfo = this.state.stockInfo;
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
          onChangeText={qty => { bsData[league.leagueName] = qty; this.setState({ bsData })}}
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
      ["OPEN", stockInfo.open, "VOLUME",  stockInfo.volume],
      ["HIGH", stockInfo.high, "AVG VOL", stockInfo.average],
      ["LOW",  stockInfo.low,  "MKT CAP", stockInfo.marketCap]
    ];

    return (
      <View style={styles.container}>
        <NavBar navigation={this.props.navigation}/>
        <Text style={styles.text}>{this.state.ticker}</Text>
        <Text style={styles.text}>{stockInfo.price}</Text>
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
      </View>
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
