import React, { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
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
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};
