import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, SafeAreaView, FlatList } from 'react-native'
import SpacebookAvatar from '../components/AccountPageComponents/SpacebookAvatar'
import AsyncStorage from '@react-native-async-storage/async-storage';

class AccountPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      firstName: '',
      lastName: '',
      email: '',
      token: '',
      userId: 0, //props.navigation.userId
      postValue: '',
      messageToPost: ''
    };
  }

  //get all the spacebook posts
  getUserId = async () => {
    await AsyncStorage.getItem('@id')
      .then(data => this.setState({userId: data}))
      .catch(error => console.log(error));
  }

  getToken = async () => {
    await AsyncStorage.getItem('@session_token')
      .then (data => this.setState({token: data}))
      .catch(error => console.log(error));
  }

  async componentDidMount() {

    await this.getUserId();
    await this.getToken();
    await this.getInfo();
  }

  setLoggedIn = (value) => {
    this.props.setLoggedIn(value);
  } 

  logout = async () => {
    await AsyncStorage.getItem('@session_token')
        .then(data => this.setState({token: data}))
        .catch(error => console.log(error));
    return fetch('http://localhost:3333/api/1.0.0/logout', {
        method: 'POST',
        headers: {'X-Authorization': this.state.token},
    })
    .then(async (response) => {
        if (response.status === 200) {
          await AsyncStorage.removeItem('@session_token')
              .then(data => this.setLoggedIn(false))
              .catch(error => console.log(error));
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 500) {
          throw 'Server Error!';
        } else {
          throw 'Please try again!';
        }
      })
    .catch(error => console.log(error))
  };

  getInfo = async () => {
    var url = 'http://localhost:3333/api/1.0.0/user/' + this.state.userId
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        throw 'Unauthorised';
      } else if (response.status === 404) {
        throw 'Not found!';
      } else if (response.status === 500) {
        throw 'Server error!';
      } else {
        throw 'Error, please try again!';
      }
    })
    .then((responseJSON) => {
      this.setState({
        loading: false,
        firstName: responseJSON.first_name,
        lastName: responseJSON.last_name,
        email: responseJSON.email,
      });
    })
    .catch(error => console.log(error));
  };

  getfriends() {
    var url = '';
    if (this.props.route.params.userId === null) {
      url = 'http://localhost:3333/api/1.0.0/user/' + this.state.userId + '/friends'
    } else {
      url = 'http://localhost:3333/api/1.0.0/user/' + this.state.userId + '/friends'
    }
    return fetch(url, + '/friends', {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            isLoading: false,
            friends: responseJson,
        });
    })
    .catch(error => console.log(error))
  }

  makePost = (user_id) => {
    var url = 'http://localhost:3333/api/1.0.0/user/' + user_id + '/post'
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'X-Authorization': this.state.token 
      },
      body: JSON.stringify({
        "text": this.state.messageToPost
      })
    })
    .then((response) => {
      if (response.status === 201) {
        console.log('Created!');
      } else if (response.status === 401) {
        console.log('Unauthorised');
      } else if (response.status === 404) {
        console.log('Not Found')
      } else if (response.status === 500) {
        throw 'Server Error!';
      } else {
        throw 'Please try again!';
      }
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Name: {this.state.firstName} {this.state.lastName}</Text>
        <Text style={styles.label}>Email: {this.state.email}</Text>
        <Text style={styles.label}>List of Friends: {this.state.getfriends}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.logout()}>
              <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Friend Requests:</Text>
        <SafeAreaView style={styles.container}>
          <FlatList 
            data={this.state.listOfOutstandingFriendRequests}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={(item) => item.user_id}
          />
        </SafeAreaView>
        <TextInput 
          multiline={true}
          numberOfLines={3}
          placeholder="Post Something Here..."
          style={styles.multiline}
          ref= {(text) => { this.messageToPost = text; }}
          onChangeText={(messageToPost) => this.setState({messageToPost})}
          value={this.state.messageToPost}
        />
        <TouchableOpacity style={styles.button} onPress={() => {this.makePost(this.state.userId)}}>
          <Text style={styles.buttonText}>Post!</Text>
        </TouchableOpacity>
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
   multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    marginVertical: '1rem'
  }
});

export default AccountPage;