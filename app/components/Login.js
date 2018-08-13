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

import { authenticate } from "./Fetcher";

export default class Login extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "powderblue",
      elevation: null
    }
  };

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      authenticationStatus: 200
    };
  }

  async onLoginPress() {
    const { username, password } = this.state;

    if (username === "" || password === "") {
      this.setState({ authenticationStatus: 400 });
      return;
    }

    const responseJson = await authenticate(username, password.hashCode());

    if (responseJson.status === 200) {
      this.props.navigation.navigate("Dashboard", {
        userId: responseJson.body.userId
      });
    } else {
      this.setState({authenticationStatus: responseJson.status});
    }
  }

  render() {
    return (
      <SafeAreaView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("./utrade.png")} />
          <Text style={styles.subtext}>Log In</Text>
          {
            this.state.authenticationStatus === 400 &&
            <Text style={styles.failureText}>Username not found</Text>
          }
          {
            this.state.authenticationStatus === 403 &&
            <Text style={styles.failureText}>Incorrect Password</Text>
          }
        </View>
        <KeyboardAvoidingView behavior="padding"
                              enabled>
          <TextInput
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="go"
            secureTextEntry
            ref={input => (this.passwordInput = input)}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onLoginPress.bind(this)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
    height: 50,
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
  keyboard:{
    margin: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 15
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

AppRegistry.registerComponent("Login", () => Login);

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
