import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

import EnterFirstNameBox from '../components/inputBoxes/FirstNameInputBox';
import ConfirmLastNameBox from '../components/inputBoxes/ConfirmLastNameBox';
import EnterEmailBox from '../components/inputBoxes/EmailInputBox';
import EnterPasswordBox from '../components/inputBoxes/PasswordInputBox';
import ConfirmPasswordBox from '../components/inputBoxes/ConfirmPasswordInputBox';
import SignUpButton from '../components/buttons/SignUpButton';
import Title from '../components/misc/LoginSigninTitle';



function SignupPage({ navigation }) {

   return (
      <View style={styles.container}>
         <Title />
         <EnterFirstNameBox />
         <ConfirmLastNameBox />
         <EnterEmailBox />
         <EnterPasswordBox />
         <ConfirmPasswordBox />
         <SignUpButton navigation={navigation}/>
      </View>
   ); 

}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20
    },
    instructions: {
      color: '#888',
      fontSize: 18,
      marginHorizontal: 15,
      marginBottom: 10,
    },
   text: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      color: "#4267B2",
      paddingTop: 30
   },
   button: {
      backgroundColor: "#4267B2",
      padding: 20,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
    },
});

export default SignupPage