import * as React from "react";
import { ButtonGroup } from "react-native-elements";

function HeaderButtonGroup() {
  const [
    selectedIndex,
    setSelectedIndex
  ] = React.useState(0);
  const [
    selectedIndexes,
    setSelectedIndexes
  ] = React.useState([]);
  return (
    <ButtonGroup
      buttonStyle={{ width: 100 }}
      buttonContainerStyle={{}}
      buttons={["Home", "Search", "Account"]}
      containerStyle={{}}
      disabled={[3, 4]}
      disabledStyle={{}}
      disabledTextStyle={{}}
      disabledSelectedStyle={{}}
      disabledSelectedTextStyle={{}}
      innerBorderStyle={{}}
      onPress={selectedIdx =>
        setSelectedIndex(selectedIdx)
      }
      selectedButtonStyle={{}}
      selectedIndex={selectedIndex}
      selectedIndexes={selectedIndexes}
      selectedTextStyle={{}}
      textStyle={{}}
    />
  );
}

export default HeaderButtonGroup