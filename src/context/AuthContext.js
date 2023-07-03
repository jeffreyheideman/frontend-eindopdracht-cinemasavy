import React, {createContext, useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import {CheckTokenValidity} from "../helper/CheckTokenValidity";
import {useNavigate} from "react-router-dom";


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
    },[auth])

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
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
