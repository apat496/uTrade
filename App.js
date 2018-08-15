import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar
} from "react-native";

import { StackNavigator } from "react-navigation";

import Title from "./app/components/Title"
import Login from "./app/components/Login";
import Register from "./app/components/Register";
import Dashboard from "./app/components/Dashboard";
import LeagueHome from "./app/components/LeagueHome";
import PortfolioSummary from "./app/components/PortfolioSummary";
import CreateLeague from "./app/components/CreateLeague";
import JoinLeague from "./app/components/JoinLeague";
import StockSearch from "./app/components/StockSearch";
import StockSummary from "./app/components/StockSummary";
import AccountInfo from "./app/components/AccountInfo"
import Help from "./app/components/Help"

console.disableYellowBox = true;
class Home extends Component<{}> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "powderblue",
      elevation: null
    },
    header: null
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="powderblue" />
        <Title navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

export default App = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
    }
  },
  Title: {
    screen: Title,
    navigationOptions: {
      title: "Title"
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register"
    }
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      title: "Dashboard"
    }
  },
  LeagueHome: {
    screen: LeagueHome,
    navigationOptions: {
      title: "LeagueHome"
    }
  },
  PortfolioSummary: {
    screen: PortfolioSummary,
    navigationOptions: {
      title: "PortfolioSummary"
    }
  },
  CreateLeague:{
    screen: CreateLeague,
    navigationOptions: {
      title: "CreateLeague"
    }
  },
  JoinLeague: {
    screen: JoinLeague,
    navigationOptions: {
      title: "JoinLeague"
    }
  },
  StockSearch: {
    screen: StockSearch,
    navigationOptions: {
      title: "StockSearch"
    }
  },
  StockSummary: {
    screen: StockSummary,
    navigationOptions: {
      title: "StockSummary"
    }
  },
  AccountInfo: {
    screen: AccountInfo,
    navigationOptions: {
      title: "AccountInfo"
    }
  },
  Help: {
    screen: Help,
    navigationOptions: {
      title: "Help"
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "powderblue"
  }
});

String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
