import React, { Component } from 'react'
import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, FlatList,} from 'react-native'
import SpacebookPosts from '../components/homeComponents/SpacebookPosts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ThemedDialog from 'react-native-elements/dist/dialog/Dialog';


class ShowPosts extends Component {
  constructor(props){
    super(props);
    this.state = {
      post_id: ''
    }
  }

  render() {
    let comp;
    if (this.props.item.numLikes > 0) {

      comp =               
      <TouchableOpacity style={styles.button} onPress={() => {
          this.props.deleteLike(this.props.item.post_id);
        }
      }>
        <Text style={styles.buttonText}>Unlike</Text>
      </TouchableOpacity> 

    } else {

      comp =               
      <TouchableOpacity style={styles.button} onPress={() => {
          this.props.likePost(this.props.item.post_id)
        }
      }>
        <Text style={styles.buttonText}>Like</Text>
      </TouchableOpacity> 
    }




    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{ justifyContent: 'flex-start'}}>
          <Text>Post ID : {this.props.item.post_id}</Text>
          <Text>Message : {this.props.item.text}</Text>
          <Text>Likes   : {this.props.item.numLikes}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
              {comp}
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={() => this.props.updatePost(this.props.item.post_id)}>
              <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity> 
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={() => this.props.deletePost(this.props.item.post_id)}>
              <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity> 
            </View>
          </View>
        </View>
      </View>
    )
  }
}

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
      token: '',
      redraw: true
      }
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

  getPosts = async () => {
    this.setState({postData: []});
    return fetch('http://127.0.0.1:3333/api/1.0.0/user/' + this.props.userData.selectedUserId + '/post', {
      method: 'GET',
      headers: {'X-Authorization': this.state.token}
    })
    .then((response) => {
        if (response.status === 200) {
          return response.json();
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
      }
    )
    .then(responseJson => this.setState({postData: responseJson}))
    .catch(error => console.log(error))
  }

  //Delete A Post
  deletePost = (post_id) => {
    var url = 'http://127.0.0.1:3333/api/1.0.0/user/' + this.props.userData.selectedUserId + '/post/' + post_id
    return fetch(url, {
      method: 'DELETE',
      headers: {'X-Authorization': this.state.token}
    })
    .then((response) => {
      if (response.status === 200) {
        return 'OK!';
      } else if (response.status === 401) {
        throw 'Unauthorized';
      } else if (response.status === 403) {
        throw 'Forbidden - you can only delete your own posts';
      } else if (response.status === 404) {
        throw 'Not Found';
      } else if (response.status === 500) {
        throw 'Server Error'
      } 
    })
    .then((r) => {
      console.log(r);
      this.getPosts();
    })
    .catch(error => console.log(error))
  }

  //Like a post
  likePost = (post_id) => {
    var url = 'http://127.0.0.1:3333/api/1.0.0/user/' + this.props.userData.selectedUserId + '/post/' + post_id + '/like'
    return fetch (url, {
      method: 'POST',
      headers: { 'X-Authorization': this.state.token }
    })
    .then((response) => {
      
      if (response.status === 200) {
        return 'OK!';
      } else if (response.status === 401) {
        throw 'Unauthorized';
      } else if (response.status === 403) {
        throw 'Forbidden - you have already liked this post';
      } else if (response.status === 404) {
        throw 'Not Found';
      } else if (response.status === 500) {
        throw 'Server Error'
      } 

    })
    .then((r) => {
      console.log(r);
      this.getPosts();
    })
    .catch(error => console.log(error))
  }

  //Remove Like from Post
  deleteLike = (post_id) => {
    var url = 'http://127.0.0.1:3333/api/1.0.0/user/' + this.props.userData.selectedUserId + '/post/' + post_id + '/like'
    return fetch (url, {
      method: 'DELETE',
      headers: {
        'X-Authorization': this.state.token
      }
    })
    .then((response) => {
      
      if (response.status === 200) {
        return 'OK!';
      } else if (response.status === 401) {
        throw 'Unauthorized';
      } else if (response.status === 403) {
        throw 'Forbidden - you have already liked this post';
      } else if (response.status === 404) {
        throw 'Not Found';
      } else if (response.status === 500) {
        throw 'Server Error'
      } 

    })
    .then((r) => {
      console.log(r);
      this.getPosts();
    })
    .catch(error => console.log(error))
  }

  loadLoggedInUsersFeed = async () => {

    this.props.selectedUserId(this.state.userId);
  }

  async componentDidUpdate(prevProps) {
    console.log('FeedPage : componentDidUpdate : selectedUserId : ' + this.props.userData.selectedUserId);

    if (prevProps.userData.selectedUserId !== this.props.userData.selectedUserId) {

      await this.getPosts();
    }
  }

  async componentDidMount() {
    await this.getUserId();
    await this.getToken();
    await this.getPosts();
  }

  renderItem = (item) =>
  <div>
  <ShowPosts
    item={item}
    likePost={this.likePost}
    deleteLike={this.deleteLike}
    deletePost={this.deletePost}
    /> 
  </div>

  render() {
    return (
      <div>
        <Text>Current Logged in UserId = {this.state.userId}</Text>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.loadLoggedInUsersFeed()}>
            <Text>My Feed</Text>
          </TouchableOpacity>      
          <Text>Feed Page!</Text>
          <Text>
            Feed User ID: 
            {this.props.userData.selectedUserId}
          </Text>
          <Text>
            You have {this.state.postData.length} posts!
          </Text>
          <SafeAreaView style={styles.container}>
              <FlatList 
                data={this.state.postData}
                renderItem={({item}) => this.renderItem(item)}
                keyExtractor={(item) => item.post_id}
              />
            </SafeAreaView>
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
    padding: 2,
    margin:5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 10,
    color: '#fff',
  },
});

export default FeedPage