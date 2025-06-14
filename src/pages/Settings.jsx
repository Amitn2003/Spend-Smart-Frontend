import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, token } = useAuth();
  const [username, setUsername] = useState(user?.user_name || '');
  const [password, setPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/put/${user.reg_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ user_name: username, user_password: password }),
    });

    if (res.ok) {
      alert("Updated successfully. Please re-login.");
      localStorage.clear();
      window.location.href = '/login';
    } else {
      alert("Update failed");
    }
  };




  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        console.log('PWA installed');
        setDeferredPrompt(null);
      }
    }
  };





  return (
    <div className="max-w-xl mx-auto p-8 mt-10 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">⚙️ Settings</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-semibold">Username</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">New Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>



      {deferredPrompt && (
        <button
          onClick={handleInstall}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          📲 Install App
        </button>
      )}
    </div>
  );
}
