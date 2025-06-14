// // src/pages/Login.jsx
// import { useState } from 'react';

// function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [msg, setMsg] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(`${import.meta.env.VITE_API_URL}/auth/login`)
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       else setMsg('Login successful!');
//       // Save token in context or localStorage if needed

//     } catch (err) {
//       setMsg(err.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="email" className="w-full p-2 border" placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//         <input type="password" className="w-full p-2 border" placeholder="Password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
//         {msg && <p className="text-red-600">{msg}</p>}
//       </form>
//     </div>
//   );
// }

// export default Login;



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       login(data);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="email" name="email" placeholder="Email" className="w-full p-2 border" onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" className="w-full p-2 border" onChange={handleChange} />
//         <button type="submit" className="bg-green-600 text-white px-4 py-2">Login</button>
//         {error && <p className="text-red-500">{error}</p>}
//       </form>
//     </div>
//   );
// }






import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data, "data");
      if (!res.ok) throw new Error(data.message);
      if (res.ok) {
        login(data.token, data.user); // ← your auth context method
        navigate("/dashboard"); // ← redirect after login
      }
      // navigate("/dashboard");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 mt-10 space-y-3">
      <h2 className="text-xl font-bold">Login</h2>
      <input type="email" placeholder="Email" className="w-full p-2 border"
        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" className="w-full p-2 border"
        value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
      {msg && <p className="text-red-500">{msg}</p>}
    </form>
  );
};

export default Login;
