import React, {Component, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AccountPage from '../pages/AccountPage';
import SearchPage from '../pages/SearchPage';

const Tab = createMaterialTopTabNavigator();

class TabNavigator extends Component {

  constructor(props) {

    super(props);

    this.state = {
      isLoggedIn: false
    };
  }

  setLoggedIn = (value) => {
    
    this.setState({
      isLoggedIn: value
    })
  }

  render () {

    return (
        <NavigationContainer>
          { this.state.isLoggedIn ? 
            <Tab.Navigator initialRouteName="Home">
              <Tab.Screen name="Home" component={HomePage} />              
              <Tab.Screen name="Search" component={SearchPage} />
              <Tab.Screen name="Account" >
              {/*  component={() => <AccountPage setLoggedIn={this.setLoggedIn} />} */}
              {props => (
                <AccountPage setLoggedIn={this.setLoggedIn} />
              )}
              </Tab.Screen>
            </Tab.Navigator> 
            :
            <Tab.Navigator initialRouteName="Login">
              <Tab.Screen  name="Login">
              {/*  component={() => <AccountPage setLoggedIn={this.setLoggedIn} />} */}
              {props => (
                <LoginPage setLoggedIn={this.setLoggedIn} />
              )}
              </Tab.Screen>
              <Tab.Screen name="Signup" component={SignupPage} />    
            </Tab.Navigator>
          }
      </NavigationContainer>
    );
  } 
}

export default TabNavigator