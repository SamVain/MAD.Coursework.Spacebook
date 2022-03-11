import React, { Component } from 'react'
import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, FlatList, Alert, Modal, Pressable, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ThemedDialog from 'react-native-elements/dist/dialog/Dialog';

class ShowPosts extends Component {
  constructor(props){
    super(props);
    this.state = {
      post_id: '',
      modalVisible: false,
      messageToPost: ''
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
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
      <View style={{flex: 1, flexDirection: 'row', paddingTop:10}}>
        <View style={{ justifyContent: 'flex-start'}}>
          <Text>Post ID : {this.props.item.post_id}</Text>
          <Text>Message : </Text>
          <Text ellipsizeMode='tail' numberOfLines={2} style={{width:200}}>
            {this.props.item.text}
          </Text>
          <Text>Likes : {this.props.item.numLikes}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
              {comp}
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={() => {
                this.setState({messageToPost: this.props.item.text});                
                this.setModalVisible(true);
                }}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View> 
            <View>
              <TouchableOpacity style={styles.button} onPress={() => this.props.deletePost(this.props.item.post_id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.centeredView}>
              <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => this.setModalVisible(false)}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TextInput 
                      multiline={true}
                      numberOfLines={5}
                      placeholder="Post Something Here..."
                      style={styles.multiline}
                      onChangeText={(x) => {   
                        this.setState({messageToPost: x});
                      }}
                      value={this.state.messageToPost}
                    />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{ justifyContent: 'flex-start'}}>
                        <TouchableOpacity 
                          style={styles.button} 
                          onPress={() => {
                            this.props.updatePost(this.props.item.post_id, this.state.messageToPost);
                            this.setModalVisible(false);
                            }}>
                          <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ justifyContent: 'flex-end'}}>
                      <TouchableOpacity 
                          style={styles.button} 
                          onPress={() => {this.setModalVisible(false);}}>
                          <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </View>
    );
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
      redraw: true,
      userImg: ''
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

  getPosts = () => {
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
    })
    .then(responseJson => this.setState({postData: responseJson}))
    .catch(error => console.log(error))
  }

  getImage = () => {

    return fetch('http://127.0.0.1:3333/api/1.0.0/user/' + this.props.userData.selectedUserId + '/photo', {
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

  updatePost = (post_id, msg) => {
    var url = 'http://127.0.0.1:3333/api/1.0.0/user/' + this.props.userData.selectedUserId + '/post/' + post_id
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json',
        'X-Authorization': this.state.token 
      },
      body: JSON.stringify({
        "text": msg
      })
    })
    .then((response) => {
      if (response.status === 200) {
        return 'OK!';
      } else if (response.status === 400) {
        console.log('Bad Request');
      } else if (response.status === 401) {
        console.log('Unauthorised');
      } else if (response.status === 403) {
        console.log('Forbidden')
      } else if (response.status === 404) {
        console.log('Not Found')
      } else if (response.status === 500) {
        throw 'Server Error!';
      } else {
        throw 'Please try again!';
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

  loadLoggedInUsersFeed = () => {
    this.props.selectedUserId(this.state.userId);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userData.selectedUserId !== this.props.userData.selectedUserId) {
      await this.getPosts();
      await this.getImage();
    }
  }

  async componentDidMount() {
    await this.getUserId();
    await this.getToken();
    this.getPosts();
    this.getImage();
  }

  renderItem = (item) =>
  <div>
  <ShowPosts
    item={item}
    likePost={this.likePost}
    deleteLike={this.deleteLike}
    deletePost={this.deletePost}
    updatePost={this.updatePost}
    /> 
  </div>
  
  render() {
    return (
      <div>

        <View style={styles.containerLeft}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={styles.button} onPress={() => this.loadLoggedInUsersFeed()}>
              <Text style={styles.buttonText}>My Feed</Text>
            </TouchableOpacity>
          </View>            
        </View>

        <View style={styles.container}>

          <View style={{flex: 1, flexDirection: 'row'}}>

            <View style={{flex: 1, flexDirection: 'column'}}>
              <View  style={{justifyContent: 'flex-start'}}>
                <Text style={styles.textTitle}>Feed Page!</Text>
              </View>
              <View  style={{ justifyContent: 'flex-start'}}>
                <Text style={styles.text}>Feed User ID: {this.props.userData.selectedUserId}</Text>
              </View> 
              <View  style={{ justifyContent: 'flex-start'}}>
                <Text style={styles.text}>You have {this.state.postData.length} posts!</Text>
              </View>                               
            </View>

            <View  style={{justifyContent: 'flex-start'}}>
              <Image 
                  style={{ width: 100, height: 100, resizeMode: 'contain', borderWidth: 1, borderColor:'black' }}
                  source={{uri:this.state.userImg}}
                />
            </View>

          </View>

        </View>

        <SafeAreaView style={styles.containerLeft}>
            <FlatList 
              data={this.state.postData}
              renderItem={({item}) => this.renderItem(item)}
              keyExtractor={(item) => item.post_id}
            />
        </SafeAreaView>

      </div>
    )
  }
}

const styles = StyleSheet.create ({

  containerLeft: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'Left',
    justifyContent: 'top',
    padding: 5,
    martgin: 5,
    borderWidth: 0,
    borderColor: 'black'
  },
  containerRight: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'Right',
    justifyContent: 'top',
    padding: 5,
    martgin: 5,
    borderWidth: 0,
    borderColor: 'black'
  },
  container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'top',
     padding: 5,
     borderWidth: 0,
     borderColor: 'black'
   },
   instructions: {
     color: '#888',
     fontSize: 18,
     marginHorizontal: 15,
     marginBottom: 10,
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
    padding: 2,
    margin:5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 10,
    marginVertical: '1rem'
  }
});

export default FeedPage