// src/components/Button.tsx
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;      // ข้อความในปุ่ม
  onClick?: () => void;           // ฟังก์ชันเมื่อกดปุ่ม
  variant?: 'primary' | 'secondary'; // รูปแบบปุ่ม (ค่า default คือ primary)
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button' 
}: ButtonProps) {
  
  // เลือก class ตาม variant ที่ส่งมา
  const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button 
      type={type}
      className={`btn ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}