import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import EmailForm from "../components/EmailForm";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.isAuthenticated) {
          setUser(res.data.user);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-2xl font-semibold">Loading...</h2>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center h-[70vh] gap-6">

          <h1 className="text-5xl font-bold text-blue-600">
            MailFlow Pro
          </h1>

          <p className="text-gray-600 text-lg text-center max-w-lg">
            Send bulk emails directly from your own Gmail account using Google Authentication.
          </p>

          <button
            onClick={() =>
              (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`)
            }
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
          >
            Continue with Google
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold">
            Welcome, {user.profile.displayName}
          </h2>

          <p className="text-gray-500">
            {user.profile.emails[0].value}
          </p>
        </div>

        <button
          onClick={() =>
            (window.location.href = `${import.meta.env.VITE_API_URL}/auth/logout`)
          }
          className="bg-gray-800 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <EmailForm />
    </Layout>
  );
}