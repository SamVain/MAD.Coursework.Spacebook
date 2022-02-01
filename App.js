import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import ReactDOM from 'react-dom';
import Login from './Login.js';

/*
This is the entry point for the application
*/

class App extends Component {
  render(){

    return (
      <Login />
    );
  }
}

export default App;