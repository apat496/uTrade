import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";

import { createUser } from "./Fetcher";

export default class Register extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "powderblue",
      elevation: null
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      registrationStatus: 200
    };
  }

  async onRegisterPress() {
    const { email, password, password_confirmation, name } = this.state;

    if (email === "" || name === "" || password === "") {
      this.setState({ registrationStatus: 100 });
      return;
    }

    if (password !== password_confirmation) {
      this.setState({ registrationStatus: 300 });
      return;
    }

    const responseJson = await createUser(email, name, password.hashCode());

    if (responseJson.status === 204) {
      global.userId = responseJson.userId;
      this.props.navigation.navigate("Dashboard");
    } else {
      this.setState({ registrationStatus: responseJson.status });
    }
  }

  render() {
    return (
      <SafeAreaView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("./utrade.png")} />
          <Text style={styles.subtext}>Sign Up</Text>
          {
            this.state.registrationStatus === 100 &&
            <Text style={styles.failureText}>Input Field is Blank</Text>
          }
          {
            this.state.registrationStatus === 300 &&
            <Text style={styles.failureText}>Password Does Not Match</Text>
          }
          {
            this.state.registrationStatus === 400 &&
            <Text style={styles.failureText}>Username Already Exists</Text>
          }
        </View>
        <KeyboardAvoidingView behavior="padding"
                              enabled>
          <TextInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.input}
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="next"
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="rgba(0,0,0,0.7)"
            ref={input => (this.passwordInput = input)}
            onSubmitEditing={() => this.passwordCInput.focus()}
            returnKeyType="next"
            secureTextEntry
          />
          <TextInput
            value={this.state.password_confirmation}
            onChangeText={password_confirmation => this.setState({ password_confirmation })}
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="rgba(0,0,0,0.7)"
            returnKeyType="go"
            secureTextEntry
            ref={input => (this.passwordCInput = input)}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onRegisterPress.bind(this)}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
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

AppRegistry.registerComponent("Register", () => Register);
