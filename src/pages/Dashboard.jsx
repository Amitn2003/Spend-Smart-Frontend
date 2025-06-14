// // import { useEffect, useState } from 'react';
// // import { useAuth } from '../context/AuthContext';
// // import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// // export default function Dashboard() {
// //   const { token } = useAuth();
// //   const [expenses, setExpenses] = useState([]);
// //   const [form, setForm] = useState({
// //   type: 'expense', // default
// //   amount: '',
// //   category: '',
// //   subcategory: '',
// //   note: '',
// //   date: new Date().toISOString().split('T')[0], // Default to today's date
// // });

// //   const [filter, setFilter] = useState('');

// //   const fetchExpenses = async () => {
// //     const res = await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
// //       headers: { Authorization: `Bearer ${token}` }
// //     });
// //     const data = await res.json();
// //      // Ensure that the data is an array before setting it
// //       if (Array.isArray(data)) {
// //         setExpenses(data);
// //       } else {
// //         setExpenses([]);  // Set to empty array if data is not an array
// //         console.error("Fetched data is not an array:", data);
// //       }
// //   };

// //   useEffect(() => {
// //     fetchExpenses();
// //   }, []);

// //   const handleAdd = async (e) => {
// //     e.preventDefault();
// //     console.log("Adding expense:", form);
// //     try {
// //       await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify(form),
// //     });
// //     setForm({ amount: '', category: '', subcategory: '', note: '' });
// //     fetchExpenses();
// //   } catch (error) {
// //       console.error("Error adding expense:", error);
// //     }
// //   };

// //   const filtered = filter
// //     ? (Array.isArray(expenses) ? expenses.filter((e) => e.category === filter) : [])
// //     : (Array.isArray(expenses) ? expenses : []);

// //   // Don't proceed if there are no expenses (empty filtered array)
// //   if (filtered.length === 0) {
// //     return (
// //       <div className="max-w-3xl mx-auto py-10">
// //         <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4 mb-10">
// //           <input
// //             type="number"
// //             placeholder="Amount"
// //             className="border p-2"
// //             value={form.amount}
// //             onChange={e => setForm({ ...form, amount: +e.target.value })}
// //           />
// //           <select required value={form.type}
// //             onChange={(e) => setForm({ ...form, type: e.target.value })}
// //             className="p-2 border rounded"
// //           >
// //             <option value="expense">Expense</option>
// //             <option value="income">Income</option>
// //           </select>

// //           <input
// //             type="text"
// //             placeholder="Category"
// //             className="border p-2"
// //             value={form.category}
// //             onChange={e => setForm({ ...form, category: e.target.value })}
// //           />
// //           <input
// //             type="text"
// //             placeholder="Subcategory (optional)"
// //             className="border p-2"
// //             value={form.subcategory}
// //             onChange={e => setForm({ ...form, subcategory: e.target.value })}
// //           />
// //           <input
// //             type="text"
// //             placeholder="Note (optional)"
// //             className="border p-2"
// //             value={form.note}
// //             onChange={e => setForm({ ...form, note: e.target.value })}
// //           />
// //           <button className="col-span-2 bg-blue-600 text-white py-2">Add Expense</button>
// //         </form>

// //         <select className="mb-4 border p-2" onChange={e => setFilter(e.target.value)}>
// //           <option value="">All Categories</option>
// //           {[...new Set(expenses.map(e => e.category))].map(c => (
// //             <option key={c} value={c}>
// //               {c}
// //             </option>
// //           ))}
// //         </select>

// //         <div>No expenses to display.</div>
// //       </div>
// //     );
// //   }

// //   // If there are filtered expenses, proceed to render the sections
// //   const chartData = Object.entries(
// //     filtered.reduce((acc, curr) => {
// //       acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
// //       return acc;
// //     }, {})
// //   ).map(([name, value]) => ({ name, value }));

// //   return (
// //     <div className="max-w-3xl mx-auto py-10">
// //       <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4 mb-10">
// //         <input
// //           type="number"
// //           placeholder="Amount"
// //           className="border p-2"
// //           value={form.amount}
// //           onChange={e => setForm({ ...form, amount: +e.target.value })}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Category"
// //           className="border p-2"
// //           value={form.category}
// //           onChange={e => setForm({ ...form, category: e.target.value })}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Subcategory (optional)"
// //           className="border p-2"
// //           value={form.subcategory}
// //           onChange={e => setForm({ ...form, subcategory: e.target.value })}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Note (optional)"
// //           className="border p-2"
// //           value={form.note}
// //           onChange={e => setForm({ ...form, note: e.target.value })}
// //         />
// //         <button className="col-span-2 bg-blue-600 text-white py-2">Add Expense</button>
// //       </form>

// //       <select className="mb-4 border p-2" onChange={e => setFilter(e.target.value)}>
// //         <option value="">All Categories</option>
// //         {[...new Set(expenses.map(e => e.category))].map(c => (
// //           <option key={c} value={c}>
// //             {c}
// //           </option>
// //         ))}
// //       </select>

// //       <ul className="space-y-2 mb-10">
// //         {filtered.map((e, idx) => (
// //           <li key={idx} className="border p-2 rounded">
// //             ₹{e.amount} - {e.category} {e.subcategory && `> ${e.subcategory}`} - {e.note || 'No note'}
// //           </li>
// //         ))}
// //       </ul>

