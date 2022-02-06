import React, { Component } from 'react'
import { Button, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import { LinearGradient } from 'expo-linear-gradient';

import SpacebookHeader from '../components/SpacebookHeader'
import SpacebookPosts from '../components/homeComponents/SpacebookPosts'

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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

function HomePage({ navigation }) {

        return (
            <View >
{/*                 
                <Text>Home Screen</Text>

                <LinearGradient style={styles.container}
                    // Button Linear Gradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.button}>
                    <Text style={styles.text}>Sign in with Facebook</Text>
                </LinearGradient>

                <Button title="Go to Search" onPress={() => navigation.navigate('Search')}/>    
                <Button title="Go to Login" onPress={() => navigation.navigate('Login')}/>
                <Button title="Go to Account" onPress={() => navigation.navigate('Account')}/>
                <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')}/> */}
 
                <SpacebookHeader navigation={navigation}/>
                <SpacebookPosts />
 

            </View>
        );
}

export default HomePage