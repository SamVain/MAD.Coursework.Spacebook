import * as React from "react";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function EnterFirstNameBox() {
  return (
    <Input
      containerStyle={{}}
      disabledInputStyle={{ background: "#4267B2" }}
      inputContainerStyle={{}}
      errorMessage="Please Enter a Valid First Name"
      errorStyle={{}}
      errorProps={{}}
      inputStyle={{}}
      labelStyle={{}}
      labelProps={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      placeholder="First Name"
    />
  );
}

export default EnterFirstNameBox