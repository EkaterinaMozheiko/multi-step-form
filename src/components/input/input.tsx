import React, { forwardRef, Ref } from 'react';
import classnames from 'classnames';

interface InputProps {
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
    className?: string;
    errorMessage?: string;
}

export const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
    const { label, name, type = 'text', className, errorMessage = '', placeholder = '' } = props;

    return (
        <div className={classnames('input', className)}>
            <label 
                className={classnames('label', {['error']: !!errorMessage})} 
                htmlFor={name}
            >
                {label}
            </label>
            <input
                className={classnames('input__control', {['input__control_error']: !!errorMessage})}
                id={name} 
                name={name}
                placeholder={placeholder}
                type={type} 
                autoComplete={name}
                ref={ref}
            />
            <span className="error">{errorMessage}</span>
        </div>
    )
})