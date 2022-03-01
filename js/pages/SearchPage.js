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

  getUserId = async () => {

    await AsyncStorage.getItem('@id')
      .then(data => this.setState({userId: JSON.parse(data)}))
      .catch(error => {
          console.log(error);
          return;
      });

  }

  componentDidMount() {

    console.log('FlatListItem: componentDidMount');

    this.getUserId();
    
  }

  navigateAway = (to, userId) => {

    this.props.navigation.navigate(to, {userId: userId})
    //this.props
    console.log('navigateAway');

  }

  render() {

    if (this.props.item.user_id !== this.state.userId) {
    
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
          <TouchableOpacity style={styles.button} onPress={() => console.log("Button Pressed!!")}>
            <Text style={styles.buttonText}>Add Frend</Text>
          </TouchableOpacity> 
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
          selectedId: 0
      };
    }


    getUserId = async () => {

      await AsyncStorage.getItem('@id')
        .then(data => this.setState({userId: data}))
        .catch(error => {
            console.log(error);
            return;
        });

    }

    getToken = async () => {

      await AsyncStorage.getItem('@session_token')
        .then(data => this.setState({token: data}))
        .catch(error => {
            console.log(error);
            return;
        });

    }


    componentDidMount() {
 
      console.log('SearchPage: componentDidMount');

      this.getUserId();

      this.getToken();

    }


    getuser = async () => {
      
        var url = '';

        if (this.state.searchTerm.length > 0) {
          url = 'http://127.0.0.1:3333/api/1.0.0/search?q=' + this.state.searchTerm + '&search_in=all&limit=10&offset=0'
        }
        else {
          url = 'http://127.0.0.1:3333/api/1.0.0/search?search_in=all&limit=10&offset=0'
        }

        return fetch(url, {
        method: 'GET',
        headers: {
          'X-Authorization': this.state.token,
        },
      })           
      .then(

        response => response.json()
      )
      .then(responseJson => 

        this.setState({UserData: responseJson})
      )
      .catch(error => 

        console.log(error)
      );
    }

    renderItem = (item) =>
    <div>
      <FlatListItem item={item} navigation={this.props.navigation}/>
    </div>
    
    render() {

      console.log("Rendering SearchPage");

        return(
          <div>
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

                this.getuser()
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