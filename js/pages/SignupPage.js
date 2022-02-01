import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class SignupPage extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }
    handleFirstName = (text) => {
        this.setState({ firstName: text })
    }
    handleLastName = (text) => {
        this.setState({ lastName: text })
    }
    handleEmail = (text) => {
       this.setState({ email: text })
    }
    handlePassword = (text) => {
       this.setState({ password: text })
    }
    login = (firstName, lastName, email, pass) => {
       alert('First Name: ' + firstName + ' Last Name: ' + lastName + ' email: ' + email + ' password: ' + pass)
    }
    render() {
       return (
          <View style = {styles.container}>

             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "First Name"
                placeholderTextColor = "#4267B2"
                autoCapitalize = "none"
                onChangeText = {this.handleFirstName}/>

            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Last Name"
                placeholderTextColor = "#4267B2"
                autoCapitalize = "none"
                onChangeText = {this.handleLastName}/>

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
                   () => this.login(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
                }>
                <Text style = {styles.submitButtonText}> Submit </Text>
             </TouchableOpacity>
          </View>
       )
    }
  }
  export default SignupPage
  
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