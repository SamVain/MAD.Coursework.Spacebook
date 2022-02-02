import * as React from "react";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function EnterEmailBox() {
  return (
    <Input
      containerStyle={{}}
      disabledInputStyle={{ background: "#4267B2" }}
      inputContainerStyle={{}}
      errorMessage="Please Enter A Valid E-Mail"
      errorStyle={{}}
      errorProps={{}}
      inputStyle={{}}
      labelStyle={{}}
      labelProps={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      placeholder="E-Mail"
    />
  );
}

export default EnterEmailBox