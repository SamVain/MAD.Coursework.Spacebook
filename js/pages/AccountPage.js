import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import SpacebookHeader from '../components/SpacebookHeader'
import SpacebookAvatar from '../components/AccountPageComponents/SpacebookAvatar'

class AccountPage extends Component {
    render() {
        return (
            <View>
                <SpacebookHeader />
                <SpacebookAvatar />
            </View>
        )
    }
}

export default AccountPage