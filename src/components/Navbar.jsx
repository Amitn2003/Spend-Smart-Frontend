// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//   const { token, logout, user, setUser } = useAuth(); // Assuming `setUser` is available in your context.
//   const [username, setUsername] = useState(""); // State to track username

//   useEffect(() => {
//     // Update username whenever the user object is available
//     if (user && user.username) {
//       setUsername(user.username);
//     } else {
//       setUsername("Guest");
//     }
//   }, [user]); // Effect runs whenever user changes

//   useEffect(() => {
//     // If the token exists, fetch the user details
//     if (token) {
//       const fetchUser = async () => {
//         try {
//           const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           if (!response.ok) {
//             console.error('Failed to fetch user:', response.statusText);
//             return;
//           }

//           const data = await response.json();
//           setUser(data); // Update the user context with the fetched data
//         } catch (error) {
//           console.error('Error fetching user:', error);
//         }
//       };
//       fetchUser();
//     }
//   }, [token, setUser]); // Dependency array: runs when the token changes

//   if(!token || !user) {
//     return (
//       <nav className="bg-gray-800 text-white p-4 flex justify-between">
//         <div className="space-x-4">
//           <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
//             <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//               <Link to="/" className="hover:underline hover:text-indigo-600 hover:cursor-pointer">
//                 <h1 className="text-2xl font-bold text-indigo-600">PaisaManager</h1>
//               </Link>
//               <nav className="space-x-4">
                
//                 <Link
//                   to="/login"
//                   className="text-indigo-600 border px-4 py-2 rounded hover:bg-indigo-50"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//                 >
//                   Sign Up
//                 </Link>
//               </nav>
//             </div>
//           </header>
//         </div>
//       </nav>
//     );
//   }




//   return (
//     <nav className="bg-gray-800 text-white p-4 flex justify-between sm:mb-8 mb-2">
//       <div className="space-x-4">
//         <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
//           <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//             <Link to="/" className="hover:underline hover:text-indigo-600 hover:cursor-pointer">
//               <h1 className="text-2xl font-bold text-indigo-600">PaisaManager</h1>
//             </Link>
            
//             {/* Check if user is logged in (either token or user present) */}

//             <nav className="space-x-4">
//               <Link to="/dashboard" className="hover:underline text-indigo-600 font-weight-bold hover:cursor-pointer">
//                 Dashboard
//               </Link>
//               <Link to="/add" className="hover:underline text-indigo-600">
//                   Add Entry
//                 </Link>
//                 <Link to="/profile" className="hover:underline text-indigo-600">
//                   Profile
//                 </Link>
//                 {/* <Link to="/settings" className="hover:underline text-indigo-600">
//                   Settings
//                 </Link> */}
                

//               </nav>
            
//           </div>
//         </header>
//       </div>
//     </nav>
//   );
// }








// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function Navbar() {
//   const { token, logout, user, setUser } = useAuth();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   useEffect(() => {
//     if (token) {
//       const fetchUser = async () => {
//         try {
//           const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           if (response.ok) {
//             const data = await response.json();
//             setUser(data);
//           }
//         } catch (error) {
//           console.error('Error fetching user:', error);
//         }
//       };
//       fetchUser();
//     }
//   }, [token, setUser]);

//   const navItems = [
//     { label: 'Dashboard', path: '/dashboard' },
//     { label: 'Add Entry', path: '/add' },
//     { label: 'Profile', path: '/profile' },
//   ];

//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);

//   const drawerList = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
//       <List>
//         {navItems.map((item) => (
//           <ListItem button key={item.path} component={Link} to={item.path}>
//             <ListItemText primary={item.label} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
//             PaisaManager
//           </Link>
//         </Typography>
//         {isMobile ? (
//           <>
//             <IconButton size="large" edge="end" color="inherit" onClick={toggleDrawer}>
//               <MenuIcon />
//             </IconButton>
//             <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
//               {drawerList}
//             </Drawer>
//           </>
//         ) : (
//           <Box sx={{ display: 'flex' }}>
//             {navItems.map((item) => (
//               <Button key={item.path} color="inherit" component={Link} to={item.path}>
//                 {item.label}
//               </Button>
//             ))}
//             {user ? (
//               <Button color="inherit" onClick={logout}>
//                 Logout
//               </Button>
//             ) : (
//               <>
//                 <Button color="inherit" component={Link} to="/login">
//                   Login
//                 </Button>
//                 <Button color="inherit" component={Link} to="/register">
//                   Sign Up
//                 </Button>
//               </>
//             )}
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }










// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function Navbar() {
//   const { token, logout, user, setUser } = useAuth();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   useEffect(() => {
//     if (token) {
//       const fetchUser = async () => {
//         try {
//           const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           if (response.ok) {
//             const data = await response.json();
//             setUser(data);
//           }
//         } catch (error) {
//           console.error('Error fetching user:', error);
//         }
//       };
//       fetchUser();
//     }
//   }, [token, setUser]);

//   const navLinks = [
//     { label: 'Dashboard', path: '/dashboard' },
//     { label: 'Add Entry', path: '/add' },
//     { label: 'Profile', path: '/profile' },
//   ];

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);

//   const drawerList = (
//     <Box sx={{ width: 250 }} onClick={toggleDrawer}>
//       <List>
//         {navLinks.map(({ label, path }) => (
//           <ListItem button component={Link} to={path} key={path}>
//             <ListItemText primary={label} />
//           </ListItem>
//         ))}
//         {token ? (
//           <ListItem button onClick={logout}>
//             <ListItemText primary="Logout" />
//           </ListItem>
//         ) : (
//           <>
//             <ListItem button component={Link} to="/login">
//               <ListItemText primary="Login" />
//             </ListItem>
//             <ListItem button component={Link} to="/register">
//               <ListItemText primary="Sign Up" />
//             </ListItem>
//           </>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar position="sticky" sx={{ backgroundColor: '#4F46E5' /* indigo-600 */ }}>
//       <Toolbar sx={{ justifyContent: 'space-between' }}>
//         <Typography
//           variant="h6"
//           component={Link}
//           to="/"
//           sx={{
//             textDecoration: 'none',
//             color: 'white',
//             fontWeight: 700,
//             fontSize: '1.5rem',
//           }}
//         >
//           PaisaManager
//         </Typography>

//         {isMobile ? (
//           <>
//             <IconButton
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               onClick={toggleDrawer}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
//               {drawerList}
//             </Drawer>
//           </>
//         ) : (
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             {navLinks.map(({ label, path }) => (
//               <Button
//                 key={path}
//                 component={Link}
//                 to={path}
//                 sx={{ color: 'white', fontWeight: 500 }}
//               >
//                 {label}
//               </Button>
//             ))}
//             {token ? (
//               <Button onClick={logout} sx={{ color: 'white', fontWeight: 500 }}>
//                 Logout
//               </Button>
//             ) : (
//               <>
//                 <Button component={Link} to="/login" sx={{ color: 'white' }}>
//                   Login
//                 </Button>
//                 <Button
//                   component={Link}
//                   to="/register"
//                   variant="contained"
//                   sx={{
//                     backgroundColor: '#6366F1', // indigo-500
//                     color: 'white',
//                     '&:hover': { backgroundColor: '#4F46E5' }, // indigo-600
//                   }}
//                 >
//                   Sign Up
//                 </Button>
//               </>
//             )}
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }












import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const { token, logout, user, setUser } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }
  }, [token, setUser]);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Add Entry', path: '/add' },
    { label: 'Profile', path: '/profile' },
  ];

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        {token ? (
          <>
            {navLinks.map(({ label, path }) => (
              <ListItem button component={Link} to={path} key={path}>
                <ListItemText primary={label} />
              </ListItem>
            ))}
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#4F46E5' /* indigo-600 */ }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.5rem',
          }}
          aria-label="PaisaManager Home"
        >
          PaisaManager
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
              {drawerList}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {token ? (
              <>
                {navLinks.map(({ label, path }) => (
                  <Button
                    key={path}
                    component={Link}
                    to={path}
                    sx={{
                      color: 'white',
                      fontWeight: 500,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {label}
                  </Button>
                ))}
                <Button
                  onClick={logout}
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: 'white',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    backgroundColor: '#6366F1', // indigo-500
                    color: 'white',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#4F46E5' }, // indigo-600
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
