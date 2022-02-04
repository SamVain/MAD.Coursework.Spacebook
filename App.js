import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import ReactDOM from 'react-dom';
import LoginPage from './js/pages/LoginPage';
import SignupPage from './js/pages/SignupPage';
import SpacebookHeader from './js/components/SpacebookHeader';
import HomePage from './js/pages/HomePage';
import AccountPage from './js/pages/AccountPage';
import SearchPage from './js/pages/SearchPage';
//import HomeStack from './routes/homeStack'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';

'use strict'

const Stack = createNativeStackNavigator();

function HomeStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Signup" component={SignupPage} />
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Search" component={SearchPage} />
            <Stack.Screen name="Account" component={AccountPage} />
        </Stack.Navigator>
    );
}

/*
This is the entry point for the application
*/

export default function App({}) {
  //const navigationRef = useRef(null)

  return(
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  )
}


/* class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
      //<LoginPage />
      //<SignupPage />
    );
  }
}

export default App; */