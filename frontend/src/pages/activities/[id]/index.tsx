import { httpGet } from "@/functions/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ViewActivity() {
  const router = useRouter();
  const { id } = router.query;

  interface Activity {
    title: string;
    description: string;
    date: string;
  }

  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    if (id) {
      httpGet(`/api/activities/${id}`).then((data) => setActivity(data));
    }
  }, [id]);

  if (!activity)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          {activity.title}
        </h1>
        <p className="text-gray-700 mb-4">{activity.description}</p>
        <p className="text-gray-600 mb-6">
          <span className="font-medium">Date:</span>{" "}
          {new Date(activity.date).toLocaleDateString()}
        </p>
        <a
          href={`/activities/${id}/edit`}
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Edit
        </a>
      </div>
    </div>
  );
}
