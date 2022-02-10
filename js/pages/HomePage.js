import React, { Component } from 'react'
import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { LinearGradient } from 'expo-linear-gradient';
import SpacebookPosts from '../components/homeComponents/SpacebookPosts'


class HomePage extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <View style={styles.container}>
        <Text>Bollox</Text>
        {/* <SpacebookPosts /> */}
      </View>
    )
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
});

export default HomePage



/* 
function HomePage({ navigation })
 */