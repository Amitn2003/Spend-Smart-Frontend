import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  console.log('User data:', JSON.parse(user));
  if (!user) {
    return <p className="text-center text-red-500">Loading user data...</p>;
  }
  const userData = JSON.parse(user);
  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {userData.username || "N/A"}</p>
        {/* <p><strong>Username:</strong> {user?.user_name || "N/A"}</p> */}
        <p><strong>Email:</strong> {userData?.email || "N/A"}</p>
        {/* <p><strong>Phone:</strong> {user?.phone || "N/A"}</p> */}
        {/* <p><strong>Age:</strong> {user?.age || "N/A"}</p> */}
        {/* <p><strong>Gender:</strong> {user?.gender || "N/A"}</p> */}
      </div>
    </div>
  );
}
