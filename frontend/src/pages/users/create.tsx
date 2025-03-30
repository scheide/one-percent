import { useState } from "react";
import { useRouter } from "next/router";
import { httpPost } from "@/functions/api";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    httpPost("/api/users", {
      email,
      name,
      password,
    });
    router.push("/users");
  };

  return (
    <div className="dark bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Create Your Account</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-gray-800 text-gray-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-800 text-gray-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-800 text-gray-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="bg-green-800 text-gray-200 py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
