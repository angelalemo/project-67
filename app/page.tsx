'use client';

import React, { useState } from 'react';
import PersonCard from './components/personCard';
import { persons, PersonType } from './data/people';
import Button from './components/button';
import Modal from './components/Model';
import PersonForm, { PersonData } from './components/PersonForm';

export default function SearchPage() {
  const [people, setPeople] = useState<PersonType[]>(persons);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<PersonData | undefined>(undefined);

  const openAddModal = () => {
    setEditingPerson(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
    alert('ลบสำเร็จ');
  };

  const handleSave = (data: PersonData) => {
    if (data.id != null) {
      setPeople((prev) => prev.map((p) => (p.id === data.id ? { ...p, ...data } : p)));
      alert('แก้ไขข้อมูลสำเร็จ');
    } else {
      const newId = Math.max(0, ...people.map((p) => p.id)) + 1;
      const newPerson: PersonType = { id: newId, name: data.name, nickname: data.nickname, phonenumber: data.phonenumber, image: data.image };
      setPeople((prev) => [...prev, newPerson]);
      alert('เพิ่มเพื่อนใหม่สำเร็จ!');
    }
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
  {filteredPeople.map((person) => {
    return (
      <PersonCard
        key={person.id}
        name={person.name}
        nickname={person.nickname}
        phonenumber={person.phonenumber}
        image={person.image}
        onEdit={() => {
          setEditingPerson({
            id: person.id,
            name: person.name,
            nickname: person.nickname,
            phonenumber: person.phonenumber,
            image: person.image,
          });
          setIsModalOpen(true);
        }}
        onDelete={() => handleDelete(person.id)}
      />
    );
  })}
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