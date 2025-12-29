'use client';

import React, { useState } from 'react';
import PersonCard from './components/personCard';
import { persons, PersonType } from './data/people';
import Button from './components/button';
import Modal from './components/Model';
import PersonForm, { PersonData } from './components/PersonForm';

import styles from './page.module.css'; 

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
    if (confirm('คุณแน่ใจหรือไม่ว่าจะลบรายชื่อนี้?')) {
      setPeople((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = (data: PersonData) => {
    if (data.id != null) {
      setPeople((prev) => prev.map((p) => (p.id === data.id ? { ...p, ...data } : p)));
    } else {
      const newId = people.length > 0 ? Math.max(...people.map((p) => p.id)) + 1 : 1;
      const newPerson: PersonType = { 
        id: newId, 
        name: data.name, 
        nickname: data.nickname, 
        phonenumber: data.phonenumber, 
        image: data.image || '/images/people/mark.jpg'
      };
      setPeople((prev) => [...prev, newPerson]);
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
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        
        <h1 className={styles.header}>Friend Lists ✨</h1>

        <div className={styles.controls}>
          <input
            type="text"
            placeholder="🔍 ค้นหาชื่อ หรือ ชื่อเล่น..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

          {/* ตรวจสอบว่า Button รองรับ className หรือ style เพิ่มเติมไหม ถ้าไม่ อาจต้องแก้ที่ Component Button ด้วย */}
          <Button variant="primary" onClick={openAddModal}>
            + เพิ่มเพื่อนใหม่
          </Button>
        </div>

        {filteredPeople.length > 0 ? (
          <div className={styles.cardGrid}>
            {filteredPeople.map((person) => (
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
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p style={{ margin: 0 }}>ไม่พบรายชื่อที่ค้นหา 🍃</p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingPerson ? "✏️ แก้ไขข้อมูลเพื่อน" : "✨ เพิ่มเพื่อนใหม่"}
        >
          <PersonForm
            initialData={editingPerson}
            onSubmit={handleSave}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
}