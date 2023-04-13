import React from "react";
import { NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux';
import store from './src/app/appRedux/stores/store';
import SignInScreen from './src/app/screens/Auth/SignInScreen';
import SignUpScreen from './src/app/screens/Auth/SignUpScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from "./src/app/screens/Main/MainScreen";
import AuthNavigator from "./src/app/navigators/AuthNavigator";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;