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
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

import { Video } from 'expo';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

import NavBar from "./NavBar";
//import Video from 'react-native-video';
//import TestVideoOne from "../../assets/TestVideoOne.mp4";

export default class Help extends Component {

  state = {
    muteOne: false,
    muteTwo: false,
    shouldPlayOne: true,
    shouldPlayTwo: false
  }

  handlePlayAndPauseOne = () => {
    this.setState((prevState) => ({
       shouldPlayOne: !prevState.shouldPlayOne
    }));
  }

  handlePlayAndPauseTwo = () => {
    this.setState((prevState) => ({
       shouldPlayTwo: !prevState.shouldPlayTwo
    }));
  }

  handleVolumeOne = () => {
    this.setState(prevState => ({
      muteOne: !prevState.muteOne,
    }));
  }

  handleVolumeTwo = () => {
    this.setState(prevState => ({
      muteTwo: !prevState.muteTwo,
    }));
  }


  render(){
    const { width } = Dimensions.get("window");
    return(
      <View style={styles.container}>
	     <Text style={styles.videotitle}> Create a League </Text>
	      <Video source={{ uri: 'https://s3.us-east-2.amazonaws.com/utrade-videos/TestVideoOne.mp4' }}
        style={styles.video}
        isLooping
        shouldPlay={this.state.shouldPlayOne}
        isMuted={this.state.muteOne}
        resizeMode="cover"/>
        <View style={styles.controlBar}>
          <MaterialIcons
            name={this.state.muteOne ? "volume-mute" : "volume-up"}
            size={30}
            color="white"
            onPress={this.handleVolumeOne}
          />
          <MaterialIcons
            name={this.state.shouldPlayOne ? "pause" : "play-arrow"}
            size={30}
            color="white"
            onPress={this.handlePlayAndPauseOne}
          />
        </View>
        <Text style={styles.videotitle}> Buy/Sell Stock </Text>
        <Video source={{ uri: 'https://s3.us-east-2.amazonaws.com/utrade-videos/TestVideoTwo.mp4' }}
        style={styles.video}
        shouldPlay={this.state.shouldPlayTwo}
        isMuted={this.state.muteTwo}
        isLooping
        resizeMode="cover"/>
        <View style={styles.controlBar}>
          <MaterialIcons
            name={this.state.muteTwo ? "volume-mute" : "volume-up"}
            size={30}
            color="white"
            onPress={this.handleVolumeTwo}
          />
          <MaterialIcons
            name={this.state.shouldPlayTwo ? "pause" : "play-arrow"}
            size={30}
            color="white"
            onPress={this.handlePlayAndPauseTwo}
          />
        </View>

      </View>
    );
  }
}

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "powderblue"
  },
  controlBar: {
    marginTop:5,
    left: 0,
    right: 0,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  videotitle: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: "bold"
  },
  video: {
    marginTop: 20,
    left: 10,
    height: 200,
    width: 350
  }
});
AppRegistry.registerComponent("Help", () => Help);
