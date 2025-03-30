import { httpGet } from "@/functions/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ActivitiesList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Get the logged-in user's ID from localStorage
    const userId = localStorage.getItem("onePercentUserId");
    if (userId) {
      httpGet(`/api/users/${userId}/activities`).then((data) =>
        setActivities(data)
      );
    } else {
      console.error("User ID not found in localStorage");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 p-6 text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">My Activities</h1>
        <Link
          href="/"
          className="inline-block bg-gray-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-600 transition mb-6"
        >
          Home
        </Link>
        <a
          href="/activities/create"
          className="inline-block bg-green-600 text-gray-200 py-2 px-4 rounded-lg hover:bg-green-500 transition mb-6 ml-4"
        >
          Create New Activity
        </a>
        <ul className="space-y-4">
          {activities.map((activity: any) => (
            <li
              key={activity.id}
              className="bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <a
                href={`/activities/${activity.id}`}
                className="text-lg font-medium text-green-400 hover:underline"
              >
                {activity.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
