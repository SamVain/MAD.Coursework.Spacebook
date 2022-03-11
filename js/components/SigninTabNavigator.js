import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AccountPage from '../pages/AccountPage';
import SearchPage from '../pages/SearchPage';



const Tab = createMaterialTopTabNavigator();

function SigninTabNavigator() {
    return (
        <NavigationContainer>
           <Tab.Navigator initialRouteName="Sign In">
            <Tab.Screen name="Sign In" component={LoginPage} />                   
            <Tab.Screen name="Sign Up" component={SignupPage} />
          </Tab.Navigator>
      </NavigationContainer>
    );
}

export default SigninTabNavigator