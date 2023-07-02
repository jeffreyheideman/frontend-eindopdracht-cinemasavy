import React from 'react';
import './Button.css';

const Button = ({buttonName, type, onClick, className, disabled}) => {
    return (
        <button type={type} onClick={onClick} className={className} disabled={disabled}>
            {buttonName}
        </button>
    );
};

export default Button;