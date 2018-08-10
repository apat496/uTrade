import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Swiper from "react-native-swiper";

import ScrollableTabView from "react-native-scrollable-tab-view";

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme
} from "victory-native";

import NavBar from "./NavBar";
import Table from "./Table";

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
  "pink",
  "gray",
  "darkred",
  "darkorange",
  "darkgreen",
  "darkblue",
  "darkviolet",
  "darkmagenta",
  "dimgray"
]

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      leagues: [
        {
          name: "Super Fun League 1",
          members: [
            {
              name: "Player 1",
              values: [
                { date: 1, value: 2 },
                { date: 2, value: 3 },
                { date: 3, value: 5 },
                { date: 4, value: 4 },
                { date: 5, value: 7 }
              ]
            },
            {
              name: "Player 2",
              values: [
                { date: 1, value: 2 },
                { date: 2, value: 3 },
                { date: 3, value: 4 },
                { date: 4, value: 5 },
                { date: 5, value: 6 }
              ]
            }
          ]
        }
      ],
      winners: [
        {
          ticker: "AAPL",
          price: "$191",
          delta: "+7.96%"
        },
        {
          ticker: "AMZN",
          price: "$1813",
          delta: "+5.45%"
        }
      ],
      losers: [
        {
          ticker: "GOOG",
          price: "$1188",
          delta: "-10.04%"
        }
      ]
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "powderblue",
      elevation: null
    },
    header: null
  };

  renderLines(leagueNum) {
    return this.state.leagues[leagueNum].members.map((member, i) => {
      return(
        <VictoryLine
          style={{
            data: { stroke: colors[i] },
            parent: { border: "1px solid #ccc"}
          }}
          data={member.values}
          x="date"
          y="value"
          key={i}
        />
      );
    });
  }

  renderSwipes() {
    return this.state.leagues.map((league, i) => {
      return(
        <View key={i} style={styles.slide}>
          <Text style={styles.text}>{league.name}</Text>
          <VictoryChart theme={VictoryTheme.material}
                        padding={{ top: 5, bottom: 125, left: 50, right: 50 }}>
            {this.renderLines(i)}
          </VictoryChart>
        </View>
      );
    });
  }

  render() {
    var tableHeader = ["Ticker", "Price", "Delta"];
    var winnerContents = this.state.winners.map(
      (winner) => [winner.ticker, winner.price, winner.delta]);
    var loserContents = this.state.losers.map(
      (loser) => [loser.ticker, loser.price, loser.delta]);

    return (
      <View behavior="padding" style={styles.container}>
        <NavBar navigation={this.props.navigation} />
        <Swiper style={styles.wrapper}>
          {this.renderSwipes()}
        </Swiper>
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
      </View>
    );
  }
}

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: window.height,
    backgroundColor: "powderblue"
  },
  wrapper: {
  },
  slide: {
    alignItems: "center",
    backgroundColor: "powderblue",
  },
  text: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold"
  },
  table: {
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
    width: window.width / 3,
    borderColor: "black",
    borderWidth: 2
  },
  cellText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  }
});

AppRegistry.registerComponent("Dashboard", () => Dashboard);
