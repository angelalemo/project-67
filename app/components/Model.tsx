'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // ถ้าปิดอยู่ ไม่ต้องเรนเดอร์อะไรเลย
  if (!isOpen) return null;

  return (
    <>

      <div className="modal-popup">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>

        {/* Content */}
        <div className="text-gray-600">
          {children}
        </div>
      </div>
    </>
  );
}