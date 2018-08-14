import React, { Component } from "react";
import {
  AppRegistry,
  Image,
  SafeAreaView,
  StyleSheet, // CSS-like styles
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Title Page
export default class Title extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "powderblue",
      elevation: null
    },
    header: null
  };

  // Login Button Handler
  async onLoginPress() {
    this.props.navigation.navigate("Login");
  }

  // Sign Up Button Handler
  async onSignUpPress() {
    this.props.navigation.navigate("Register");
  }

  render() {
    return (
      <SafeAreaView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("./utrade.png")} />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onSignUpPress.bind(this)}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onLoginPress.bind(this)}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "powderblue"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 600,
    height: 400
  },
  buttonContainer: {
    backgroundColor: "black",
    borderColor: "powderblue",
    borderWidth: 2,
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700"
  },
});

AppRegistry.registerComponent("Title", () => Title);
