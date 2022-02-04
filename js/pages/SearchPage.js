import React, { Component } from 'react'
import { SearchBar } from "react-native-elements";
import SpacebookHeader from "../components/SpacebookHeader";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SearchPageSearchBar from "../components/searchPageComponents/SearchPageSearchBar";

class SearchPage extends Component {
    render() {
        return (
            <View>
                <SpacebookHeader />
                <SearchPageSearchBar />
            </View>
        ); 
    }
}

export default SearchPage