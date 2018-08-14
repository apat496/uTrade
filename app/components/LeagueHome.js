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
  SafeAreaView,
  TouchableOpacity
} from "react-native";

import NavBar from "./NavBar";
import Table from "./Table";

import {getLeagueInfo} from "./Fetcher"

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
      presses : ["PortfolioSummary"],
      league: {
        members:[],
        duration: "",
        currentValue: "",
        delta: ""
      }
  }
}

  componentDidMount(){
    //const {userName, email} = this.state

    /* First get the chart info */
    getLeagueInfo(this.props.navigation.getParam("leagueId")).then(res => {
      this.setState({
        league: {
          presses: ["PortfolioSummary"],
          duration: res.body.duration,
          startingCapital: res.body.startingCapital,
          members: res.body.members.map(member => {
          return {
            name: member[0].username,
            values: member[1].historicalValue.map((value, i) => {
              return {
                date: i,
                value: value
              }
            }),
            currentValue: member[1].currentValue,
            delta: (parseFloat(member[1].historicalValue.splice(-1)) - parseFloat(res.body.startingCapital)) / parseFloat(res.body.startingCapital)
          }
        })
      }
      });
      this.forceUpdate();
    });
    console.log("******");
    console.log(this.state.league);
    console.log("******booom goes the dynamite****");}



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

  async onPress(index) {
    this.props.navigation.navigate(this.props.presses[index], {
      leagueId: this.props.navigation.getParam("leagueId")
    })
  }


  render() {
    var tableHeader = ["Player", "Networth", "Delta"];
    var leaderboard = this.state.league.members.map(
      (player) => [player.name, player.currentValue, player.delta + "%"]);

      return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
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
