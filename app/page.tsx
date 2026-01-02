'use client';

import React, { useState, useEffect } from 'react';
import PersonCard from './components/personCard';
import { PersonType } from './data/people';
import Button from './components/button';
import Modal from './components/Model';
import PersonForm, { PersonData } from './components/PersonForm';

import styles from './page.module.css'; 

export default function SearchPage() {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch('http://localhost:4000/people', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPeople(data);
        setError(null);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Failed to fetch people:', errorMessage);
        setError(`ไม่สามารถดึงข้อมูลได้: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<PersonData | undefined>(undefined);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.header}>Friend Lists ✨</h1>
          <p>กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.header}>Friend Lists ✨</h1>
          <div style={{ 
            backgroundColor: '#fee2e2', 
            border: '1px solid #fca5a5', 
            borderRadius: '8px', 
            padding: '16px',
            color: '#991b1b',
            marginBottom: '20px'
          }}>
            <p style={{ margin: '0 0 12px 0', fontWeight: 'bold' }}>❌ เกิดข้อผิดพลาด</p>
            <p style={{ margin: '0 0 12px 0' }}>{error}</p>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>
              📌 ตรวจสอบว่า:
              <br />• เซิร์ฟเวอร์ API กำลังทำงานบนพอร์ต 4000
              <br />• URL ถูกต้อง: http://localhost:4000/people
              <br />• ตรวจสอบ Browser Console สำหรับรายละเอียดเพิ่มเติม
            </p>
          </div>
          <Button variant="primary" onClick={() => window.location.reload()}>
            🔄 ลองใหม่
          </Button>
        </div>
      </div>
    );
  }

  const openAddModal = () => {
    setEditingPerson(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าจะลบรายชื่อนี้?')) {
      setPeople((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = (data: PersonData) => {
    if (data.id != null) {
      setPeople((prev) => prev.map((p) => (p.id === data.id ? { ...p, ...data } : p)));
    } else {
      const newId = crypto.randomUUID();
      const newPerson: PersonType = { 
        id: newId, 
        name: data.name, 
        nickname: data.nickname, 
        phone_number: data.phone_number, 
        image_url: data.image_url || '/images/people/mark.jpg'
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
                phone_number={person.phone_number}
                image_url={person.image_url}
                onEdit={() => {
                  setEditingPerson({
                    id: person.id,
                    name: person.name,
                    nickname: person.nickname,
                    phone_number: person.phone_number,
                    image_url: person.image_url,
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