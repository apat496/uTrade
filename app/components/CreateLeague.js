import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Modal,
  Dimensions
} from "react-native";

import NavBar from "./NavBar";

import { createLeague } from "./Fetcher";

export default class CreateLeague extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "powderblue",
      elevation: null
    },
    header:null
  };

  constructor() {
    super();
    this.state = {
      name: "",
      duration: "",
      capital: "",
      startDate: "",
      leagueCode: "",
      leagueId: "",
      modal: false
    };
  }

  async onCreateLeaguePress() {
    const { name, startDate, duration, capital } = this.state;
    createLeague(name, duration, capital, startDate, global.userId)
      .then(res => this.setState({
        leagueCode: res.body.leagueCode,
        leagueId: res.body.leagueId,
        modal: true
      }));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Modal transparent={true}
               visible={this.state.modal}
               onRequestClose={() => this.props.navigation.navigate("Dashboard")}
              >
          <View style={styles.modal}>
              <Text style={styles.modaltext}>{this.state.name + " Successfully Created!"}</Text>
              <Text style={styles.modaltext}>Use Code Below to Share League with Friends</Text>
              <Text style={[styles.modaltext, {fontSize: 16}]}>{this.state.leagueCode}</Text>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  this.setState({ modal: false });
                  this.props.navigation.navigate("LeagueHome", {
                    leagueId: this.state.leagueId
                  });
                }}
              >
                <Text style={styles.buttonText}>Go To League Home</Text>
              </TouchableOpacity>
          </View>
        </Modal>
        <NavBar navigation={this.props.navigation} />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("./utrade.png")} />
          <Text style={styles.subtext}>Create League</Text>
        </View>
        <KeyboardAvoidingView behavior="padding"
                              enabled>
          <TextInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={styles.input}
            placeholder="League Name"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            ref={input => (this.nameInput = input)}
            onSubmitEditing={() => this.startDateInput.focus()}
          />
          <TextInput
            value={this.state.startDate}
            onChangeText={startDate => this.setState({ startDate })}
            style={styles.input}
            placeholder="Start Date"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            ref={input => (this.startDateInput = input)}
            onSubmitEditing={() => this.durationInput.focus()}
          />
          <TextInput
            value={this.state.duration}
            onChangeText={duration => this.setState({ duration })}
            style={styles.input}
            placeholder="Duration (Weeks)"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            ref={input => (this.durationInput = input)}
            onSubmitEditing={() => this.capitalInput.focus()}
          />
          <TextInput
            value={this.state.capital}
            onChangeText={capital => this.setState({ capital })}
            style={styles.input}
            placeholder="Starting Capital"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="go"
            ref={input => (this.capitalInput = input)}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onCreateLeaguePress.bind(this)}
        >
          <Text style={styles.buttonText}>Create League</Text>
        </TouchableOpacity>
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
  modal: {
    marginTop: window.height / 4,
    height: window.height / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "powderblue",
    borderColor: "black",
    borderWidth: 5
  },
  modaltext: {
    color: "black",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20
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
    width: 350,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "black",
    paddingHorizontal: 10
  },
  subtext: {
    color: "black",
    width: 160,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20
  },
  failureText: {
    color: "red",
    width: 160,
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

AppRegistry.registerComponent("CreateLeague", () => CreateLeague);
