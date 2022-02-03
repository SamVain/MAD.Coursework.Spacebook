import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import SpacebookHeader from '../components/SpacebookHeader'
import HeaderButtonGroup from '../components/SpacebookHeaderButtonGroup'
import SpacebookPosts from '../components/homeComponents/SpacebookPosts'

class HomePage extends Component {
    render() {
        return (
            <View>
                <SpacebookHeader />
                <SpacebookPosts />
            </View>
        )
    }
}

export default HomePage