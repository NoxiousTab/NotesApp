import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">NotesVault</h1>
      <p className="text-xl mb-10 text-center max-w-lg drop-shadow-md">
        A modern, vibrant notes app to create, edit, and organize your notes with style.
      </p>
      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-purple-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
        >
          Register
        </button>
      </div>
    </div>
  );
}
