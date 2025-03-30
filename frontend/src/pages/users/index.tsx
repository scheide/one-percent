import { httpGet } from "@/functions/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    httpGet("api/users").then((data) => setUsers(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-200 mb-6">Users</h1>
        <Link
          href="/"
          className="inline-block bg-gray-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-600 transition mb-6"
        >
          Home
        </Link>
        <a
          href="/users/create"
          className="inline-block bg-blue-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-blue-600 transition mb-6 ml-4"
        >
          Create New User
        </a>
        <ul className="space-y-4">
          {users.map((user: any) => (
            <li
              key={user.id}
              className="bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <a
                href={`/users/${user.id}`}
                className="text-lg font-medium text-blue-400 hover:underline"
              >
                {user.name || user.email}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
