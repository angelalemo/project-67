'use client';

import React from 'react';
import Button from './button';

type PersonCardProps = {
  name: string;
  nickname: string;
  phone_number: string;
  image_url: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function PersonCard({
  name,
  nickname,
  phone_number,
  image_url,
  onEdit,
  onDelete,
}: PersonCardProps) {
  // ถ้า image_url เป็น relative path ให้เติม backend URL
  const imageSrc = image_url 
    ? (image_url.startsWith('http') ? image_url : `http://localhost:4000${image_url}`)
    : '/images/people/mark.jpg';

  return (
    <div className="person-card">
      <img src={imageSrc} alt={name} className="person-card-img" />
      <h2>{name}</h2>
      <p>ชื่อเล่น: {nickname}</p>
      <p>เบอร์โทร: {phone_number}</p>

      <div className="person-card-actions" style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10 }}>
        <Button variant="secondary" onClick={onEdit}>
          แก้ไข
        </Button>

        <Button variant="primary" onClick={onDelete}>
          ลบ
        </Button>
      </div>
    </div>
  );
}