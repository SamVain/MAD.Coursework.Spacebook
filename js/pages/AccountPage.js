import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

//import SpacebookHeader from '../components/SpacebookHeader'
import SpacebookAvatar from '../components/AccountPageComponents/SpacebookAvatar'

class AccountPage extends Component{
  constructor(props){
    super(props);
  }

  setLoggedIn = (value) => {
    this.props.setLoggedIn(value);
 }


  render(){
    return(
      <View>
        <SpacebookAvatar />
        <TouchableOpacity onPress={() => this.setLoggedIn(false)} style={styles.button}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    ) 
  }
}

const styles = StyleSheet.create({
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

export default AccountPage


/* 
function AccountPage({ navigation }) {

    return (
        <View>
            <SpacebookAvatar />
            <TouchableOpacity onPress={() => alert('TAKE ME HOOOMMMEEE YANITED ROAD')} style={styles.button}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    ); 

} */