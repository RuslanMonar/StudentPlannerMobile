import React from "react";
import { NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux';
import store from './src/app/appRedux/stores/store';
import SignInScreen from './src/app/screens/Auth/SignInScreen';
import SignUpScreen from './src/app/screens/Auth/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from "./src/app/screens/Main/MainScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#9AC4F8",
            },
            header: () => null,
            contentStyle: { backgroundColor: 'white' },
          }}>
            
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </Stack.Navigator>
          {/* <Drawer.Navigator>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          </Drawer.Navigator> */}
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;