'use client';

import React, { useState, useEffect } from 'react';
import PersonCard from './components/personCard';
import { PersonType } from './data/people';
import Button from './components/button';
import Modal from './components/Model';
import PersonForm, { PersonData } from './components/PersonForm';
import ErrorDisplay from './components/ErrorDisplay';
import { peopleService } from '@/lib/services/people.service';
import { categorizeError, getUserFriendlyMessage } from '@/lib/utils/errorHandler';
import styles from './page.module.css'; 

export default function SearchPage() {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await peopleService.getAll();
      setPeople(data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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
          <ErrorDisplay
            error={error instanceof Error ? error.message : String(error)}
            variant={categorizeError(error)}
            onRetry={fetchData}
          />
        </div>
      </div>
    );
  }

  const openAddModal = () => {
    setEditingPerson(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
  if (confirm('คุณแน่ใจหรือไม่ว่าจะลบรายชื่อนี้?')) {
    try {
      await peopleService.delete(id);
      setPeople((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert(getUserFriendlyMessage(error));
    }
  }
  };

  const handleSave = async (data: PersonData) => {
    try {
      const result = data.id
        ? await peopleService.update({ 
            id: data.id, 
            name: data.name,
            nickname: data.nickname,
            phone_number: data.phone_number,
            image_file: data.image_file,
          })
        : await peopleService.create({
            name: data.name,
            nickname: data.nickname,
            phone_number: data.phone_number,
            image_file: data.image_file,
          });

      if (data.id) {
        setPeople((prev) => prev.map((p) => (p.id === data.id ? result : p)));
      } else {
        setPeople((prev) => [...prev, result]);
      }
      setIsModalOpen(false);
    } catch (error) {
      alert(getUserFriendlyMessage(error));
    }
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
                id={Number(person.id)}
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