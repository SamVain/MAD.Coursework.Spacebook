import * as React from "react";
import { SearchBar } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function SearchPageSearchBar() {
    const [value, setValue] = React.useState("");
    return (
        <SearchBar 
        platform="android"
        containerStyle={{}}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        loadingProps={{}}
        onChangeText={newVal => setValue(newVal)}
        onClearText={() => console.log(onClearText())}
        placeholder="Search"
        placeholderTextColor="#888"
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        onCancel={() => console.log(onCancel())}
        value={value}>
    </SearchBar> 
    );
}

export default SearchPageSearchBar