import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from "react-native";
import NavBar from "./NavBar";

export default class JoinLeague extends Component {
  constructor() {
    super();
    this.state = {
      leagueID: ""
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "powderblue",
      elevation: null
    }
  };

  async onRegisterPress() {
    const { leagueID} = this.state;
    console.log(leagueID);
    this.props.navigation.navigate("Dashboard");
  }

  render() {
    return (
      <View behavior="padding" style={styles.container}>
      <NavBar navigation={this.props.navigation} />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("./utrade.png")} />
          <Text style={styles.subtext}>Join a league</Text>
        </View>
        <KeyboardAvoidingView>
          <TextInput
            value={this.state.leagueID}
            onChangeText={name => this.setState({ leagueID })}
            style={styles.input}
            placeholder="League ID"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.leagueIDInput.focus()}
          />

        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onRegisterPress.bind(this)}
        >
          <Text style={styles.buttonText}>Join a league</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "powderblue"
  },
  logoContainer: {
    alignItems: "top",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 150
  },
  input: {
    height: 40,
    width: 350,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "black",
    paddingHorizontal: 10
  },
  subtext: {
    color: "black",
    width: 300,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20
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
  }
});

AppRegistry.registerComponent("JoinLeague", () => JoinLeague);
