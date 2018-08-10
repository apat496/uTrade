import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default class NavBar extends Component {
  async onPress(button) {
    this.props.navigation.navigate(button)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onPress("Dashboard")}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onPress("CreateLeague")}
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onPress("JoinLeague")}
        >
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onPress("Dashboard")}
        >
          <Text style={styles.buttonText}>Stocks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onPress("AccountInfo")}
        >
          <Text style={styles.buttonText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onPress("Help")}
        >
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: "powderblue",
    flexDirection: "row"
  },
  buttonContainer: {
    width: window.width / 6,
    backgroundColor: "black",
    borderColor: "powderblue",
    borderWidth: 2,
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  }
});
