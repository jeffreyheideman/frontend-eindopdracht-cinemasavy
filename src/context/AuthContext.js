import React, {createContext, useState, useContext, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import {CheckTokenValidity} from "../helper/CheckTokenValidity";


export const AuthContext = createContext(null)




function AuthContextProvider({ children }) {


    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("jwtToken")
        if(storedToken && CheckTokenValidity(storedToken)){
            login(storedToken)
        } else {
           setAuth({
               ...auth,
                isAuth: false,
                user: null,
           })
        }
    },[])

    function login(jwtToken) {
        const decodedToken = jwt_decode(jwtToken);
        localStorage.setItem("jwtToken", jwtToken);
        // console.log(decodedToken);
        setAuth({
            isAuth: true,
            user: {
                email: decodedToken.email,
                id: decodedToken.id,
            },
        });
    }

    function logout() {
        localStorage.removeItem("jwtToken");
        setAuth({
            isAuth: false,
            user: null,
        });
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    };
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
