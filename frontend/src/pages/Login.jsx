export default function Login() {
  const login = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={login}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Continue with Google
      </button>
    </div>
  );
}