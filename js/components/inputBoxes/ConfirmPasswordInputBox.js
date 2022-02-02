import * as React from "react";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function ConfirmPasswordBox() {
  return (
    <Input
      containerStyle={{}}
      disabledInputStyle={{ background: "#4267B2" }}
      inputContainerStyle={{}}
      errorMessage="Your Passwords Do Not Match"
      errorStyle={{}}
      errorProps={{}}
      inputStyle={{}}
      labelStyle={{}}
      labelProps={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      placeholder="Confirm Password"
    />
  );
}

export default ConfirmPasswordBox