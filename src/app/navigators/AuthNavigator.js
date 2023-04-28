import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import MainMenuNavigator from "./MainMenuNavigator";

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            header: () => null,
            contentStyle: { backgroundColor: 'white' },
        }}>
            {/* <Stack.Screen name="MainScreen" component={MainMenuNavigator} /> */}
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

        </Stack.Navigator>
    );
};

export default AuthNavigator;