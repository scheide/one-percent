export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome</h1>
      <nav className="flex flex-col gap-4">
        <a
          href="/users"
          className="w-48 text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Users
        </a>
        <a
          href="/activities"
          className="w-48 text-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Activities
        </a>
      </nav>
    </div>
  );
}
