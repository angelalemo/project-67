'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from './button';

export interface PersonData {
  id?: number;
  name: string;
  nickname: string;
  phonenumber: string;
  image: string;
}

interface PersonFormProps {
  initialData?: PersonData;
  onSubmit: (data: PersonData) => void;
  onCancel: () => void;
}

export default function PersonForm({ initialData, onSubmit, onCancel }: PersonFormProps) {
  const [formData, setFormData] = useState<PersonData>({
    id: undefined,
    name: '',
    nickname: '',
    phonenumber: '',
    image: '/images/people/mark.jpg',
  });

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- ฟังก์ชันจัดการไฟล์รูปภาพ ---
  const handleFileProcess = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    } else {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };
  // -----------------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.nickname.trim() && formData.phonenumber.trim()) {
      onSubmit(formData);
    } else {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pf-form">
      
      {/* --- ส่วน Drag & Drop Image (Layout: Side-by-Side) --- */}
      <div className="pf-group">
        <label className="pf-label">รูปโปรไฟล์</label>
        
        <div 
          className="image-upload-area"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${isDragging ? '#3b82f6' : '#cbd5e1'}`,
            borderRadius: '12px',
            padding: '15px 20px',
            cursor: 'pointer',
            backgroundColor: isDragging ? '#eff6ff' : '#f8fafc',
            transition: 'all 0.2s ease',
            display: 'flex',          // ใช้ Flexbox
            alignItems: 'center',     // จัดกึ่งกลางแนวตั้ง
            gap: '20px',              // ระยะห่างระหว่างรูปกับข้อความ
            textAlign: 'left'         // จัดข้อความชิดซ้าย
          }}
        >
          {/* รูป Preview (ด้านซ้าย) */}
          <div style={{ 
            width: '70px', 
            height: '70px', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            border: '2px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            flexShrink: 0
          }}>
            <img 
              src={formData.image} 
              alt="Preview" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/people/mark.jpg'; }}
            />
          </div>

          {/* ข้อความแนะนำ (ด้านขวา) */}
          <div style={{ flex: 1 }}>
            {isDragging ? (
              <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '1rem' }}>
                ปล่อยเพื่ออัปโหลดรูปภาพ...
              </span>
            ) : (
              <>
                <p style={{ margin: '0 0 4px 0', fontWeight: 600, color: '#334155' }}>
                  คลิก หรือ ลากรูปมาวางที่นี่
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
                  รองรับไฟล์ JPG, PNG (แสดงผลตัวอย่างทันที)
                </p>
              </>
            )}
          </div>

          {/* Input file ที่ซ่อนอยู่ */}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={onFileSelect}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      </div>
      {/* ------------------------------------------------ */}

      <div className="pf-group">
        <label className="pf-label">ชื่อจริง</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="กรอกชื่อจริง"
          className="pf-input"
        />
      </div>

      <div className="pf-group">
        <label className="pf-label">ชื่อเล่น</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="กรอกชื่อเล่น"
          className="pf-input"
        />
      </div>

      <div className="pf-group">
        <label className="pf-label">เบอร์โทรศัพท์</label>
        <input
          type="tel"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
          placeholder="กรอกเบอร์โทรศัพท์"
          className="pf-input"
        />
      </div>

      <div className="pf-actions">
        <Button type="submit">บันทึก</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          ยกเลิก
        </Button>
      </div>
    </form>
  );
}