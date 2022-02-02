import * as React from "react";
import { SearchBar } from "react-native-elements";

function SpacebookSearchBar() {
  const [value, setValue] = React.useState("");
  return (
    <SearchBar
      platform="android"
      containerStyle={{}}
      inputContainerStyle={{}}
      inputStyle={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      lightTheme
      loadingProps={{}}
      onChangeText={newVal => setValue(newVal)}
      onClearText={() => console.log(onClearText())}
      placeholder="Type query here..."
      placeholderTextColor="#888"
      round
      cancelButtonTitle="Cancel"
      cancelButtonProps={{}}
      onCancel={() => console.log(onCancel())}
      value={value}
      inputContainerStyle={{ height: 20 }}
    />
  );
}

export default SpacebookSearchBar






//inputContainerStyle={{ height: 20, width: 150 }}