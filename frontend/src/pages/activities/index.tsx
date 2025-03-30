import { httpGet, httpDelete } from "@/functions/api";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function ActivitiesList() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Get the logged-in user's ID from localStorage
    const userId = localStorage.getItem("onePercentUserId");
    if (userId) {
      httpGet(`/api/users/${userId}/activities`).then((data) => {
        setActivities(data);
        setFilteredActivities(data); // Initialize filtered activities
      });
    } else {
      console.error("User ID not found in localStorage");
    }
  }, []);

  useEffect(() => {
    // Automatically filter activities when searchQuery, startDate, or endDate changes
    let filtered = activities;

    // Filter by search query (name or description)
    if (searchQuery) {
      filtered = filtered.filter(
        (activity: any) =>
          activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(
        (activity: any) => new Date(activity.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (activity: any) => new Date(activity.date) <= new Date(endDate)
      );
    }

    setFilteredActivities(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchQuery, startDate, endDate, activities]);

  const handleRemove = async (id: number) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      await httpDelete(`/api/activities/${id}`);
      setActivities((prev) => prev.filter((activity: any) => activity.id !== id));
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentActivities = filteredActivities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6 text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">My Activities</h1>
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by name or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-200"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-200"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-200"
            />
          </div>
        </div>
        <a
          href="/activities/create"
          className="inline-block bg-green-600 text-gray-200 p-3 rounded-full hover:bg-green-500 transition mb-6"
          title="New Activity"
        >
          <FaPlus />
        </a>
        <ul className="space-y-4">
          {currentActivities.map((activity: any) => (
            <li
              key={activity.id}
              className="bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-green-400">
                    {activity.title}
                  </h2>
                  <p className="text-gray-400">{activity.description}</p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(activity.date).toISOString().split("T")[0]}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/activities/${activity.id}/edit`}
                    className="bg-blue-700 text-gray-200 p-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
                    title="Edit"
                  >
                    <FaEdit />
                  </a>
                  <button
                    onClick={() => handleRemove(activity.id)}
                    className="bg-red-700 text-gray-200 p-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center"
                    title="Remove"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
