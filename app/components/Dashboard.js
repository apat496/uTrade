import React, { Component } from "react";
import {
  AppRegistry,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import ScrollableTabView from "react-native-scrollable-tab-view";
import Swiper from "react-native-swiper";

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme
} from "victory-native";

import NavBar from "./NavBar";
import Table from "./Table";

import {
  getUserLeagues,
  getLeagueInfo,
  getTickers
} from "./Fetcher";

// Array of Colors for Lines on Swiper Charts
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

// Dashboard Page
export default class Dashboard extends Component {
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
      leagues: [],
      winners: [],
      losers: [],
      leagueNum: 0
    };
  }

  // Asynchronous Data Gathering for Dashboard States on Load
  componentDidMount() {
    // Back End Call to Get LeagueIDs for Leagues User is in
    getUserLeagues(global.userId).then(res => {
        // Back End Calls to Get League Info for Leagues User is in
        var leagueIds = res.body;
        Promise.all(leagueIds.map(getLeagueInfo)).then(res2s => {
          var leagues = res2s.map(res2 => res2.body)
                             .map((league, leagueNum) => {
                               return {
                                 id: leagueIds[leagueNum],
                                 name: league.leagueName,
                                 members: league.members.map(member => {
                                   return {
                                     name: member[0].username,
                                     values: member[1].historicalValue.map((value, i) => {
                                       return {
                                         date: i,
                                         value: value
                                       }
                                     })
                                   }
                                 })
                               }
                             });
          // Save Leagues
          this.setState({ leagues });

          // Save League Objects for Future Use
          global.leagues = leagues;
        });
    });

    // Backend Call to Get Stocks for Winners and Losers
    getTickers().then(res => {
      var tickers = res.body.map(ticker => {
        return {
          ticker: ticker.ticker,
          price: "$" + ticker.price.toFixed(2),
          delta: ticker.delta + "%"
        };
      });

      // Populate Winners and Losers
      this.setState({
        winners: tickers.slice(0, 10),
        losers: tickers.splice(-10).reverse()
      })
    });
  }

  // Helper Function to Render League Portfolio Histories for Given League
  renderLines(leagueNum) {
    // Get Members for League and Iterate
    return this.state.leagues[leagueNum].members.map((member, i) => {
      // If Member Has No History, Move On
      if(member.values.length === 0) return;

      // Render Line
      return member.values.length !== 1 ? (
        <VictoryLine
          style={{
            data: { stroke: colors[i] },
            parent: { border: "1px solid #ccc" }
          }}
          domain={{
            x: [
              member.values[0].date,
              member.values.slice(-1).pop().date + 1
            ],
            y: [
              Math.min.apply(Math, member.values.map(pair => pair.value)),
              Math.max.apply(Math, member.values.map(pair => pair.value)) + 1
            ]
          }}
          data={member.values}
          x="date"
          y="value"
          key={i}
        />
      ) :
      (
        <VictoryScatter
          style={{
            data: { stroke: colors[i] },
            parent: { border: "1px solid #ccc" }
          }}
          domain={{
            x: [
              member.values[0].date,
              member.values.slice(-1).pop().date + 1
            ],
            y: [
              Math.min.apply(Math, member.values.map(pair => pair.value)),
              Math.max.apply(Math, member.values.map(pair => pair.value)) + 1
            ]
          }}
          data={member.values}
          x="date"
          y="value"
          key={i}
        />
      )
    });
  }

  // Helper Function to Render Swiper Screens for Each League
  renderSwipes() {
    // Get Leagues for User and Iterate
    return this.state.leagues.map((league, i) => {
      return(
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("LeagueHome", {
            leagueId: league.id
          })}
          key={i}
        >
          <View style={styles.slide}>
            <Text style={styles.text}>{league.name}</Text>
            {
              league.members.length !== 0 &&
              league.members.some(member => member.values.length !== 0) &&
              <VictoryChart theme={VictoryTheme.material}
                            padding={{ top: 5, bottom: 125, left: 75, right: 50 }}>
                {this.renderLines(i)}
              </VictoryChart>
            }
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    // Prepare Winners and Losers Header
    var tableHeader = ["Ticker", "Price", "Delta"];

    // Prepare Winners Table Contents
    var winnerContents = this.state.winners.map(
      (winner) => [winner.ticker, winner.price, winner.delta]);

    // Prepare Losers Table Contents
    var loserContents = this.state.losers.map(
      (loser) => [loser.ticker, loser.price, loser.delta]);

    return (
      <SafeAreaView style={styles.container}>
        <NavBar navigation={this.props.navigation} />
        {
          this.state.leagues.length === 0 ?
          <View style={styles.slide}>
            <Text style={styles.text}>No Leagues Found</Text>
            <Text style={styles.text}>Join or Create a League</Text>
          </View> :
          <Swiper style={styles.wrapper}
                  dotColor="rgba(0,0,0,0)"
                  activeDotColor="rgba(0,0,0,0)">
            {this.renderSwipes()}
          </Swiper>
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
  wrapper: {
  },
  slide: {
    alignItems: "center",
    backgroundColor: "powderblue",
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

AppRegistry.registerComponent("Dashboard", () => Dashboard);
