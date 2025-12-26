'use client';

import React, { useState } from 'react';
import UserCard from './components/personCard'; 
import { users } from './data/people';
import Button from './components/button';
import Link from 'next/link';


export default function SearchPage() {
  
  const people = users; 

  const [searchTerm, setSearchTerm] = useState("");

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

      <Button variant="secondary" onClick={} style={{ marginLeft: "10px" }}>
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
          />
        ))}
      </div>
    </div>
  );
}