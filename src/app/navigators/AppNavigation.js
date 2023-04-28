import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from "./AuthNavigator";
import { AuthContext } from '../context/AuthContext';
import MainMenuNavigator from './MainMenuNavigator';

export const AppNavigation = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    return (
        <NavigationContainer>
          {isLoggedIn ? <MainMenuNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};
