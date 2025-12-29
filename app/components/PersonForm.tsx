'use client';

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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