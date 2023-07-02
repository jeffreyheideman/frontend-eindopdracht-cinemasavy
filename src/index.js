import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import {GlobalProvider} from "./context/GlobalState";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <GlobalProvider>
                <Router>
                    <App/>
                </Router>
            </GlobalProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
