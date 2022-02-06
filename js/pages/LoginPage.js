
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EnterEmailBox from '../components/inputBoxes/EmailInputBox'
import EnterPasswordBox from '../components/inputBoxes/PasswordInputBox';
import SignInButton from '../components/buttons/SignInButton';
import Title from '../components/misc/LoginSigninTitle';
//import GoToSignUpButton from '../components/buttons/GoToSignUpButton';

/*
This class currently renders three componets to the screen. Two text boxes that accept an
e-mail and password and an enter button. When the enter button is pressed, the e-mail
and password is displayed in a chrome drop-down message. The CSS put in here also makes
the log in page have facebook colour's. The CSS will need its own file and then importing
into here. Best Practice :)
*/

function LoginPage({ navigation }) {

         return (
            <View style={styles.container}>
               <Title />
               <EnterEmailBox />
               <EnterPasswordBox />
               <SignInButton />
               <Text style={ styles.text }>
                  Not Got An Account? Sign Up Above!
               </Text>
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


export default LoginPage