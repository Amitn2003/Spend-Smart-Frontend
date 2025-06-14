import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

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

  useEffect(() => {
    // fetchExpenses();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log('Adding entry:', form);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }).then(async (res) => {
        console.log('Response from adding entry:', res)
        const data = await res.json()
        console.log('Data from adding entry:', data)
        // return data
        });
      setForm({
        type: 'expense', // Reset to default 'expense'
        amount: '',
        category: '',
        subcategory: '',
        note: '',
        date: new Date().toISOString().split('T')[0], // Reset to today's date
      });
      // reload expenses after adding a new entry
      // window.location.reload(); // Reload the page to fetch updated expenses
      // fetchExpenses();
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const filtered = filter
    ? (Array.isArray(expenses) ? expenses.filter((e) => e.category === filter) : [])
    : (Array.isArray(expenses) ? expenses : []);

  // Don't proceed if there are no expenses (empty filtered array)
  if (filtered.length === 0) {
   
    //       <div className="max-w-3xl mx-auto py-10 px-4">
    //   <form
    //     onSubmit={handleAdd}
    //     className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
    //   >
    //     {/* Amount Input */}
    //     <div className="flex flex-col">
    //       <label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-1">Amount</label>
    //       <input
    //         id="amount"
    //         type="number"
    //         placeholder="₹0.00"
    //         className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
    //         value={form.amount}
    //         onChange={(e) => setForm({ ...form, amount: +e.target.value })}
    //       />
    //     </div>
    
    //     {/* Type Selector */}
    //     <div className="flex flex-col">
    //       <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-1">Type</label>
    //       <select
    //         id="type"
    //         required
    //         value={form.type}
    //         onChange={(e) => setForm({ ...form, type: e.target.value })}
    //         className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
    //       >
    //         <option value="expense">Expense</option>
    //         <option value="income">Income</option>
    //       </select>
    //     </div>
    
    //     {/* Category Input */}
    //     <div className="flex flex-col">
    //       <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">Category</label>
    //       <input
    //         id="category"
    //         type="text"
    //         placeholder="Category"
    //         className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
    //         value={form.category}
    //         onChange={(e) => setForm({ ...form, category: e.target.value })}
    //       />
    //     </div>
    
    //     {/* Subcategory Input */}
    //     <div className="flex flex-col">
    //       <label htmlFor="subcategory" className="text-sm font-medium text-gray-700 mb-1">Subcategory (optional)</label>
    //       <input
    //         id="subcategory"
    //         type="text"
    //         placeholder="Subcategory"
    //         className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
    //         value={form.subcategory}
    //         onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
    //       />
    //     </div>
    
    //     {/* Note Input */}
    //     <div className="flex flex-col">
    //       <label htmlFor="note" className="text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
    //       <input
    //         id="note"
    //         type="text"
    //         placeholder="Note"
    //         className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
    //         value={form.note}
    //         onChange={(e) => setForm({ ...form, note: e.target.value })}
    //       />
    //     </div>
    
    //     {/* Date Input */}
    //     <div className="flex flex-col">
    //       <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1">Date</label>
    //       <input
    //         id="date"
    //         type="date"
    //         className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
    //         value={form.date}
    //         onChange={(e) => setForm({ ...form, date: e.target.value })}
    //       />
    //     </div>
    
    //     {/* Submit Button */}
    //     <button
    //       type="submit"
    //       className="col-span-2 bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
    //     >
    //       Add Entry
    //     </button>
    //   </form>
    // </div>
    return (
      <div className="max-w-3xl mx-auto py-10 px-6 bg-white rounded-lg shadow-xl">
  <form
    onSubmit={handleAdd}
    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
  >
    {/* Amount Input */}
    <div className="flex flex-col">
      <label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-2">Amount</label>
      <input
        id="amount"
        type="number"
        placeholder="₹0.00"
        className="border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: +e.target.value })}
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
        className="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
        className="border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
        value={form.category}
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
        className="border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
        className="border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
        className="border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="col-span-2 bg-blue-600 text-white py-4 rounded-lg mt-6 hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      Add Entry
    </button>
  </form>
</div>

    );
  }
  
  
}

