import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, SafeAreaView, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';


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
      messageToPost: '',
      userImg: '',
      listOfFriends: []
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

  uploadImage = async () => {

    return fetch('http://127.0.0.1:3333/api/1.0.0/user/' + this.props.userData.selectedUser.user_id  + '/photo', {
      method: 'POST',
      headers: {'X-Authorization': this.state.token}
    })
    .then((response) => {
      if (response.status === 200) {
        return response.blob();
      } else if (response.status === 401) {
        throw 'Unauthorised!';
      } else if (response.status === 403) {
        throw 'You Can Only View Posts of Yourself and Your Friends!';
      } else if (response.status === 404) {
        throw 'Not found!';
      } else if (response.status === 500) {
        throw 'Server error!';
      } else {
        throw 'Error, please try again!';
      }
    })
    .then(blob => this.setState({userImg: URL.createObjectURL(blob)}))
    .catch(error => console.log(error))
  }

  getImage = async () => {

    return fetch('http://127.0.0.1:3333/api/1.0.0/user/' + this.props.userData.selectedUserId  + '/photo', {
      method: 'GET',
      headers: {'X-Authorization': this.state.token}
    })
    .then((response) => {
      if (response.status === 200) {
        return response.blob();
      } else if (response.status === 401) {
        throw 'Unauthorised!';
      } else if (response.status === 403) {
        throw 'You Can Only View Posts of Yourself and Your Friends!';
      } else if (response.status === 404) {
        throw 'Not found!';
      } else if (response.status === 500) {
        throw 'Server error!';
      } else {
        throw 'Error, please try again!';
      }
    })
    .then(blob => this.setState({userImg: URL.createObjectURL(blob)}))
    .catch(error => console.log(error))
  }






  async componentDidMount() {

    await this.getUserId();
    await this.getToken();
    await this.getInfo();
    await this.getImage();
    await this.getListOfFriends();
    
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

  getListOfFriends =async () => {
    var url = 'http://127.0.0.1:3333/api/1.0.0/user/' + this.state.userId + '/friends'
    return fetch(url, {
      method: 'GET',
      headers: { 'X-Authorization': this.state.token },
    })           
    .then(response => response.json())
    .then(responseJson => this.setState({listOfFriends: responseJson}))
    .catch(error => console.log(error));
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

  changeImage = () => {

    alert('Not working');

  }

  renderItem = (item) =>
  <div>
    <Text style={styles.text}>{item.user_givenname} {item.user_familyname}</Text>
  </div>

  
  render() {
    return (

      <div>

        <View style={styles.container}>

          <View style={{justifyContent: 'flex-start'}}>
            <Image 
              style={{ width: 100, height: 100, resizeMode: 'contain', borderWidth: 1, borderColor:'black' }} 
              source={{uri:this.state.userImg}}/>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => {this.changeImage()}}>
            <Text style={styles.buttonText}>Change Image</Text>
          </TouchableOpacity>

        </View>


        <View style={styles.container}>

          <Text style={styles.label}>Name: {this.state.firstName} {this.state.lastName}</Text>
          <Text style={styles.label}>Email: {this.state.email}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.logout()}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>

        </View>


        <View style={styles.container}>
          <Text style={styles.textTitle}>Friends</Text>
          <SafeAreaView style={styles.container}>
            <FlatList 
              data={this.state.listOfFriends}
              renderItem={({item}) => this.renderItem(item)}
              keyExtractor={(item) => item.user_id}
            />
          </SafeAreaView>

        </View>

        <View style={styles.container}>

          <TextInput 
            multiline={true}
            numberOfLines={3}
            placeholder="Post Something Here..."
            style={styles.multiline}
            ref= {(text) => { this.messageToPost = text; }}
            onChangeText={(messageToPost) => this.setState({messageToPost})}
            value={this.state.messageToPost}/>
          <TouchableOpacity style={styles.button} onPress={() => {this.makePost(this.state.userId)}}>
            <Text style={styles.buttonText}>Post!</Text>
          </TouchableOpacity>   

        </View>


      </div>

    )
  }
}

const styles = StyleSheet.create ({
  container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'top',
     borderWidth: 0,
     borderColor: 'black',
     padding: 5,
     margin: 5,
   },
   instructions: {
     color: '#888',
     fontSize: 18,
   },
   textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#4267B2",
    padding: 5
 },
  text: {
     fontSize: 15,
     fontWeight: 'normal',
     textAlign: 'center',
     color: "#4267B2",
     paddingTop: 5
  },
  button: {
     backgroundColor: "#4267B2",
     margin: 5,
     padding: 5,
     borderRadius: 5,
   },
   buttonText: {
     fontSize: 15,
     color: '#fff',
   },
   multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 5,
    margin: 5,
  }
});

export default AccountPage;