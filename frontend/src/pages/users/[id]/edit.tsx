import { httpGet, httpPost } from "@/functions/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      httpGet(`/api/users/${id}`).then((data) => {
        setEmail(data.email);
        setName(data.name || "");
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    httpPost(`/api/users/${id}`, {
      email,
      name,
    });
    router.push(`/users/${id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-200">
          Edit User
        </h1>
        <div className="mb-4">
          <label className="block text-gray-400 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
}
