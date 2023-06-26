import React, {createContext, useState} from 'react';

export const AuthContext = createContext(null)



function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });

    function login(jwtToken) {
        setAuth({
            ...auth,
            isAuth: true,
            user: {
                email: 'Klaasje@novi.nl',
                id: 1,
                }
        });
        console.log("De gebruiker is ingelogd");
    }

    function logout() {
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
        });
    }

    const data = {
        isAuth: auth.isAuth,
        login: login,
        logout: logout,
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;