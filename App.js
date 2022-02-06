import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './js/components/TabNavigator'
import SpacebookHeader from './js/components/SpacebookHeader';
import SigninTabNavigator from './js/components/SigninTabNavigator';

import LoginPage from './js/pages/LoginPage';


//'use strict'
/*
This is the entry point for the application
*/
const Stack = createNativeStackNavigator();
//const Tab = createMaterialTopTabNavigator();

const App = () => {

  const [userToken, setUserToken] = useState(1);

  return(
    <div>
           {userToken == null ? (
            <SigninTabNavigator/>
          ):(
            <>
              <SpacebookHeader/>
              <TabNavigator/>
            </>
          )}

    </div>     
  )
}

export default App;