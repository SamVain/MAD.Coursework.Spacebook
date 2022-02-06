import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';

//import ReactDOM from 'react-dom';

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

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

//'use strict'
/*
This is the entry point for the application
*/
const Stack = createNativeStackNavigator();

const App = () => {
  //const navigationRef = useRef(null)

  return(

/*      
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  */
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">    
        <Stack.Screen name="Home" component={HomePage} />  
        <Stack.Screen name="Signup" component={SignupPage} />                    
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Search" component={SearchPage} />
        <Stack.Screen name="Account" component={AccountPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;