import React, { Component } from "react";
import {
  AppRegistry,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text
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

// Portfolio Summary Page
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

  // Asynchronous Data Gathering for Portfolio States on Load
  componentDidMount() {
    // Get League and User IDs from League Home Navigation Argument
    var leagueId = this.props.navigation.getParam("leagueId");
    var userId = this.props.navigation.getParam("userId");

    // Back End Call to Get User Info for Passed User ID
    getUserInfo(userId).then(res => this.setState({ username: res.username }));

    // Get League Name From Local Cache
    this.setState({ leagueName: global.leagues.find(league => league.id === leagueId).name });

    // Back End Call to Get Portfolio Info for Passes IDs
    getPortfolio(userId, leagueId).then(res => this.setState({
      currentValue: Math.round(res.body.currentValue * 100) / 100,
      historicalData: res.body.historicalValue.map((val, i) => {
        return {
          date: i,
          value: val
        }
      }),
      holdings: res.body.holdings.map(holding => holding.ticker)
    }));

    // Backend Call to Get Stocks for Winners and Losers
    getTickers().then(res => {
      var tickers = res.body.map(ticker => {
        return {
          ticker: ticker.ticker,
          price: "$" + ticker.price,
          delta: ticker.delta + "%"
        };
      });

      // Populate Winners
      [].push.apply(this.state.winners, tickers);

      // Populate Losers
      [].push.apply(this.state.losers, tickers.reverse());

      // Force Render to Render Added Winners and Losers
      this.forceUpdate();
    });
  }

  render() {
    // Prepare Winners and Losers Header
    var tableHeader = ["Ticker", "Price", "Delta"];

    // Prepare Winners Table Contents
    var winnerContents = this.state.winners.filter(winner => this.state.holdings.includes(winner.ticker))
                                           .map(winner => [winner.ticker, winner.price, winner.delta])
                                           .slice(0, 10);

    // Prepare Losers Table Contents
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
                        padding={{ top: 10, bottom: 10, left: 75, right: 50 }}
                        height={200}>
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
  }
});

AppRegistry.registerComponent("PortfolioSummary", () => PortfolioSummary);
