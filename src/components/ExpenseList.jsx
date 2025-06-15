// export default function ExpenseList({ entries }) {
//     console.log('Rendering ExpenseList with entries:', entries.expenses);

//     // Convert the object to an array of objects
//     // const expensesArray = Object.entries(entries).map(([key, value]) => ({
//     //   [key]: value
//     // }));
//     // console.log('Converted expensesArray:', expensesArray);

//     const newData = entries.expenses || [];
//     // Check if entries is an array before using .map()
//     if (!Array.isArray(newData)) {
//       return <p>Error: entries is not an array!</p>;
//     }
//   return (
//     <ul className="space-y-2 mb-10">
//       {newData.map((e, idx) => (
//         <li key={idx} className="border p-2 rounded">
//           ₹{e.amount} - {e.type} - {e.category}
//           {e.subcategory && ` > ${e.subcategory}`} - {e.note || 'No note'}
//           <span className="text-gray-500 text-sm"> ({e.date})</span>
//         </li>
//       ))}
//     </ul>
//   );
// }




import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import EmptyState from './EmptyState';
// import dayjs from 'dayjs'; // For date formatting
// const navigate = useNavigate();
const redirectFunc = () => {
  window.location.href = '/add';
};
export default function ExpenseList({ entries }) {
  console.log('Rendering ExpenseList with entries:', entries);

  const newData = entries.expenses || [];

  // Check if entries is an array before using .map()
  if (!Array.isArray(newData)) {
    return <p>Error: entries is not an array!</p>;
  }

  if (newData.length === 0) {
    // <p>No expenses found. Add some expenses! 
    //   <button onClick={() => { redirectFunc() }} className="text-blue-500 hover:underline p-2 m-2 bg-gray-100 hover:cursor-pointer">Add Expense</button>
    //   </p>
    return (
      <EmptyState />
    );
  }

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <ul className="space-y-4 mb-10">
      <h2 className="text-xl font-bold">Transaction History</h2>
      <hr className="my-4" />
      {newData.map((e, idx) => (
        <li
          key={idx}
          className="border p-4 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-800">
              ₹{e.amount}
            </span>
            <span
              className={`${
                e.type === 'expense' ? 'text-red-600' : 'text-green-600'
              } text-sm font-semibold`}
            >
              {e.type}
            </span>
          </div>
          <div className="text-sm text-gray-700">
            <strong>Category:</strong> {e.category}
            {e.subcategory && (
              <span>
                {' '}
                 <strong>Subcategory:</strong> {e.subcategory}
              </span>
            )}
            <div className="mt-2">
              <strong>Note:</strong> {e.note || 'No note available'}
            </div>
            <div className="mt-1 text-gray-500 text-xs">
              <strong>Date:</strong> {formatDate(e.date)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
