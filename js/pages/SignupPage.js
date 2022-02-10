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

   constructor(props){
      super(props);

      this.state = {
         firstName: '',
         lastName: '',
         email: '',
         password: '',
      };
   }

   register = () => {
      let userDetails = {
         first_name: this.state.firstName,
         last_name: this.state.lastName,
         email: this.state.email,
         password: this.state.password,
      };

      return fetch('http://localhost:3333/api/1.0.0/user', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(userDetails),
      })
      .then((response) => {
         if (response.status === 200) {
           return response.json();
         } else if (response.status === 400) {
           throw 'Fill in the form in full, please try again!';
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
       .then((responseJSON) => {
          console.log('User created with ID: ', responseJSON);
          this.props.navigation.navigate('Home');
       })
       .catch((error) => {
          console.log(error);
       });
   }

   render() {
      return (
         <View style={styles.container}>
            <TextInput 
               placeholder="First Name"
               style={styles.input}
               onChangeText={(firstName) => this.setState({firstName})}
               value={this.state.first_name}
            />
            <TextInput 
               placeholder="Last Name"
               style={styles.input}
               onChangeText={(lastName) => this.setState({lastName})}
               value={this.state.last_name}
            />
            <TextInput 
               placeholder="Email"
               style={styles.input}
               onChangeText={(email) => this.setState({email})}
               value={this.state.email}
            />
            <TextInput 
               placeholder="Password"
               style={styles.input}
               onChangeText={(password) => this.setState({password})}
               value={this.state.password}
               secureTextEntry={true}
            />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.register()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'top',
      paddingTop: 20,
      borderWidth: 0,
      borderColor: 'black'
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
    input: {
      fontSize: 20,
      color: '#0',
    }, 
});

export default SignupPage