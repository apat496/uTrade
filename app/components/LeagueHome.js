import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

import NavBar from "./NavBar";
import Table from "./Table";

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme
} from "victory-native";

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

export default class LeagueHome extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      presses : [
        "Dashboard",
        "Login"
      ],
      league:
      {
        name: "Super Fun League Name here",
        members: [
          {
            name: "Player 1",
            capital: "20",
            delta: "+4.23%",
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
            capital: "1000",
            delta: "-94.23%",
            values: [
              { date: 1, value: 2 },
              { date: 2, value: 3 },
              { date: 3, value: 4 },
              { date: 4, value: 5 },
              { date: 5, value: 6 }
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
      }
    }
  }
  renderLines() {
    return this.state.league.members.map((member, i) => {
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

  render() {
    var tableHeader = ["Player", "Networth", "Delta"];
    var leaderboard = this.state.league.members.map(
      (player) => [player.name, player.capital, player.delta]);

      return (
      <View behavior="padding" style={styles.container}>
        <Text style={styles.text}> hello </Text>
        <VictoryChart theme={VictoryTheme.material}
                      padding={{ top: 5, bottom: 125, left: 50, right: 50 }}>
          {this.renderLines()}
        </VictoryChart>
        <Table
          navigation={this.props.navigation}
          presses={this.state.presses}
          headerContent={tableHeader}
          tableContents={leaderboard}
        />

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

AppRegistry.registerComponent("LeagueHome", () => LeagueHome);
