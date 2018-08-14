import React, { Component } from "react";
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native";

import { Video } from 'expo';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

import NavBar from "./NavBar";

// Help Page
export default class Help extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "powderblue",
      elevation: null
    },
    header: null
  };

  constructor() {
    super();
    this.state = {
      muteOne: false,
      muteTwo: false,
      shouldPlayOne: false,
      shouldPlayTwo: false
    }
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
    return(
      <SafeAreaView style={styles.container}>
        <NavBar navigation={this.props.navigation} />
          <ScrollView>
    	    <Text style={styles.videotitle}> Create a League </Text>
  	      <Video source={{ uri: 'https://s3.us-east-2.amazonaws.com/utrade-videos/TestVideoOne.mov' }}
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
          <Video source={{ uri: 'https://s3.us-east-2.amazonaws.com/utrade-videos/TestVideoTwo.mov' }}
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

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
    height: 700,
    width: 350
  }
});
AppRegistry.registerComponent("Help", () => Help);
