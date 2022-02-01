import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import ReactDOM from 'react-dom';
import LoginPage from './js/pages/LoginPage';
import SignupPage from './js/pages/SignupPage';
import SpacebookHeader from './js/components/SpacebookHeader';

/*
This is the entry point for the application
*/

class App extends Component {
  render(){
    return (
      <View>
        <StatusBar barStyle="light-content" /> 
        <SpacebookHeader />
      </View>
      //<LoginPage />
      //<SignupPage />
    );
  }
}

export default App;