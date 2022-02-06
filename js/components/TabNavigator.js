import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AccountPage from '../pages/AccountPage';
import SearchPage from '../pages/SearchPage';

const Tab = createMaterialTopTabNavigator();

function TabNavigator() {


    return (
        <NavigationContainer>
           <Tab.Navigator initialRouteName="Home">  

            {/* <Tab.Screen name="Signup" component={SignupPage} />               
            <Tab.Screen name="Login" component={LoginPage} /> */}

            <Tab.Screen name="Home" component={HomePage} />                     
            <Tab.Screen name="Search" component={SearchPage} />
            <Tab.Screen name="Account" component={AccountPage} />

          </Tab.Navigator> 

      </NavigationContainer>
    ); 

}

export default TabNavigator