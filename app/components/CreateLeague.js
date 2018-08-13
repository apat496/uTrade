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
  KeyboardAvoidingView
} from "react-native";
import NavBar from "./NavBar";

export default class CreateLeague extends Component {
  constructor() {
    super();
    this.state = {
      name:"",
      duration: "",
      captial:""
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "powderblue",
      elevation: null
    }
  };

  async onRegisterPress() {
    const { name, duration, capital} = this.state;
    console.log(name);
    console.log(duration);
    console.log(capital);
    this.props.navigation.navigate("Dashboard");
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <NavBar navigation={this.props.navigation} />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("./utrade.png")} />
          <Text style={styles.subtext}>Create a League</Text>
        </View>
        <KeyboardAvoidingView>
          <TextInput
            value={this.state.leagueID}
            onChangeText={name => this.setState({ name })}
            style={styles.input}
            placeholder="League name"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.nameInput.focus()}
          />
          <TextInput
            value={this.state.leagueID}
            onChangeText={name => this.setState({ duration })}
            style={styles.input}
            placeholder="Duration (Weeks)"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.durationInput.focus()}
          />
          <TextInput
            value={this.state.leagueID}
            onChangeText={name => this.setState({ capital })}
            style={styles.input}
            placeholder="Starting Capital"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.capitalInput.focus()}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onRegisterPress.bind(this)}
        >
          <Text style={styles.buttonText}>Create a League</Text>
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

AppRegistry.registerComponent("CreateLeague", () => CreateLeague);
