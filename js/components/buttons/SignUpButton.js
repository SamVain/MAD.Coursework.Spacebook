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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4267B2",
    padding: 20,
    borderRadius: 5,

  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }, 
});

export default SignUpButton