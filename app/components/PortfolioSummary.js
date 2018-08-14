import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  View
} from "react-native";

import ScrollableTabView from "react-native-scrollable-tab-view";

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme
} from "victory-native";

import NavBar from "./NavBar";
import Table from "./Table";

import {
  getPortfolio,
  getUserInfo,
  getLeagueInfo,
  getTickers
} from "./Fetcher";

export default class PortfolioSummary extends Component {
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
      username: "",
      leagueName: "",
      currentValue: "",
      historicalData: [],
      holdings: [],
      winners: [],
      losers: []
    }
  }

  componentDidMount() {
    getUserInfo("1").then(res => this.setState({ username: res.username }));
    getLeagueInfo("2").then(res => this.setState({ leagueName: res.body.leagueName }));
    getPortfolio("1", "2").then(res => {console.log(res); this.setState({
      currentValue: Math.round(res.body.currentValue * 100) / 100,
      historicalData: res.body.historicalValue.map((val, i) => {
        return {
          date: i,
          value: val
        }
      }),
      holdings: res.body.holdings.map(holding => holding.ticker)
    })});

    getTickers().then(res => {
      var tickers = res.body.map(ticker => {
        return {
          ticker: ticker.ticker,
          price: "$" + ticker.price,
          delta: ticker.delta + "%"
        };
      });
      [].push.apply(this.state.winners, tickers);
      [].push.apply(this.state.losers, tickers.reverse());
      this.forceUpdate();
    });
  }

  render() {
    var tableHeader = ["Ticker", "Price", "Delta"];
    var winnerContents = this.state.winners.filter(winner => this.state.holdings.includes(winner.ticker))
                                           .map(winner => [winner.ticker, winner.price, winner.delta])
                                           .slice(0, 10);
    var loserContents = this.state.losers.filter(loser => this.state.holdings.includes(loser.ticker))
                                         .map(loser => [loser.ticker, loser.price, loser.delta])
                                         .splice(-10);

    return (
      <SafeAreaView style={styles.container}>
        <NavBar navigation={this.props.navigation} />
        <Text style={styles.text}>{this.state.leagueName}</Text>
        <Text style={styles.text}>{this.state.username + "'s Portfolio"}</Text>
        <Text style={styles.text}>(${this.state.currentValue})</Text>
        {
          this.state.historicalData.length &&
          <VictoryChart theme={VictoryTheme.material}
                       padding={{ top: 10, bottom: 150, left: 75, right: 50 }}>
            <VictoryLine style={{
                           data: { stroke: "black" },
                           parent: { border: "1px solid #ccc"}
                         }}
                         data={this.state.historicalData}
                         x="date"
                         y="value"
            />
          </VictoryChart>
        }
        <ScrollableTabView>
          <ScrollView tabLabel="Winners">
            <Table headerContent={tableHeader}
                   tableContents={winnerContents}
            />
          </ScrollView>
          <ScrollView tabLabel="Losers">
            <Table headerContent={tableHeader}
                   tableContents={loserContents}
            />
          </ScrollView>
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "powderblue"
  },
  text: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  }
});

AppRegistry.registerComponent("PortfolioSummary", () => PortfolioSummary);
