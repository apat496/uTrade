import React, { Component } from "react";
import {
  AppRegistry,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import NavBar from "./NavBar";

import { joinLeague } from "./Fetcher";

// Join League Page
export default class JoinLeague extends Component {
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
      leagueCode: "",
      joinStatus: 200
    };
  }

  // Join League Button Handler
  async onJoinLeaguePress() {
    // Get User Input
    const { leagueCode } = this.state;

    // Check Emptiness
    if (leagueCode === "") {
      this.setState({ joinStatus: 100 });
      return;
    }

    // Back End Call to Join League
    const responseJson = await joinLeague(leagueCode, global.userId);

    // Check for Good Status
    if (responseJson.status === 200) {
      // Redirect to League Home
      this.props.navigation.navigate("LeagueHome", {
        leagueId: responseJson.body.leagueId
      });
    } else {
      // Save Failure Status for Future Use
      this.setState({ joinStatus: responseJson.status });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NavBar navigation={this.props.navigation} />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("./utrade.png")} />
          <Text style={styles.subtext}>Join League</Text>
          {
            this.state.joinStatus === 100 &&
            <Text style={styles.failureText}>Input Field is Blank</Text>
          }
          {
            this.state.joinStatus === 403 &&
            <Text style={styles.failureText}>League Already Joined</Text>
          }
          {
            this.state.joinStatus === 404 &&
            <Text style={styles.failureText}>League Not Found</Text>
          }
        </View>
        <KeyboardAvoidingView behavior="padding"
                              enabled>
          <TextInput
            value={this.state.leagueCode}
            onChangeText={leagueCode => this.setState({ leagueCode })}
            style={styles.input}
            placeholder="League Code"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="go"
          />

        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onJoinLeaguePress.bind(this)}
        >
          <Text style={styles.buttonText}>Join league</Text>
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
    width: 200,
    height: 150
  },
  input: {
    height: 40,
    width: window.width,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "black",
    paddingHorizontal: 10
  },
  subtext: {
    color: "black",
    width: window.width,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20
  },
  failureText: {
    color: "red",
    width: window.width,
    textAlign: "center",
    fontSize: 20,
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
