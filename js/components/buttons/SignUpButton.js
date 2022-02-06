import React from 'react';
import { Button } from "react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function SignUpButton({ navigation }) {

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  );

}






/* 
class SignUpButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const navigation = this.props.navigation;
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
 */
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4267B2',
    height: 42,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
  },
})

export default SignUpButton

/* 

function SignUpButton({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Home');
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Sign Up' onPress={pressHandler} />
    </View>
  );
} */
/* 
<TouchableOpacity onPress={pressHandler} style={styles.button}>
//<Text style={styles.buttonText}>Sign Up</Text>
</TouchableOpacity>
 */
/* const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 305,
      height: 159,
      marginBottom: 20,
    },
    instructions: {
      color: '#888',
      fontSize: 18,
      marginHorizontal: 15,
      marginBottom: 10,
    },
    button: {
      backgroundColor: "blue",
      padding: 20,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
    }, 
  }); */