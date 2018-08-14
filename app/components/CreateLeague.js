import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import DatePicker from "react-native-datepicker";

import NavBar from "./NavBar";

import { createLeague } from "./Fetcher";

// Create League Page
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
      modal: false,
      createStatus: 200
    };
  }

  // Create League Button Handler
  async onCreateLeaguePress() {
    // Get User Input
    const { name, startDate, duration, capital } = this.state;

    // Check Emptiness
    if (name === "" || startDate === "" || duration === "" || capital === "") {
      this.setState({ createStatus: 100 });
      return;
    }

    // Back End Call to Create League
    const responseJson = await createLeague(name, duration, capital, startDate, global.userId);

    // Check for Good Status
    if (responseJson.status === 200) {
      // Set State Variables for Popup Modal
      this.setState({
        leagueCode: responseJson.body.leagueCode,
        leagueId: responseJson.body.leagueId,
        modal: true
      });
    } else {
      // Save Failure Status for Future Use
      this.setState({ createStatus: responseJson.status })
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Modal transparent={true}
               visible={this.state.modal}>
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
          {
            this.state.registrationStatus === 100 &&
            <Text style={styles.failureText}>Input Field is Blank</Text>
          }
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
          <DatePicker
            style={styles.dateInput}
            date={this.state.startDate}
            mode="date"
            placeholder="Start Date"
            format="YYYY-MM-DD"
            minDate="2018-08-14"
            maxDate="2018-09-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={startDate => this.setState({ startDate })}
            customStyles={{
              placeholderText: {
                color: "black"
              }
            }}
          />
          <TextInput
            value={this.state.duration}
            onChangeText={duration => this.setState({ duration })}
            style={styles.input}
            placeholder="Duration (Weeks)"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            keyboardType="number-pad"
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
            keyboardType="number-pad"
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
  dateInput: {
    height: 40,
    width: 350,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  subtext: {
    color: "black",
    width: 350,
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
