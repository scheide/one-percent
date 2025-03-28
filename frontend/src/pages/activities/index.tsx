import { httpGet } from "@/functions/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ActivitiesList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    httpGet("api/activities").then((data) => setActivities(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Activities</h1>
        <Link
          href="/"
          className="inline-block bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition mb-6"
        >
          Home
        </Link>
        <a
          href="/activities/create"
          className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition mb-6 ml-4"
        >
          Create New Activity
        </a>
        <ul className="space-y-4">
          {activities.map((activity: any) => (
            <li
              key={activity.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <a
                href={`/activities/${activity.id}`}
                className="text-lg font-medium text-green-500 hover:underline"
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
