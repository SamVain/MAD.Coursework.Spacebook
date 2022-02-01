import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import ReactDOM from 'react-dom';
import Inputs from './Inputs.js';

class App extends Component {
  render(){

    return (
      <Inputs />
    );
  }
}

export default App;