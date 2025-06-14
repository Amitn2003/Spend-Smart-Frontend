import React from 'react'
import ExpenseForm from '../components/ExpenseForm'
const EntryForm = () => {
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
  return (<>
  <ExpenseForm onSubmit={handleAdd} />
  </>
  )
}

export default EntryForm