import { httpGet, httpPut } from "@/functions/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa"; // Import icons for Save and Cancel

export default function EditActivity() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (id) {
      httpGet(`/api/activities/${id}`).then((data) => {
        setTitle(data.title);
        setDescription(data.description || "");
        setDate(data.date.split("T")[0]); // Format date for input
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await httpPut(`/api/activities/${id}`, {
      title,
      description,
      date,
    });
    router.push("/activities"); // Redirect to activities list page
  };

  const handleCancel = () => {
    router.push("/activities"); // Redirect to activities list page
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-6 bg-gray-900 shadow-md rounded-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-200">Edit Activity</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Title
        </label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 text-gray-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Description
        </label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 text-gray-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 text-gray-200"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="w-1/2 bg-blue-700 text-gray-200 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
        >
          <FaSave className="text-xl" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-1/2 bg-gray-700 text-gray-200 py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>
    </form>
  );
}
