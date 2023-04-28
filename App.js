import React from "react";
import { NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux';
import store from './src/app/appRedux/stores/store';
import { AuthProvider } from "./src/app/context/AuthContext";
import { AppNavigation } from "./src/app/navigators/AppNavigation";

const App = () => {
  
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AuthProvider>
          <AppNavigation />
        </AuthProvider>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;