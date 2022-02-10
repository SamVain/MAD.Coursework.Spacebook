import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import SpacebookAvatar from '../components/AccountPageComponents/SpacebookAvatar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


class AccountPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      firstName: '',
      lastName: '',
      email: '',
      token: '',
      userId: 0
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  setLoggedIn = (value) => {
    this.props.setLoggedIn(value);
  } 

  logout = async () => {
    await AsyncStorage.getItem('@session_token')
        .then(data => this.setState({token: data}))
        .catch(error => {
            console.log(error);
            return;
        });

    return fetch('http://localhost:3333/api/1.0.0/logout', {
        method: 'POST',
        headers: {
            'X-Authorization': this.state.token,
        },
    })

    .then(async (response) => {
        if (response.status === 200) {
          await AsyncStorage.removeItem('@session_token')
              .then(data => this.setLoggedIn(false))
              .catch(error => {
                  console.log(error);
                  return;
              });
        } else if (response.status === 400) {
          throw 'Bad request!';
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else if (response.status === 403) {
          throw 'Forbidden!';
        } else if (response.status === 404) {
          throw 'Not found!';
        } else if (response.status === 500) {
          throw 'Server Error!';
        } else {
          throw 'Please try again!';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getInfo = async () => {
    await AsyncStorage.getItem('@session_token')
        .then(data => this.setState({token: data}))
        .catch(error => {
            console.log(error);
            return;
        });

    await AsyncStorage.getItem('@id')
        .then(data => this.setState({userId: data}))
        .catch(error => {
            console.log(error);
            return;
        });

    return fetch('http://localhost:3333/api/1.0.0/user/' + this.state.userId, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token
      },

    }).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Bad Request!';
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
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
        this.setState({
          loading: false,
          firstName: responseJSON.first_name,
          lastName: responseJSON.last_name,
          email: responseJSON.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
       return (
          <View style={styles.container}>
            <Text style={styles.title}>Account Details</Text>
            <Text style={styles.label}>Name: {this.state.firstName} {this.state.lastName}</Text>
            <Text style={styles.label}>Email: {this.state.email}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.logout()}>
                  <Text style={styles.buttonText}>Log Out</Text>
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
});

export default AccountPage