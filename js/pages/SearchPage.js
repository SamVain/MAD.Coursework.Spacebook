import React, { Component } from 'react'
import { SearchBar } from "react-native-elements";
import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

//import SpacebookHeader from "../components/SpacebookHeader";
//import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SearchPageSearchBar from "../components/searchPageComponents/SearchPageSearchBar";

class SearchPage extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <View>
                <SearchPageSearchBar />
            </View>
        )
    }
}

export default SearchPage

/* 
function SearchPage({ navigation }) {

        return (
            <View>
                <SearchPageSearchBar />
            </View>
        ); 

 */


/*         return (
            <View>
                <SpacebookHeader navigation={navigation}/>
                <SearchPageSearchBar />
            </View>
        );  */


