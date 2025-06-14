import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { token, logout, user, setUser } = useAuth(); // Assuming `setUser` is available in your context.
  const [username, setUsername] = useState(""); // State to track username

  useEffect(() => {
    // Update username whenever the user object is available
    if (user && user.username) {
      setUsername(user.username);
    } else {
      setUsername("Guest");
    }
  }, [user]); // Effect runs whenever user changes

  useEffect(() => {
    // If the token exists, fetch the user details
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            console.error('Failed to fetch user:', response.statusText);
            return;
          }

          const data = await response.json();
          setUser(data); // Update the user context with the fetched data
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }
  }, [token, setUser]); // Dependency array: runs when the token changes

  if(!token || !user) {
    return (
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <div className="space-x-4">
          <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <Link to="/" className="hover:underline hover:text-indigo-600 hover:cursor-pointer">
                <h1 className="text-2xl font-bold text-indigo-600">PaisaManager</h1>
              </Link>
              <nav className="space-x-4">
                
                <Link
                  to="/login"
                  className="text-indigo-600 border px-4 py-2 rounded hover:bg-indigo-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </nav>
            </div>
          </header>
        </div>
      </nav>
    );
  }








  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between sm:mb-8 mb-2">
      <div className="space-x-4">
        <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="hover:underline hover:text-indigo-600 hover:cursor-pointer">
              <h1 className="text-2xl font-bold text-indigo-600">PaisaManager</h1>
            </Link>
            
            {/* Check if user is logged in (either token or user present) */}

            <nav className="space-x-4">
              <Link to="/dashboard" className="hover:underline text-indigo-600">
                Dashboard
              </Link>
              <Link to="/add" className="hover:underline text-indigo-600">
                  Add Entry
                </Link>
                <Link to="/profile" className="hover:underline text-indigo-600">
                  Profile
                </Link>
                {/* <Link to="/settings" className="hover:underline text-indigo-600">
                  Settings
                </Link> */}
                {/* <span className="mx-1">Hi, {username || "Guest"}</span> */}

                
                {/* <button onClick={logout} className="bg-red-100 text-slate-900 px-1 py-1 rounded">
                  Logout
                </button> */}
              </nav>
            
          </div>
        </header>
      </div>
      <br />
    </nav>
  );
}
