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

import { changePassword, getUserInfo } from "./Fetcher";

export default class AccountInfo extends Component {

  constructor() {
    super();
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      authenticationStatus: 200,
      userName: "",
      email: ""
    };

  }

  componentDidMount(){
    const {userName, email} = this.state
    const responseJson = getUserInfo(11).then(obj => this.setState({
      userName: obj.username,
      email: obj.email
    })
  );
  }

  async onChangePassword() {
    const {oldPassword, newPassword, confirmNewPassword } = this.state;

    /* Test for empty passwords */
    if (oldPassword === "" || newPassword === "") {
      consolte.log("empty");
      this.setState({ authenticationStatus: 400 });
      return;
    }

    /* Check if they match */
    if (newPassword !== confirmNewPassword) {
      console.log("wrongpass");
      this.setState({ authenticationStatus: 400});
      return;
    }

    const responseJson = await changePassword("11", oldPassword.hashCode(), newPassword.hashCode());

    console.log(responseJson);
    if (responseJson.status === 204) {
      this.props.navigation.navigate("Dashboard");
    } else {
      this.setState({authenticationStatus: responseJson.status});
    }
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
        <NavBar navigation={this.props.navigation} />
        <Text style={styles.titletext}> Account Information</Text>
        <Text style={styles.subheadertext}> Name </Text>
        <Text style={styles.subtext}> {this.state.userName} </Text>
        <Text style={styles.subheadertext}> Email </Text>
        <Text style={styles.subtext}> {this.state.email} </Text>
        <KeyboardAvoidingView>
          <Text style={styles.subheadertext}> Change Password </Text>
          <TextInput
            value={this.state.oldPassword}
            onChangeText={oldPassword => this.setState({ oldPassword })}
            style={styles.input}
            placeholder="Old Password"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.newInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          <TextInput
            value={this.state.newPassword}
            onChangeText={newPassword => this.setState({ newPassword })}
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.confirmInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            ref={input => (this.newInput = input)}
          />
          <TextInput
            value={this.state.confirmNewPassword}
            onChangeText={confirmNewPassword => this.setState({ confirmNewPassword })}
            style={styles.input}
            placeholder="Confirm New Password"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="go"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            ref={input => (this.confirmInput = input)}
          />
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onChangePassword.bind(this)}
          >
            <Text style={styles.buttonText}> Submit </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onChangePassword.bind(this)}
          >
            <Text style={styles.buttonText}> Log Out </Text>
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
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    width: window.width
  },
  subheadertext: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
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
