import React, { Component } from 'react'
import { SearchBar, ListItem } from "react-native-elements";
import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, SafeAreaView, TouchableHighlight } from 'react-native'
import SearchPageSearchBar from "../components/searchPageComponents/SearchPageSearchBar";
import AsyncStorage from '@react-native-async-storage/async-storage';

class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
    };
  }

  navigateAway = (to, userId) => {
    this.props.props.selectedUserId(userId);
    this.props.props.navigation.navigate(to);
  }

  checkForFriendRequest = () => {
    const found = this.props.state.listOfFriendRequests.find (
      element => (element.user_id == this.props.item.user_id) 
    )
    if (found === undefined) {
      return false;
    } else {
      return true;
    }
  }

  checkForFriend = () => {
    const found = this.props.state.listOfFriends.find (
      element => (element.user_id == this.props.item.user_id) 
    )
    if (found === undefined) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    let comp;
    if(this.checkForFriendRequest()) {
      comp = 
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{ justifyContent: 'flex-start'}}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.acceptFriend(this.props.item.user_id)}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'flex-end'}}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.rejectFriend(this.props.item.user_id)}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    } else if(this.checkForFriend()) {
      comp = <Text>Friend</Text>
    } else {
      comp = 
      <TouchableOpacity style={styles.button} onPress={() => this.props.addFriend(this.props.item.user_id)}>
        <Text style={styles.buttonText}>Add Frend</Text>
      </TouchableOpacity>
    }   

    if (this.props.item.user_id != this.props.state.userId) {
      return(
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{ justifyContent: 'flex-start'}}>
            <TouchableOpacity onPress={() => this.navigateAway('Feed', this.props.item.user_id)}>
              <Text style={this.props.item.user_id === this.state.selectedId ? styles.buttonText : styles.selected }>
                <Text style={styles.text}>{this.props.item.user_givenname} {this.props.item.user_familyname}</Text>
              </Text>   
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'flex-end'}}>
            {
              comp
            }
          </View>
        </View>
      );
    } else {
      return(
        <></>
      );
    }
  }
}

class SearchPage extends Component {

  constructor(props) {
      super(props);
      this.state = {
        UserData: {},
        userId: 0,
        firstName: '',
        lastName: '',
        email:'',
        searchTerm:'',
        token: '',
        selectedId: 0,
        listOfFriends: {},
        listOfFriendRequests: {},
    };
  }

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

  getFriendRequests = async () => {
    var url = 'http://127.0.0.1:3333/api/1.0.0/friendrequests'
    return fetch(url, {
        method: 'GET',
        headers: { 'X-Authorization': this.state.token },
      })           
    .then (response => response.json())
    .then(responseJson => this.setState({listOfFriendRequests: responseJson}))
    .catch(error => console.log(error));
  }    
  
  addFriend = (user_id) => {
    var url = 'http://127.0.0.1:3333/api/1.0.0/user/' + user_id + '/friends'
    return fetch(url, {
      method: 'POST',
      headers: { 'X-Authorization': this.state.token },
    })           
    .then((response) => {
        if (response.status === 200) {
          console.log('OK!');
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 403) {
          throw 'User is already a friend';
        } else if (response.status === 404) {
          throw 'Not found!';
        } else if (response.status === 500) {
          throw 'Server Error!';
        } else {
          throw 'Please try again!';
        }
      }
    )
    .catch(error => console.log(error));
  } 

  acceptFriend = async (user_id) => {
    var url = 'http://127.0.0.1:3333/api/1.0.0/friendrequests/' + user_id
    return fetch(url, {
      method: 'POST',
      headers: { 'X-Authorization': this.state.token },
    })           
    .catch(error => console.log(error));
  }

  rejectFriend = async (user_id) => {
    var url = 'http://127.0.0.1:3333/api/1.0.0/friendrequests/' + user_id
    return fetch(url, {
      method: 'DELETE',
      headers: { 'X-Authorization': this.state.token },
    })         
    .catch(error => console.log(error));
  }

  search = async () => {
    var url = '';
    if (this.state.searchTerm.length > 0) {
      url = 'http://127.0.0.1:3333/api/1.0.0/search?q=' + this.state.searchTerm + '&search_in=all&limit=10&offset=0'
    } else {
      url = 'http://127.0.0.1:3333/api/1.0.0/search?search_in=all&limit=10&offset=0'
    }
    return fetch(url, {
        method: 'GET',
        headers: { 'X-Authorization': this.state.token },
    })           
    .then(response => response.json())
    .then(responseJson => this.setState({UserData: responseJson}))
    .catch(error => console.log(error))
  }

  async componentDidMount() {
    await this.getUserId();
    await this.getToken();
    await this.getListOfFriends();
    await this.getFriendRequests();
  }

  componentDidUpdate(prevProps) {
    //console.log('SearchPage : componentDidUpdate : selectedUserId : ' + this.props.userData.selectedUserId);
    const {selectedUserId} = this.props.userData.selectedUserId;
    if (prevProps.text !== this.props.text) {
      this.updateAndNotify();
    }
  }

  renderItem = (item) =>
  <div>
    <FlatListItem
      props={this.props} 
      item={item} 
      state={this.state} 
      addFriend={this.addFriend} 
      acceptFriend={this.acceptFriend} 
      rejectFriend={this.rejectFriend}/>
  </div>
  
  render() {
    return(
      <div>
        <Text>Current UserId = {this.state.userId}</Text>
        <SearchBar
          platform='android'
          round
          searchIcon={() => {true;} }
          placeholder="Search"
          value={this.state.searchTerm}
          onChangeText={(search) => this.setState({ searchTerm: search })}
        />
        <Button
          accessible={true}
          title="Search"
          onPress={() => {

            this.search()
          }}
        />         
        <SafeAreaView style={styles.container}>
          <FlatList 
            data={this.state.UserData}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={(item) => item.user_id}
          />
        </SafeAreaView>
      </div>
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
       color: "black", 
    },
    selected: {
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      color: "black",
      backgroundColor: "white",
   },
    button: {
       backgroundColor: "#4267B2",
       padding: 2,
       margin:5,
       borderRadius: 5,
     },
     buttonText: {
       fontSize: 10,
       color: '#fff',
     },
     item: {
      backgroundColor: '#fff',
      borderColor: '#black',
      borderWidth: 1,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
  });

export default SearchPage