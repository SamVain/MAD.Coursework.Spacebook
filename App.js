import React, { useRef, useState, useEffect, useMemo, useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './js/components/TabNavigator'
import SpacebookHeader from './js/components/SpacebookHeader';
import SigninTabNavigator from './js/components/SigninTabNavigator';
import LoginPage from './js/pages/LoginPage';
import AsyncStorage from '@react-native-async-storage/async-storage';


//'use strict'
/*
This is the entry point for the application
*/
const Stack = createNativeStackNavigator();
//const Tab = createMaterialTopTabNavigator();
class App extends Component {
  render() {
    return (
      <>
        <div>
          <SpacebookHeader/>
          <TabNavigator/>
        </div>
      </>
    )
  }
}

export default App;


/* NOTES */

/*
Due to the API, a central feed like Facebook is not possible



*/