import React, {createContext, useState} from 'react';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext(null)



function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });

    function login(jwtToken) {
        const decodedToken = jwt_decode(jwtToken);
        localStorage.setItem("jwtToken", jwtToken);
        console.log(decodedToken)
        setAuth({
            ...auth,
            isAuth: true,
            user: {
                email: decodedToken.email,
                id: decodedToken.id,
                }
        });
        console.log("De gebruiker is ingelogd");
    }

    function logout() {
        localStorage.removeItem("jwtToken");
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