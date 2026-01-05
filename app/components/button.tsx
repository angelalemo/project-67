
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;      
  onClick?: () => void;           
  variant?: 'primary' | 'secondary'; 
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false
}: ButtonProps) {
  
  const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button 
      type={type}
      className={`btn ${className}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}