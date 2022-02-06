import React, { useRef } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import HomePage from "../js/pages/HomePage";
import SearchPage from "../js/pages/SearchPage";
import AccountPage from "../js/pages/AccountPage"
import SignupPage from "../js/pages/SignupPage";
import LoginPage from "../js/pages/LoginPage";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignupPage} />
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Search" component={SearchPage} />
            <Stack.Screen name="Account" component={AccountPage} />
        </Stack.Navigator>
    );
}

export default HomeStack;