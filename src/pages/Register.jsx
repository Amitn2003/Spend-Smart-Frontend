// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: '', email: '', password: ''
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       navigate('/login');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="name" placeholder="Name" className="w-full p-2 border" onChange={handleChange} />
//         <input type="email" name="email" placeholder="Email" className="w-full p-2 border" onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" className="w-full p-2 border" onChange={handleChange} />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2">Register</button>
//         {error && <p className="text-red-500">{error}</p>}
//       </form>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [navigate, login]);

  // const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(form, "form")
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data, "data")
      if (!res.ok) throw new Error(data.message);
      if(res.ok && res  .status === 201) {
        console.log("Registration successful");
        // console.log("Response data:", data);
        login(data.token, data.user); // Assuming your auth context has a login method
        console.log("User logged in:", data.user);
        useNavigate("/dashboard"); // Redirect to dashboard after successful registration
        // window.location.reload(); // Reload the page to update user state
        setForm({ username: "", email: "", password: "" }); // Reset form
        setMsg("Registration successful! Now login.");
      }
      // setMsg("Registered! Now login.");
      // setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-4 mt-10 space-y-3">
      <h2 className="text-xl font-bold">Register</h2>
      <input type="text" placeholder="Username" className="w-full p-2 border"
        value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="email" placeholder="Email" className="w-full p-2 border"
        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" className="w-full p-2 border"
        value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      {msg && <p className="text-red-500">{msg}</p>}
    </form>
  );
};

export default Register;
