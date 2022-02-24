import React, { Component } from 'react'
import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { LinearGradient } from 'expo-linear-gradient';
import SpacebookPosts from '../components/homeComponents/SpacebookPosts'


class FeedPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      postData: [],

      post_id: 0,
      timestamp: 0,
      post_content: '',
      user: Object,
      userId: 0,
      given_name: '',
      family_name: '',
      email: '', 
      token: ''
      }
  }
  //get all the spacebook posts

  getposts() {
    return fetch('http://127.0.0.1:3333/api/1.0.0/user/' + this.state.userId + '/post', {
      method: 'GET',
      headers: {
        'X-Authorization': this.state.token, 
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ 
        postData: responseJson,
      });
    })
    .catch((error) => 
      console.log(error)
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Feed Page!</Text>
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

export default FeedPage



/* 
function HomePage({ navigation })
 */