
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import EnterEmailBox from '../components/inputBoxes/EmailInputBox'
import EnterPasswordBox from '../components/inputBoxes/PasswordInputBox';
import SignInButton from '../components/buttons/SignInButton';


/*
This class currently renders three componets to the screen. Two text boxes that accept an
e-mail and password and an enter button. When the enter button is pressed, the e-mail
and password is displayed in a chrome drop-down message. The CSS put in here also makes
the log in page have facebook colour's. The CSS will need its own file and then importing
into here. Best Practice :)
*/



class LoginPage extends Component {
   render(){
      return (
        <View>
           <EnterEmailBox />
           <EnterPasswordBox />
           <SignInButton />
        </View>
      );
    }
}

export default LoginPage



/*class LoginPage extends Component {
    state = {
       email: '',
       password: ''
    }
    handleEmail = (text) => {
       this.setState({ email: text })
    }
    handlePassword = (text) => {
       this.setState({ password: text })
    }
    login = (email, pass) => {
       alert('email: ' + email + ' password: ' + pass)
    }
    render() {
       return (
          <View style = {styles.container}>
             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                placeholderTextColor = "#4267B2"
                autoCapitalize = "none"
                onChangeText = {this.handleEmail}/>
             
             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Password"
                placeholderTextColor = "#4267B2"
                autoCapitalize = "none"
                onChangeText = {this.handlePassword}/>
             
             <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                   () => this.login(this.state.email, this.state.password)
                }>
                <Text style = {styles.submitButtonText}> Submit </Text>
             </TouchableOpacity>
          </View>
       )
    }
  }
  export default LoginPage
  
  const styles = StyleSheet.create({
    container: {
       paddingTop: 23
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#4267B2',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#4267B2',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    }
  })
*/
  