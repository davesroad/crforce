import { useState } from 'react';
export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Jane Doe', email: 'jane@crm.com', role: 'sales' },
    { id: 2, name: 'John Smith', email: 'john@crm.com', role: 'executive' }
  ]);
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers([...users, { id: users.length + 1, ...form }]);
    setForm({ name: '', email: '', role: '' });
  };
  return (
    <div>
      <h2>🧑‍💼 User Management (for Admins)</h2>
      <form onSubmit={handleAddUser}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">Role</option>
          <option value="admin">Admin</option>
          <option value="sales">Sales</option>
          <option value="executive">Executive</option>
        </select>
        <button type="submit">Add User</button>
      </form>
      <table border="1" cellPadding="8"><thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
      <tbody>{users.map(u => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}</tbody></table>
    </div>
  );
}