import React, { Component } from 'react'
import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { withNavigationFocus } from "react-navigation";


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SpacebookPosts from '../components/homeComponents/SpacebookPosts'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

  getPosts = async () => {

    await AsyncStorage.getItem('@session_token')
        .then(data => this.setState({token: data}))
        .catch(error => {
            console.log(error);
            return;
        });

      return fetch('http://127.0.0.1:3333/api/1.0.0/user/' + this.state.userId + '/post', {
        method: 'GET',
        headers: {
          'X-Authorization': this.state.token, 
        }
      })
    .then((response) => 
  
      {
          
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
      }    

    
    )
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

    console.log("Rendering FeedPage");

    if (this.props.route.params !== undefined) {

      if (this.props.route.params.userId !== this.state.userId) {
      
        console.log(this.props.route.params.userId);
      
        this.state.userId = this.props.route.params.userId;

        this.getPosts();
      }
    }
 
    return (
      <View style={styles.container}>
        <Text>Feed Page!</Text>
        <Text>
          UserID 
          {this.state.userId}
            {/* {this.props.route.params.userId} */}
        </Text>
        <Text>
          You have {this.state.postData.length} posts!
        </Text>
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