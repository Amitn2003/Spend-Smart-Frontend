// import { useAuth } from '../context/AuthContext';

// export default function Profile() {
//   const { user } = useAuth();
//   // console.log('User data:', JSON.parse(user));
//   const userData = {};
//   if (!user) {
//     return <p className="text-center text-red-500">Loading user data...</p>;
//   }else {
//     userData = user ? JSON.parse(user) : {};
//   }
//   return (
//     <div className="max-w-2xl mx-auto p-8 mt-10 bg-white shadow-md rounded">
//       <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
//       <div className="space-y-3">
//         <p><strong>Name:</strong> {(user && userData.username) || "N/A"}</p>
//         {/* <p><strong>Username:</strong> {user?.user_name || "N/A"}</p> */}
//         <p><strong>Email:</strong> {(user && userData.email) || "N/A"}</p>
//         {/* <p><strong>Phone:</strong> {user?.phone || "N/A"}</p> */}
//         {/* <p><strong>Age:</strong> {user?.age || "N/A"}</p> */}
//         {/* <p><strong>Gender:</strong> {user?.gender || "N/A"}</p> */}
//       </div>
//     </div>
//   );
// }


import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  let userData = {};

  // If user data is loading
  if (!user) {
    return <p className="text-center text-red-500">Loading user data...</p>;
  }

  try {
    // Check if user is a string and try to parse it
    if (typeof user === 'string') {
      userData = JSON.parse(user);
    } else {
      // If it's already an object, assign it directly
      userData = user;
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
    // Optionally, set default data in case of an error
    userData = { username: "N/A", email: "N/A" };
  }

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {userData.username || "N/A"}</p>
        <p><strong>Email:</strong> {userData.email || "N/A"}</p>
        {/* Add additional fields as needed */}
      </div>
    </div>
  );
}
