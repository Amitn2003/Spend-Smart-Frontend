import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseFilter from '../components/ExpenseFilter';
import ExpenseList from '../components/ExpenseList';
import ExpenseChart from '../components/ExpenseChart';
import ExpenseChart2 from '../components/ExpenseChart2';

export default function Dashboard() {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchExpenses = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log('Fetched expenses:', data);
    if (Array.isArray(data.expenses)) setExpenses(data);
    else setExpenses([]);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = async (form) => {
    await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    fetchExpenses();
  };
  const filtered = filter ? (Array.isArray(expenses) ? expenses.filter(e => e.category === filter) : []) : expenses;
console.log('Filtered expenses:', filtered.expenses);

const uniqueCategories = Array.isArray(expenses) 
  ? [...new Set(expenses.map(e => e.category))] 
  : [];
console.log('Unique categories:', uniqueCategories);


  // const filtered = filter ? expenses.filter(e => e.category === filter) : expenses;
  // console.log('Filtered expenses:', filtered);
  // const uniqueCategories = [...new Set(expenses.map(e => e.category))];
  // console.log('Unique categories:', uniqueCategories);
  return (
    <div className="max-w-3xl mx-auto py-10">
      {/* <ExpenseForm onSubmit={handleAdd} />  */}
      {filtered.expenses != undefined && filtered.expenses.length > 0 && <ExpenseChart data={filtered} />}
      {filtered.expenses != undefined && filtered.expenses.length > 0 && <ExpenseChart2 data={filtered} />}
      {/* <ExpenseFilter categories={uniqueCategories} setFilter={setFilter} /> */}
      <ExpenseList entries={filtered} />
    </div>
  );
}
