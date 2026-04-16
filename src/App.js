import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Spring Boot API-ден деректерді шақыру
    fetch("http://localhost:8080/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("API-ге қосылу мүмкін болмады:", err));
  }, []);

  return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50' }}>SAUYT Project: Пайдаланушылар</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.id} style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              width: '200px'
            }}>
              <h3>👤 {user.name}</h3>
              <p>ID: {user.id}</p>
            </div>
          ))
        ) : (
          <p>Деректер жүктелуде немесе база бос...</p>
        )}
      </div>
    </div>
  );
}

export default App;