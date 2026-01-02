'use client';

import React from 'react';
import Button from './button';

interface ErrorDisplayProps {
  error?: string;
  onRetry?: () => void;
  variant?: 'network' | 'server' | 'notfound' | 'generic';
}

export default function ErrorDisplay({ 
  error, 
  onRetry,
  variant = 'generic' 
}: ErrorDisplayProps) {
  const errorConfig = {
    network: {
      icon: '📡',
      title: 'ไม่สามารถเชื่อมต่อได้',
      message: 'กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณ',
      showRetry: true,
    },
    server: {
      icon: '⚠️',
      title: 'เกิดข้อผิดพลาดชั่วคราว',
      message: 'เรากำลังแก้ไขปัญหา กรุณาลองใหม่อีกครั้งในอีกสักครู่',
      showRetry: true,
    },
    notfound: {
      icon: '🔍',
      title: 'ไม่พบข้อมูล',
      message: 'ขออภัย ไม่พบข้อมูลที่คุณต้องการ',
      showRetry: false,
    },
    generic: {
      icon: '❌',
      title: 'เกิดข้อผิดพลาด',
      message: 'ขออภัย มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง',
      showRetry: true,
    },
  };

  const config = errorConfig[variant];

  return (
    <div style={{
      backgroundColor: '#fee2e2',
      border: '1px solid #fca5a5',
      borderRadius: '12px',
      padding: '24px',
      color: '#991b1b',
      marginBottom: '20px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '12px' }}>
        {config.icon}
      </div>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 'bold' }}>
        {config.title}
      </h2>
      <p style={{ margin: '0 0 16px 0', color: '#7f1d1d' }}>
        {config.message}
      </p>
      
      {/* แสดง error message เฉพาะใน development mode */}
      {process.env.NODE_ENV === 'development' && error && (
        <details style={{ 
          marginTop: '16px', 
          padding: '12px', 
          backgroundColor: '#fef2f2',
          borderRadius: '8px',
          fontSize: '0.875rem',
          textAlign: 'left',
        }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            🔧 Developer Info
          </summary>
          <pre style={{ 
            marginTop: '8px', 
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {error}
          </pre>
        </details>
      )}

      {config.showRetry && onRetry && (
        <div style={{ marginTop: '16px' }}>
          <Button 
            variant="primary" 
            onClick={onRetry}
          >
            🔄 ลองใหม่อีกครั้ง
          </Button>
        </div>
      )}
    </div>
  );
}
