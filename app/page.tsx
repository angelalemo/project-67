import React from "react";
import { users } from "./data/people";
import PersonCard from "./components/personCard";

export default function Home() {
  return (
    <>
    <header style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>รายชื่อเพื่อน</h1>
    </header>
    
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "30px"
    }}>
      {users.map((user, index) => (
        <PersonCard
          key={index}
          name={user.name}
          nickname={user.nickname}
          phonenumber={user.phonenumber}
          image={user.image}
        />
      ))}
    </div>
    </>
  );
}
