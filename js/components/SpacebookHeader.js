import * as React from "react";
import { Header } from "react-native-elements";
import { StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import SpacebookSearchBar from "./SpacebookSearchBar";
//import HeaderButtonGroup from "./SpacebookHeaderButtonGroup";
//import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';


const styles = StyleSheet.create({ 
  background: {
      flex: 1,
      backgroundColor: 'red'
    },

});


function SpacebookHeader({navigation}){
  return (
    <SafeAreaProvider>
      <Header
        backgroundColor="#fff"
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: "Spacebook",
          style: { color: "#4267B2", fontWeight: "bold", fontSize: 25 }
        }}
        centerContainerStyle={{ }}
        //containerStyle={{ paddingHorizontal: 0 }}
        leftContainerStyle={{}}
        //ViewComponent={require('react-native-linear-gradient').default}
        placement="left"
        rightComponent={{}}
        rightContainerStyle={{}}
        statusBarProps={{}}
      />
{/*       <HeaderButtonGroup navigation={navigation}/> */}

    </SafeAreaProvider>
  );
}

export default SpacebookHeader