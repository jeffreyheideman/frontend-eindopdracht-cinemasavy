import React from 'react';

const InputField = ({type, placeholder, value, id, className, onChange, autoComplete, ref, required, ariaInvalid, ariaDescribedby, onFocus, onBlur}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            id={id}
            className={className}
            onChange={onChange}
            autoComplete={autoComplete}
            ref={ref}
            required={required}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedby}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};

export default InputField;