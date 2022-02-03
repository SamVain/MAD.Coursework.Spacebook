import * as React from "react";
import { Avatar } from "react-native-elements";

function SpacebookAvatar() {
  return (
    <Avatar
      activeOpacity={0.2}
      avatarStyle={{ }}
      containerStyle={{ backgroundColor: "#BDBDBD" }}
      icon={{}}
      iconStyle={{}}
      imageProps={{}}
      onLongPress={() => alert("onLongPress")}
      onPress={() => alert("onPress")}
      overlayContainerStyle={{}}
      placeholderStyle={{}}
      rounded
      size="large"
      source={{ uri: "" }}
      title="S"
      titleStyle={{}}
    />
  );
}

export default SpacebookAvatar