import React, { Component } from 'react'
import { SearchBar, ListItem } from "react-native-elements";
import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, SafeAreaView, TouchableHighlight } from 'react-native'
import SearchPageSearchBar from "../components/searchPageComponents/SearchPageSearchBar";
import AccountPage from './AccountPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useNavigation } from '@react-navigation/native'

class SearchPage extends Component{
    
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



    getuser = async () => {
      
      await AsyncStorage.getItem('@session_token')
        .then(data => this.setState({token: data}))
        .catch(error => {
            console.log(error);
            return;
        });

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
  
    saveId = async(userID) => {
        try{
            await AsyncStorage.setItem('UserID', JSON.stringify(userID));
            console.log(JSON.stringify(userID));      
        } catch(error) {
            console.log(error);
        }
    }

    // renderItem2 = (item) => 
    //     <Item
    //       item={item}
    //       onPress={() => this.setState({selectedId: item.user_id})}
    //       backgroundColor={ item.user_id === this.state.selectedId ? "#6e3b6e" : "#f9c2ff" }
    //       textColor={ item.user_id === this.state.selectedId ? 'white' : 'black' }
    //     />


    renderItem = (item) => 
    <View style={styles.row}> 
      <Text style={styles.item}> {item.user_givenname} {item.user_familyname}</Text>
    </View>

    navigateAway = (to, userId) => {

      this.props.navigation.navigate(to, {userId: userId})

    }

    render() {

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
                console.log("pressed")
              
              }}
            />         

            <SafeAreaView style={styles.container}>
              <FlatList 
                data={this.state.UserData}
                renderItem={({item}) => 
                  <div>
                    <TouchableOpacity
                      //onPress={() => console.log("user was pressed")}
                      //onPress={() => this.setState({selectedId: item.user_id})}
                      onPress={() => this.navigateAway('Feed', item.user_id)}
                    >
                    <View style={styles.view}>
                      <Text style={ item.user_id === this.state.selectedId ? styles.text : styles.selected }>
                        {item.user_givenname} {item.user_familyname}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </div>
                }
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
       backgroundColor: "#888",
       paddingTop: 30
    },
    selected: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      color: "black",
      backgroundColor: "white",
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