// //       {/* Display Category Breakdown if filtered is not empty */}
// //       <h2 className="text-xl font-bold mb-2">Category Breakdown</h2>
// //       <ResponsiveContainer width="100%" height={300}>
// //         <PieChart>
// //           <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
// //             {chartData.map((_, index) => (
// //               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //             ))}
// //           </Pie>
// //           <Tooltip />
// //         </PieChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // }








// import { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// export default function Dashboard() {
//   const { token } = useAuth();
//   const [expenses, setExpenses] = useState([]);
//   const [form, setForm] = useState({
//     type: 'expense', // Default to 'expense'
//     amount: '',
//     category: '',
//     subcategory: '',
//     note: '',
//     date: new Date().toISOString().split('T')[0], // Default to today's date
//   });
//   const [filter, setFilter] = useState('');

//   const fetchExpenses = async () => {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     // Ensure that the data is an array before setting it
//     if (Array.isArray(data)) {
//       setExpenses(data);
//     } else {
//       setExpenses([]); // Set to empty array if data is not an array
//       console.error('Fetched data is not an array:', data);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     console.log('Adding entry:', form);
//     try {
//       await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });
//       setForm({
//         type: 'expense', // Reset to default 'expense'
//         amount: '',
//         category: '',
//         subcategory: '',
//         note: '',
//         date: new Date().toISOString().split('T')[0], // Reset to today's date
//       });
//       fetchExpenses();
//     } catch (error) {
//       console.error('Error adding entry:', error);
//     }
//   };

//   const filtered = filter
//     ? (Array.isArray(expenses) ? expenses.filter((e) => e.category === filter) : [])
//     : (Array.isArray(expenses) ? expenses : []);

//   // Don't proceed if there are no expenses (empty filtered array)
//   if (filtered.length === 0) {
//     return (
//       <div className="max-w-3xl mx-auto py-10">
//         <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4 mb-10">
//           <input
//             type="number"
//             placeholder="Amount"
//             className="border p-2"
//             value={form.amount}
//             onChange={(e) => setForm({ ...form, amount: +e.target.value })}
//           />
//           <select
//             required
//             value={form.type}
//             onChange={(e) => setForm({ ...form, type: e.target.value })}
//             className="p-2 border rounded"
//           >
//             <option value="expense">Expense</option>
//             <option value="income">Income</option>
//           </select>

//           <input
//             type="text"
//             placeholder="Category"
//             className="border p-2"
//             value={form.category}
//             onChange={(e) => setForm({ ...form, category: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Subcategory (optional)"
//             className="border p-2"
//             value={form.subcategory}
//             onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Note (optional)"
//             className="border p-2"
//             value={form.note}
//             onChange={(e) => setForm({ ...form, note: e.target.value })}
//           />
//           <input
//             type="date"
//             className="border p-2"
//             value={form.date}
//             onChange={(e) => setForm({ ...form, date: e.target.value })}
//           />
//           <button className="col-span-2 bg-blue-600 text-white py-2">Add Expense</button>
//         </form>

//         <select className="mb-4 border p-2" onChange={(e) => setFilter(e.target.value)}>
//           <option value="">All Categories</option>
//           {[...new Set(expenses.map((e) => e.category))].map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>

//         <div>No expenses to display.</div>
//       </div>
//     );
//   }

//   // If there are filtered expenses, proceed to render the sections
//   const chartData = Object.entries(
//     filtered.reduce((acc, curr) => {
//       acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   return (
//     <div className="max-w-3xl mx-auto py-10">
//       <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4 mb-10">
//         <input
//           type="number"
//           placeholder="Amount"
//           className="border p-2"
//           value={form.amount}
//           onChange={(e) => setForm({ ...form, amount: +e.target.value })}
//         />
//         <select
//           required
//           value={form.type}
//           onChange={(e) => setForm({ ...form, type: e.target.value })}
//           className="p-2 border rounded"
//         >
//           <option value="expense">Expense</option>
//           <option value="income">Income</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Category"
//           className="border p-2"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Subcategory (optional)"
//           className="border p-2"
//           value={form.subcategory}
//           onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Note (optional)"
//           className="border p-2"
//           value={form.note}
//           onChange={(e) => setForm({ ...form, note: e.target.value })}
//         />
//         <input
//           type="date"
//           className="border p-2"
//           value={form.date}
//           onChange={(e) => setForm({ ...form, date: e.target.value })}
//         />
//         <button className="col-span-2 bg-blue-600 text-white py-2">Add Expense</button>
//       </form>

//       <select className="mb-4 border p-2" onChange={(e) => setFilter(e.target.value)}>
//         <option value="">All Categories</option>
//         {[...new Set(expenses.map((e) => e.category))].map((c) => (
//           <option key={c} value={c}>
//             {c}
//           </option>
//         ))}
//       </select>

//       <ul className="space-y-2 mb-10">
//         {filtered.map((e, idx) => (
//           <li key={idx} className="border p-2 rounded">
//             ₹{e.amount} - {e.category} {e.subcategory && `> ${e.subcategory}`} - {e.note || 'No note'}{' '}
//             <span className="text-gray-500 text-sm">({e.date})</span>
//           </li>
//         ))}
//       </ul>

//       {/* Display Category Breakdown if filtered is not empty */}
//       {filtered.length > 0 && (
//         <>
//           <h2 className="text-xl font-bold mb-2">Category Breakdown</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
//                 {chartData.map((_, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </>
//       )}
//     </div>
//   );
// }







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
      <ExpenseFilter categories={uniqueCategories} setFilter={setFilter} />
      <ExpenseList entries={filtered} />
    </div>
  );
}
