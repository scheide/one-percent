import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { httpPost } from "@/functions/api";

export default function CreateActivity() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get user ID from localStorage
    const userId = JSON.parse(localStorage.getItem("onePercentUserId") || "{}");
    if (userId) {
      setUserId(userId);
    } else {
      console.error("User ID not found in localStorage");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }
    await httpPost("/api/activities", {
      title,
      description,
      date,
      userId,
    });
    router.push("/activities");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-200">
          Create Activity
        </h1>
        <div className="mb-4">
          <label className="block text-gray-400 font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 font-medium mb-2">
            Description
          </label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 font-medium mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
}
