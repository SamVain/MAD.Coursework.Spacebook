import React, {useState} from 'react'
import { ButtonGroup } from "react-native-elements";

function HeaderButtonGroup({ navigation }) {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState([0, 2, 3]);
  const buttons = ['Home', 'Search', 'Account']

  const btnPress = (value) => {

    setSelectedIndex(value);

    navigation.navigate(buttons[value]);
  }

  return (

    <ButtonGroup
      buttons={buttons}    
      selectedIndex={selectedIndex}
      onPress={(value) => btnPress(value)}      
      containerStyle={{ marginBottom: 20 }}
    />

  );

/*   return (
    <ButtonGroup
      buttons={buttons}    
      selectedIndex={selectedIndex}
      onPress={(value) => navigation.navigate(buttons[value]) }      
      containerStyle={{ marginBottom: 20 }}
    />
  ); */






}

export default HeaderButtonGroup