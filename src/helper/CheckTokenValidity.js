import React from 'react';
import jwt_decode from "jwt-decode";

 export function CheckTokenValidity(jwtToken) {
    const decodedToken = jwt_decode(jwtToken);
    const expirationTime = decodedToken.exp * 1000;
    const isExpired = Date.now() > expirationTime;
    return !isExpired;
}

