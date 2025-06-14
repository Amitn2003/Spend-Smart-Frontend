import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';


export default function Profile() {
  const { user, logout } = useAuth();

  let userData = {};

  useEffect(() => {
    // If user data is not available, we can log it or handle it accordingly
    if (!user) {
      console.warn("User data is not available yet.");
    }
    let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // You can show a custom "Install App" button
});

function handleInstallClick() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === "accepted") {
        console.log("User installed the app");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  }
}
handleInstallClick();
  }, []);




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
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {userData.username || "N/A"}</p>
        <p><strong>Email:</strong> {userData.email || "N/A"}</p>
        <p><strong>Role:</strong> {userData.role || "N/A"}</p>
        <p><strong>UserId:</strong> {userData.id || "N/A"}</p>
        {/* Add additional fields as needed */}
      </div>

      
      <button onClick={logout} className="bg-red-100 text-slate-900 px-1 py-1 rounded cursor-pointer mt-4">
                  Logout
                </button>


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
