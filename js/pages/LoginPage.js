
import React, { Component, useState, useContext } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EnterEmailBox from '../components/inputBoxes/EmailInputBox'
import EnterPasswordBox from '../components/inputBoxes/PasswordInputBox';
import SignInButton from '../components/buttons/SignInButton';
import Title from '../components/misc/LoginSigninTitle';
import HomePage from './HomePage';

import AsyncStorge from '@react-native-async-storage/async-storage';

/*
This class currently renders three componets to the screen. Two text boxes that accept an
e-mail and password and an enter button. When the enter button is pressed, the e-mail
and password is displayed in a chrome drop-down message. The CSS put in here also makes
the log in page have facebook colour's. The CSS will need its own file and then importing
into here. Best Practice :)
*/



class LoginPage extends Component {

   constructor(props){
       super(props);

       this.state = {
           email: '',
           password: '',
           token: '',
       };
   }

   setLoggedIn = (value) => {
      this.props.setLoggedIn(value);
   }

   handleEmailInput = (value) => this.setState({email:value});
   handlePasswordInput = (value) => this.setState({password:value});

   login = async () => {

      return fetch('http://localhost:3333/api/1.0.0/login', {
         method: 'POST',
         headers: {
            'Content-Type' : 'application/json',
         },
         body: JSON.stringify({
            "email": this.state.email,
            "password": this.state.password
          }),
      })
      .then((response) => {
         
         if (response.status === 200) {
            return response.json();
         } else if (response.status === 400) {
            throw 'Invalid email or password, please try again!';
         } else if (response.status === 401) {
            throw 'Unauthorised!';
          } else if (response.status === 403) {
            throw 'Forbidden!';
          } else if (response.status === 404) {
            throw 'Not found!';
          } else if (response.status === 500) {
            throw 'Server error!';
          } else {
            throw 'Error, please try again!';
          }
      })
      .then(async (responseJSON) => {

         console.log("id : " + responseJSON.id);
         console.log("token : " + responseJSON.token);

         await AsyncStorge.setItem('@session_token', responseJSON.token);
         await AsyncStorge.setItem('@id', JSON.stringify(responseJSON.id));

         
         this.setLoggedIn(true);
         //this.props.navigation.navigate('Home');

      })
      .catch((error) => {

         console.log(error);
      });

   } 

   render() {

      return (
         <>
            <View style={styles.container}>
               <Title />
               <TextInput 
                  placeholder="E-Mail"
                  onChangeText={this.handleEmailInput}
               />
               <TextInput 
                  placeholder="Password"
                  onChangeText={this.handlePasswordInput}
                  secureTextEntry={true}
               />
               <SignInButton login={this.login}/>
               <Text style={ styles.text }>
                  Not Got An Account? Sign Up Above!
               </Text>
            </View>
         </>
      );

   }
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




/* 

function LoginPage() {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [token, setToken] = useState('');

   const { signIn } = useContext(AuthContext);

   const handleEmailInput = (email) => setEmail(email);
   const handlePasswordInput = (password) => setPassword(password);

   const login = async () => {

      return fetch('http://localhost:3333/api/1.0.0/login', {
         method: 'POST',
         headers: {
            'Content-Type' : 'application/json',
         },
         body: JSON.stringify({
            "email": email,
            "password": password
          }),
      })
      .then((response) => {
         
         if (response.status === 200) {
            return response.json();
         } else if (response.status === 400) {
            throw 'Invalid email or password, please try again!';
         } else if (response.status === 401) {
            throw 'Unauthorised!';
          } else if (response.status === 403) {
            throw 'Forbidden!';
          } else if (response.status === 404) {
            throw 'Not found!';
          } else if (response.status === 500) {
            throw 'Server error!';
          } else {
            throw 'Error, please try again!';
          }
      })
      .then(async (responseJSON) => {

         console.log("id : " + responseJSON.id);
         console.log("token : " + responseJSON.token);

         await AsyncStorge.setItem('@session_token', responseJSON.token);
         await AsyncStorge.setItem('@id', JSON.stringify(responseJSON.id));

         //navigation.navigate('HomePage');

      })
      .catch((error) => {

         console.log(error);
      });
   
   }



   return (
      <View style={styles.container}>
         <Title />
         <TextInput 
            placeholder="E-Mail"
            onChangeText={handleEmailInput}
         />
         <TextInput 
            placeholder="Password"
            onChangeText={handlePasswordInput}
            secureTextEntry={true}
         />
         <SignInButton login={login}/>
         <Text style={ styles.text }>
            Not Got An Account? Sign Up Above!
         </Text>
      </View>
   );
}

 */