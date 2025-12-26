
import React from 'react';
import Button from './button';

type PersonCardProps = {
  name: string;
  nickname: string;
  phonenumber: string;
  image: string;
};

export default function PersonCard({ name, nickname, phonenumber, image }: PersonCardProps) {

  return (
    <div className="person-card">
      <img src={image} alt={name} className="person-card-img" />
      <h2>{name}</h2>
      <p>ชื่อเล่น: {nickname}</p>
      <p>เบอร์โทร: {phonenumber}</p>
      
      <div className="person-card-actions">
        <Button variant="secondary" onClick={}>
          แก้ไข
        </Button>

        <Button variant="primary" onClick={}>
          ลบ
        </Button>
      </div>

    </div>
  );
}