import * as React from "react";
import { Header } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import SpacebookSearchBar from "./SpacebookSearchBar";

//import LinearGradient from 'react-native-linear-gradient';

function SpacebookHeader(){
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
        linearGradientProps={{}}
        placement="left"
        rightComponent={<SpacebookSearchBar/>}
        rightContainerStyle={{}}
        statusBarProps={{}}
      />
    </SafeAreaProvider>
  );
}

export default SpacebookHeader