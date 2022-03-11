import React, {Component, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorge from '@react-native-async-storage/async-storage';

import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AccountPage from '../pages/AccountPage';
import SearchPage from '../pages/SearchPage';
import Settings from '../SettingsPage'
import FeedPage from '../pages/FeedPage';

const Tab = createMaterialTopTabNavigator();

class TabNavigator extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      selectedUserId : 0,

    };
  }

  setLoggedIn = (value) => {  
    this.setState({
      isLoggedIn: value
    })
  }

   selectedUserId = (value) => { 
    this.setState({
      selectedUserId: value
    })
  }


  render () {
    return (
        <NavigationContainer>

          { this.state.isLoggedIn ? 

            <Tab.Navigator initialRouteName="Search">

              <Tab.Screen 
                name="Search" 
                children={
                  props => <SearchPage 
                              {...props}
                              userData={this.state} 
                              selectedUserId={this.selectedUserId}/>
                } />

              <Tab.Screen name="Feed" 
                children={
                  props => <FeedPage 
                              {...props} 
                              userData={this.state} 
                              selectedUserId={this.selectedUserId}/>
                } />

              <Tab.Screen name="Account"
                children={
                  props => <AccountPage 
                              {...props} 
                              userData={this.state} 
                              setLoggedIn={this.setLoggedIn} 
                              selectedUserId={this.selectedUserId}/>
                } />

              <Tab.Screen name="Settings" component={Settings}></Tab.Screen>

            </Tab.Navigator> 

            :

            <Tab.Navigator initialRouteName="Login">
              <Tab.Screen  name="Login"
                children={
                  props => <LoginPage 
                              {...props} 
                              userData={this.state} 
                              setLoggedIn={this.setLoggedIn} 
                              selectedUserId={this.selectedUserId}/>

                } />
              <Tab.Screen name="Signup" component={SignupPage}></Tab.Screen>
              
            </Tab.Navigator>
          }
      </NavigationContainer>
    );
  } 
}

export default TabNavigator