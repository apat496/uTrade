import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
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

import {
  getUserLeagues,
  getLeagueInfo,
  getTickers
} from "./Fetcher";

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
      losers: []
    };
  }

  componentDidMount() {
    getUserLeagues(global.userId).then(res => {
      res.body.forEach(leagueId => {
        getLeagueInfo(leagueId).then(res2 => {
          var league = res2.body;
          this.state.leagues.push({
            id: leagueId,
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
          });
          this.forceUpdate();
        });
      });
      global.leagues = this.state.leagues;
    });

    getTickers().then(res => {
      var tickers = res.body.map(ticker => {
        return {
          ticker: ticker.ticker,
          price: "$" + ticker.price,
          delta: ticker.delta + "%"
        };
      });
      [].push.apply(this.state.winners, tickers.slice(0, 10));
      [].push.apply(this.state.losers, tickers.splice(-10).reverse());
      this.forceUpdate();
    });
  }

  renderLines(leagueNum) {
    return this.state.leagues[leagueNum].members.map((member, i) => {
      if(member.values.length === 0) return;
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
    if (this.state.leagues.length === 0) {
      return (
        <View style={styles.slide}>
          <Text style={styles.text}>No Leagues Found</Text>
          <Text style={styles.text}>Join or Create a League</Text>
        </View>
      )
    }

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
            <VictoryChart theme={VictoryTheme.material}
                          padding={{ top: 5, bottom: 125, left: 75, right: 50 }}>
              {this.renderLines(i)}
            </VictoryChart>
          </View>
        </TouchableOpacity>
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
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    );
  }
}

const window = Dimensions.get("window");
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
