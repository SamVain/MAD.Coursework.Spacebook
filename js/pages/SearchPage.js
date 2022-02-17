import React, { Component } from 'react'
import { SearchBar } from "react-native-elements";
import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import SearchPageSearchBar from "../components/searchPageComponents/SearchPageSearchBar";
import AccountPage from './AccountPage';
import AsyncStorge from '@react-native-async-storage/async-storage';

class SearchPage extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          UserData: [],
          userId: 0,
          firstName: '',
          lastName: '',
          email:'',
          search:'',
      };
    }

    //get user details of search query
    getuser = () => {
      return fetch('http://10.0.2.2:3333/api/1.0.0/search?q=' + this.state.search + '&search_in=all&limit=20&offset=0')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          'Content-Type': 'application/json',
          UserData: responseJson,
          'X-Authorization': token,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
    componentDidMount(){
        this.getuser();
    }

    saveId = async(userID) => {
        try{
            await AsyncStorage.setItem('UserID', JSON.stringify(userID));
            console.log(JSON.stringify(userID));      
        } catch(error) {
            console.log(error);
        }
    }
    
    render() {
        return(
            <div>

              <SearchBar
                platform='android'
                round
                searchIcon={() => {true;} }
                placeholder="Search"
                value={this.state.search}
                onChangeText={(search) => this.setState({ search })}
              />
              
              <Button
                accessible={true}
                title="Search"
                onPress={() =>{
                  this.getuser()
                  console.log("pressed")
                }}
                />

                <FlatList>
                  data={this.state.UserData}
                  renderItem={({ item, index }) =>
                    <TouchableOpacity>
                      style={styles.button}
                      onPress={() => {
                        this.props.navigation.navigate('AccountPage'),
                        this.saveId(item.user_id);
                      }}
                    </TouchableOpacity>
                  }
                </FlatList>
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

export default SearchPage