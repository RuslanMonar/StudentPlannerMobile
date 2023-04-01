import React from "react";
import { NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux';
import store from './src/app/appRedux/stores/store';
import SignInScreen from './src/app/screens/Auth/SignInScreen';
import SignUpScreen from './src/app/screens/Auth/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          header: () => null,
          contentStyle: { backgroundColor: 'white' },
        }}>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </NativeBaseProvider>
      </Provider>
  );
}

export default App;