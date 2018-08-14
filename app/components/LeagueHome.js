import React, { Component } from "react";
import {
  AppRegistry,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme
} from "victory-native";

import NavBar from "./NavBar";
import Table from "./Table";

import { getLeagueInfo } from "./Fetcher"

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

// League Home Page
export default class LeagueHome extends Component {
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
      league: {
        id: "",
        name: "",
        startingCapital: "",
        members: []
      }
    }
  }

  // Asynchronous Data Gathering for League States on Load
  componentDidMount() {
    // Get League ID from Dashboard Navigation Argument
    const leagueId = this.props.navigation.getParam("leagueId");

    // Back End Call to Get League Info for Passed League ID
    getLeagueInfo(leagueId).then(res => {
      // Transform Data from Back End to Internal Representation
      var league = {
        id: leagueId,
        name: res.body.leagueName,
        startingCapital: res.body.startingCapital,
        members: res.body.members.map(member => {
          return {
            id: member[0].userId,
            name: member[0].username,
            values: member[1].historicalValue.map((value, i) => {
              return {
                date: i,
                value: value
              }
            }),
            currentValue: member[1].currentValue,
            delta: (parseFloat(member[1].historicalValue.splice(-1)) -
                    parseFloat(res.body.startingCapital)) /
                    parseFloat(res.body.startingCapital)
          }
        })
      }

      // Set Internal State for Rendering
      this.setState({ league })
    });
  }

  // Helper Function to Render League Portfolio Histories
  renderLines() {
    // Get Members for League and Iterate
    return this.state.league.members.map((member, i) => {
      // If Member Has No History, Move On
      if(member.values.length === 0) return;

      // Render Line
      return (
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
    // Prepare User Summary Header
    var tableHeader = ["Player", "Networth", "Delta"];

    // Prepare User Summary Contents
    var leaderboard = this.state.league.members.map(
      (player) => [player.name, player.currentValue, player.delta + "%"]);

      return (
        <SafeAreaView style={styles.container}>
          <NavBar navigation={this.props.navigation} />
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>{this.state.league.name}</Text>
            <VictoryChart theme={VictoryTheme.material}
                          padding={{ top: 5, bottom: 10, left: 75, right: 50 }}
                          height={300}>
              {this.renderLines()}
            </VictoryChart>
            <Table rowPressHandler={rowIndex => this.props.navigation.navigate("PortfolioSummary", {
                     leagueId: this.state.league.id,
                     userId: this.state.league.members[rowIndex].id
                   })}
                   rowColors={colors}
                   headerContent={tableHeader}
                   tableContents={leaderboard}
            />
          </ScrollView>
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

AppRegistry.registerComponent("LeagueHome", () => LeagueHome);
