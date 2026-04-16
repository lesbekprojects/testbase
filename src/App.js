import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  // Деректерді алу (GET)
  const fetchUsers = () => {
    fetch("http://localhost:8080/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  useEffect(() => { fetchUsers(); }, []);

  // Жаңа дерек қосу (POST)
  const addUser = (e) => {
    e.preventDefault();
    if (!name) return;

    fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name })
    })
    .then(() => {
      setName(""); // Инпутты тазалау
      fetchUsers(); // Тізімді жаңарту
    });
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', letterSpacing: '2px' }}>SAUYT ECOSYSTEM</h1>

      <div style={{ maxWidth: '400px', margin: 'auto', background: '#1e293b', padding: '20px', borderRadius: '15px' }}>
        <form onSubmit={addUser} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Жаңа есім..."
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: 'none' }}
          />
          <button type="submit" style={{ backgroundColor: '#38bdf8', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Қосу
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {users.map(user => (
            <div key={user.id} style={{ borderBottom: '1px solid #334155', padding: '10px 0' }}>
              <span style={{ color: '#94a3b8', marginRight: '10px' }}>#{user.id}</span>
              <span style={{ fontWeight: 'bold' }}>{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;