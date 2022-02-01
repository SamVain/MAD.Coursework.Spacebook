import * as React from "react";
import { SearchBar } from "react-native-elements";

function SpacebookSearchBar() {
  const [value, setValue] = React.useState("");
  return (
    <SearchBar
      platform="default"
      containerStyle={{}}
      inputContainerStyle={{}}
      inputStyle={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      lightTheme
      loadingProps={{}}
      onChangeText={newVal => setValue(newVal)}
      onClearText={() => console.log(onClearText())}
      placeholder="Search..."
      placeholderTextColor="#888"
      cancelButtonTitle="Cancel"
      cancelButtonProps={{}}
      onCancel={() => console.log(onCancel())}
      value={value}
      inputContainerStyle={{ height: 20, width: 150 }}
    />
  );
}

export default SpacebookSearchBar