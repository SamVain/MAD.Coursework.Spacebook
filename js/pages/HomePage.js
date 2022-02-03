import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import SpacebookHeader from '../components/SpacebookHeader'

class HomePage extends Component {
    render() {
        return (
            <View>
                <SpacebookHeader />
            </View>
        )
    }
}

export default HomePage