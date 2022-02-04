import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import EnterFirstNameBox from '../components/inputBoxes/FirstNameInputBox';
import ConfirmLastNameBox from '../components/inputBoxes/ConfirmLastNameBox';
import EnterEmailBox from '../components/inputBoxes/EmailInputBox';
import EnterPasswordBox from '../components/inputBoxes/PasswordInputBox';
import ConfirmPasswordBox from '../components/inputBoxes/ConfirmPasswordInputBox';
import SignUpButton from '../components/buttons/SignUpButton';
import Title from '../components/misc/LoginSigninTitle';



class SignupPage extends Component {
   render(){
      return (
        <View>
           <Title />
           <EnterFirstNameBox />
           <ConfirmLastNameBox />
           <EnterEmailBox />
           <EnterPasswordBox />
           <ConfirmPasswordBox />
           <SignUpButton />
        </View>
      );
    }
}

export default SignupPage