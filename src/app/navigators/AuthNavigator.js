import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import MainMenuNavigator from "./MainMenuNavigator";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    var userStore = useSelector(state => state.AuthReducer);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function fetchAuthState() {
            const resolvedAuthState = await userStore;
            resolvedAuthState.isLoggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false);
        }
        fetchAuthState();
    }, [])

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            header: () => null,
            contentStyle: { backgroundColor: 'white' },
        }}>
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="MainScreen" component={MainMenuNavigator} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;