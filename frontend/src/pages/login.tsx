import { httpPost } from '@/functions/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
// import { GetServerSideProps } from 'next';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { req } = context;

//   // Simulate checking user authentication status (replace with actual logic)
//   const isAuthenticated = false; // Replace with real authentication check

//   if (isAuthenticated) {
//     // Simulate checking user activity status (replace with actual logic)
//     const userHasCompletedActivities = false; // Replace with real check

//     if (!userHasCompletedActivities) {
//       return {
//         redirect: {
//           destination: '/activities', // Redirect to activities page
//           permanent: false,
//         },
//       };
//     }
//   }

//   return {
//     props: {}, // Pass props to the page if needed
//   };
// };

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>(''); // Input state for email
  const [password, setPassword] = useState<string>(''); // Input state for password
  const [error, setError] = useState<string | null>(null); // State to store error messages

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const response = await httpPost('/api/users/login', { email, password });

      if (!response.ok) {
        console.error('Login error:', response); // Log error details for debugging
        throw new Error(response.message || 'Invalid email or password');
      }

      console.log('Login successful:', response); // Log success response for debugging
      localStorage.setItem('onePercentUserId', response.user.id); // Persist user data
      router.push('/activities'); // Redirect to activities page
    } catch (err: any) {
      console.error('Error during login:', err); // Log error for debugging
      setError(err.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="dark bg-gray-800 text-gray-300 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-80"
      >
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-700 text-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-700 text-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
        <button
          type="submit"
          className="bg-blue-800 text-gray-200 py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
