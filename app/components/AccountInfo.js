import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

import Swiper from "react-native-swiper";
import ScrollableTabView from "react-native-scrollable-tab-view";

import NavBar from "./NavBar";

export default class AccountInfo extends Component {
  render(){
    return(
      <SafeAreaView style={styles.container}>
        <NavBar navigation={this.props.navigation} />
        <Text style={styles.titletext}> Account Information</Text>
        <Text style={styles.subheadertext}> Name </Text>
        <Text style={styles.subtext}> John Doe </Text>
        <Text style={styles.subheadertext}> Email </Text>
        <Text style={styles.subtext}> ThisIsAnEmail@JUUL.com </Text>
        <KeyboardAvoidingView>
          <Text style={styles.subheadertext}> Change Password </Text>
          <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry={true}
          />
          <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={true}
          />
          <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={true}
          />
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.buttonContainer}s
          >
            <Text style={styles.buttonText}> Submit </Text>
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
    height: 50,
    width: 350,
    marginBottom: 10,
    backgroundColor: "dimgray",
    color: "black",
    paddingHorizontal: 10
  },
  subtext: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    width: window.width
  },
  subheadertext: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 40,
    width: window.width
  },
  titletext: {
    color: "black",
    width: window.width,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20
  },
  input: {
    height: 40,
    width: 350,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "black",
    paddingHorizontal: 10
  },
  keyboard:{
    margin: 20,
    padding: 20,
    alignSelf: "stretch"
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

AppRegistry.registerComponent("AccountInfo", () => AccountInfo);
