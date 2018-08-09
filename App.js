import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import Title from "./app/components/Title"
import Login from "./app/components/Login";
import Dashboard from "./app/components/Dashboard";
import Register from "./app/components/Register";

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
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="powderblue" />
        <Title navigation={this.props.navigation} />
      </View>
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
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
