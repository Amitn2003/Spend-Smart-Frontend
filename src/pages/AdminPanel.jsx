import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminPanel = () => {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const fetchData = async () => {
    try {
      const resUsers = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resExpenses = await fetch(`${import.meta.env.VITE_API_URL}/admin/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = await resUsers.json();
      const expensesData = await resExpenses.json();

      setUsers(usersData);
      setExpenses(expensesData);
    } catch (err) {
      console.error("Error fetching admin data", err);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchData();
    }
  }, []);

  if (user?.role !== "admin") {
    return <div className="p-4 text-red-600 font-bold">Access Denied: Admins only.</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* User Table */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Users ({users.length})</h2>
        <ul className="space-y-2">
          {users.map(u => (
            <li key={u._id} className="border p-2 rounded">
              <strong>{u.name}</strong> — {u.email} ({u.role})
            </li>
          ))}
        </ul>
      </section>

      {/* Expense Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">All Expenses ({expenses.length})</h2>
        <ul className="space-y-2">
          {expenses.map(e => (
            <li key={e._id} className="border p-2 rounded text-sm">
              <strong>{e.userName || e.user?.name}</strong>: ₹{e.amount} on {e.category} — {e.note}
              <div className="text-xs text-gray-600">{new Date(e.date).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
