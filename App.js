import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar
} from "react-native";

import Title from "./app/components/Title"
import Login from "./app/components/Login";
import Dashboard from "./app/components/Dashboard";
import StockSearch from "./app/components/StockSearch";
import StockSummary from "./app/components/StockSummary";
import Register from "./app/components/Register";
import AccountInfo from "./app/components/AccountInfo"
import Help from "./app/components/Help"
import CreateLeague from "./app/components/CreateLeague";
import JoinLeague from "./app/components/JoinLeague";
import LeagueHome from "./app/components/LeagueHome";

import { StackNavigator } from "react-navigation";

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
  },
  JoinLeague: {
    screen: JoinLeague,
    navigationOptions: {
      title: "JoinLeague"
    }
  },
  CreateLeague:{
    screen: CreateLeague,
    navigationOptions: {
      title: "CreateLeague"
    }
  },
  StockSearch: {
    screen: StockSearch,
    navigationOptions: {
      title: "StockSearch"
    }
  },
  LeagueHome: {
    screen: LeagueHome,
    navigationOptions: {
      title: "LeagueHome"
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
