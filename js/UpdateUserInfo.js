import React, {Component} from 'react';
import {View, TextInput, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpacebookHeader from './components/SpacebookHeader'

class UpdateUserInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password:'',
        };
    }

    componentDidMount() {
      this.getInfo();
    }

    //This function will pre-populate the User Details fields with the existing details

    getInfo = async () => {
        const userToken = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@id')
        return fetch('http://localhost:3333/api/1.0.0/user' + userID, {
            headers: {
                'content-Type': 'application/json',
                'X-Authorization': userToken
            },
        })
        .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 400) {
              throw 'Bad Request!';
            } else if (response.status === 401) {
              throw 'Not logged in, please login again!';
            } else if (response.status === 403) {
              throw 'Forbidden!';
            } else if (response.status === 404) {
              throw 'Not Found!';
            } else if (response.status === 500) {
              throw 'Server Error!';
            } else {
              throw 'Error, please try again!';
            }
          })
          .then((responseJSON) => {
            this.setState({
              firstName: responseJSON.first_name,
              lastName: responseJSON.last_name,
              email: responseJSON.email,
            });
          })
          .catch((error) => {
            console.log(error);
          });
    };

    updateInfo = async () => {
        const userToken = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@id')
        let userDetails = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        };
        return fetch ('http://localhost:3333/api/1.0.0/user' + userID, {
          method: 'PATCH',
          headers: {
            'content-Type': 'application/json',
            'X-Authorization': userToken,
          },
          body: JSON.stringify(userDetails),
        })
        .then((response) => {
          if (response.status === 200) {
            ToastAndroid.show('Account Details Updated!');
            this.props.navigation.navigate('MyAccount');
          } else if (response.status === 400) {
            throw 'Invalid details, please try again!';
          } else if (response.status === 401) {
            throw 'Not logged in, please login again!';
          } else if (response.status === 403) {
            throw 'Forbidden!';
          } else if (response.status === 404) {
            throw 'Not Found!';
          } else if (response.status === 500) {
            throw 'Server Error!';
          } else {
            throw 'Error, please try again!';
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    render() {
      return (
        <View>
          <ScrollView>
            <SpacebookHeader />
            <TextInput 
              placeholder="First Name"
              style = {styles.input}
              onChangeText={(firstName) => this.setState({firstName})}
              value = {this.state.firstName}
            />
            <TextInput 
              placeholder="Last Name"
              style = {styles.input}
              onChangeText={(lastName) => this.setState({lastName})}
              value = {this.state.lastName}
            />
            <TextInput 
              placeholder="E-Mail"
              style = {styles.input}
              onChangeText={(email) => this.setState({email})}
              value = {this.state.email}
            />
            <TextInput 
              placeholder="Password"
              style = {styles.input}
              onChangeText={(password) => this.setState({password})}
              value = {this.state.password}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.updateInfo()}>
              <Text style={styles.buttonText}>Update Info</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
      );
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
   input: {
     fontSize: 20,
     color: '#0',
   }, 
});

export default UpdateUserInfo