import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { authenticate } from "./Fetcher";

// Login Page
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

  // Log In Button Handler
  async onLoginPress() {
    // Get User Input
    const { username, password } = this.state;

    // Check Emptiness
    if (username === "" || password === "") {
      this.setState({ authenticationStatus: 100 });
      return;
    }

    // Backend Call to Authenticate User
    const responseJson = await authenticate(username, password.hashCode());

    // Check for Good Status
    if (responseJson.status === 200) {
      // Save UserId for Future Use
      global.userId = responseJson.body.userId;

      // Redirect to Dashboard
      this.props.navigation.navigate("Dashboard");
    } else {
      // Save Failure Status for Future Use
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
            this.state.authenticationStatus === 100 &&
            <Text style={styles.failureText}>Input Field is Blank</Text>
          }
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
            secureTextEntry={true}
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="go"
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

AppRegistry.registerComponent("Login", () => Login);
