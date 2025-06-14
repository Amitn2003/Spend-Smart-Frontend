// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();


// const navigate = useNavigate();

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?._id) setUser(data);
        })
        .catch(() => logout());
    }
  }, [token]);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    // useNavigate('/dashboard'); // Redirect to dashboard after login
    // window.location.reload(); // This will reload the entire page
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    useNavigate('/'); // Redirect to login page after logout
    window.location.reload(); // This will reload the entire page
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);








// import { createContext, useContext, useEffect, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     if (token) {
//       fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data?._id) setUser(data);
//         })
//         .catch(() => logout());
//     }
//   }, [token]);

//   const login = (data) => {
//     localStorage.setItem('token', data.token);
//     setToken(data.token);
//     setUser(data.user);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);