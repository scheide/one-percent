import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to store user email

  const handleSignIn = () => {
    try {
      router.push('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Failed to navigate to /login:', error);
    }
  };

  const handleSignUp = () => {
    router.push('/users/create');
  };

  const handleEditProfile = () => {
    router.push('/profile/edit'); // Redirect to edit profile page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      {userEmail && (
        <div className="absolute top-4 right-4 flex items-center gap-4">
          <span className="text-gray-300 font-medium">{userEmail}</span>
          <button
            onClick={handleEditProfile}
            className="text-sm bg-gray-700 text-gray-300 py-1 px-3 rounded-lg hover:bg-gray-600 transition"
          >
            Edit Profile
          </button>
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-300 mb-8">One Percent Better</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleSignIn}
          className="w-48 text-center bg-blue-800 text-gray-200 py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
        <button
          onClick={handleSignUp}
          className="w-48 text-center bg-green-800 text-gray-200 py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
