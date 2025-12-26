'use client';

import React, { useState } from 'react';
import UserCard from './components/personCard';
import { users } from './data/people';
import Button from './components/button';
import Modal from './components/Model';
import PersonForm, { PersonData } from './components/PersonForm';

export default function SearchPage() {
  const people = users;

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<PersonData | undefined>(undefined);

  const openAddModal = () => {
    setEditingPerson(undefined);
    setIsModalOpen(true);
  };

  const handleSave = (data: PersonData) => {
    // TODO: persist data if needed
    console.log('Create (เพิ่ม):', data);
    alert('เพิ่มเพื่อนใหม่สำเร็จ!');
    setIsModalOpen(false);
  };

  const filteredPeople = people.filter((person) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      person.name.toLowerCase().includes(lowerSearch) ||
      person.nickname.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="ค้นหา..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px" }}
      />

      <Button variant="secondary" onClick={openAddModal} style={{ marginLeft: "10px" }}>
        เพิ่มรายชื่อ
      </Button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
  {filteredPeople.map((user, index) => (
    <UserCard
      key={index}
      name={user.name}
      nickname={user.nickname}
      phonenumber={user.phonenumber}
      image={user.image}
      onEdit={() => {
        setEditingPerson({
          name: user.name,
          nickname: user.nickname,
          phonenumber: user.phonenumber,
          image: user.image,
        });
        setIsModalOpen(true);
      }}
    />
  ))}
</div>

   <Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title={editingPerson ? "แก้ไขข้อมูลเพื่อน" : "เพิ่มเพื่อนใหม่"}
>
  <PersonForm
    initialData={editingPerson}
    onSubmit={(data) => {
      console.log('save:', data);
      setIsModalOpen(false);
    }}
    onCancel={() => setIsModalOpen(false)}
  />
</Modal>
    </div>
  );
}