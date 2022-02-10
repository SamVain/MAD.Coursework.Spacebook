import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native';
import AsyncStorge from '@react-native-async-storage/async-storage';
import LoginPage from './pages/LoginPage';

class Logout extends Component {

    constructor(props){
        super(props);

        this.state = {
            token: '',
        };
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
                'Content-Type': 'application/json',
                'X-Authorisation': this.state.token,
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoutContainer} >
                    <View style={styles.space} />
                    <Text style={styles.title}>Are you sure you want to logout?</Text>
                    <View style={styles.space} />
                    <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                    <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <TouchableOpacity
                        style={styles.button}
                        <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
       paddingTop: 20
     },
     logoutContainer: {
        top: 247,
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
     space: {
        width: 10,
        height: 10,
      },
  })

export default Logout;