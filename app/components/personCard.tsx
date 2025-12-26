'use client';

import React from 'react';
import Button from './button';

type PersonCardProps = {
  name: string;
  nickname: string;
  phonenumber: string;
  image: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function PersonCard({
  name,
  nickname,
  phonenumber,
  image,
  onEdit,
  onDelete,
}: PersonCardProps) {
  return (
    <div className="person-card">
      <img src={image} alt={name} className="person-card-img" />
      <h2>{name}</h2>
      <p>ชื่อเล่น: {nickname}</p>
      <p>เบอร์โทร: {phonenumber}</p>

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