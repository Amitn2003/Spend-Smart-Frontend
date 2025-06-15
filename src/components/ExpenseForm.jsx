import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Dashboard() {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    type: 'expense', // Default to 'expense'
    amount: '',
    category: '',
    subcategory: '',
    note: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
  });
  const [filter, setFilter] = useState('');

  // const fetchExpenses = async () => {
  //   const res = await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await res.json();
  //   // console.log('Fetched expenses:', data);
  //   // Ensure that the data is an array before setting it
  //   if (Array.isArray(data)) {
  //     setExpenses(data);
  //   } else {
  //     setExpenses([]); // Set to empty array if data is not an array
  //     console.error('Fetched data is not an array:', data);
  //   }
  // };

  // useEffect(() => {
    // fetchExpenses();
  // }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log('Adding entry:', form);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
       const data = await res.json();
    console.log('Response from adding entry:', res);
    console.log('Data from adding entry:', data);

    if (!res.ok) {
      toast.error(data.message || 'Failed to add expense');
      throw new Error(data.message || 'Failed to add expense');
    }

    toast.success('Expense added successfully!');

    // Optionally update local state
    setExpenses((prev) => [...prev, data]);

    // Reset form
    setForm({
      type: 'expense',
      amount: '',
      category: '',
      subcategory: '',
      note: '',
      date: new Date().toISOString().split('T')[0],
    });

  } catch (error) {
    console.error('Error adding entry:', error);
    toast.error(error.message || error || 'Something went wrong. Please try again.');
  }
  };

  const filtered = filter
    ? (Array.isArray(expenses) ? expenses.filter((e) => e.category === filter) : [])
    : (Array.isArray(expenses) ? expenses : []);

  // Don't proceed if there are no expenses (empty filtered array)
  if (filtered.length === 0) {
   
    return (
      <div className="max-w-3xl mx-auto py-10 px-6 bg-white rounded-lg shadow-xl">
        <form
          onSubmit={handleAdd}
          className="space-y-6" // Use space-y-6 to provide vertical spacing between form elements
        >
          {/* Amount Input */}
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              id="amount"
              type="number"
              placeholder="₹0.00"
              className="w-full border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: +e.target.value })} required
            />
          </div>

    {/* Type Selector */}
    <div className="flex flex-col">
      <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-2">Type</label>
      <select
        id="type"
        required
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
    </div>

    {/* Category Input */}
    <div className="flex flex-col">
      <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2">Category</label>
      <input
        id="category"
        type="text"
        placeholder="Category"
        className="w-full border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
        value={form.category}  required
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
    </div>

    {/* Subcategory Input */}
    <div className="flex flex-col">
      <label htmlFor="subcategory" className="text-sm font-medium text-gray-700 mb-2">Subcategory (optional)</label>
      <input
        id="subcategory"
        type="text"
        placeholder="Subcategory"
        className="w-full border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
        value={form.subcategory}
        onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
      />
    </div>

    {/* Note Input */}
    <div className="flex flex-col">
      <label htmlFor="note" className="text-sm font-medium text-gray-700 mb-2">Note (optional)</label>
      <input
        id="note"
        type="text"
        placeholder="Note"
        className="w-full border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />
    </div>

    {/* Date Input */}
    <div className="flex flex-col">
      <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2">Date</label>
      <input
        id="date"
        type="date"
        className="w-full border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-4 rounded-lg mt-6 hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      Add Entry
    </button>
  </form>
</div>

    );
  }
  
  
}

