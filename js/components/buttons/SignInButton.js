import React, {Component, useState} from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, ButtonGroup, withTheme, Text } from 'react-native-elements';

//import LinearGradient from "react-native-linear-gradient";
  class SignInButton extends Component {

    constructor(props){
        super(props);
 
        this.state = {
            email: '',
            password: '',
            token: '',
        };
    }

    render(){
      return (
        <View style={styles.container}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => this.props.login()}
              >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
      );
  }
}

const styles = StyleSheet.create({
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

export default SignInButton