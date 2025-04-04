import { httpGet } from "@/functions/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ViewUser() {
  const router = useRouter();
  const { id } = router.query;
  interface User {
    name?: string;
    email: string;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      httpGet(`/api/users/${id}`).then((data) => setUser(data));
    }
  }, [id]);

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <p className="text-gray-300 text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-200">
          {user.name || user.email}
        </h1>
        <p className="text-gray-400 mb-6">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <a
          href={`/users/${id}/edit`}
          className="inline-block bg-blue-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Edit
        </a>
      </div>
    </div>
  );
}
