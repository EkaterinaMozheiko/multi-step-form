import React, { MouseEvent, FC, HTMLAttributes } from 'react';
import classnames from 'classnames';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    type: 'submit';
    name: string;
    className?: string;
    onClick?: (event: MouseEvent) => void;
}

export const Button: FC<ButtonProps> = ({ type, name, onClick, children, className = '' }) => {
    return (
        <button 
            className={classnames('button', className)} 
            type={type} 
            name={name} 
            onClick={onClick}
        >
            {children}
        </button>
    )
}