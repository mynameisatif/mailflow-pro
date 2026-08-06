import { useEffect, useState } from "react";
import api, { buildAuthUrl } from "../services/api";
import Layout from "../components/Layout";
import EmailForm from "../components/EmailForm";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [guestMode, setGuestMode] = useState(false);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        if (res.data?.success && res.data?.user) {
          setUser(res.data.user);
        }
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="rounded-3xl border border-white/50 bg-white/70 px-8 py-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="mx-auto mb-3 h-3 w-20 animate-pulse rounded-full bg-blue-500" />
            <h2 className="text-xl font-semibold text-slate-800">Checking your session...</h2>
            <p className="mt-2 text-sm text-slate-500">Please wait a moment.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (guestMode) {
    return (
      <Layout>
        <div className="mb-6 rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Guest mode enabled</h2>
              <p className="mt-2 text-sm text-slate-500">
                You can send emails immediately without signing in. Your personal Gmail address will not be used. A random sender address will be used instead.
              </p>
            </div>
            <button
              onClick={() => setGuestMode(false)}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to login options
            </button>
          </div>
        </div>

        <EmailForm guest />
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <section className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 py-10 shadow-[0_30px_90px_rgba(15,23,42,0.28)] sm:px-10 lg:px-16 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.18),_transparent_30%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-blue-100 backdrop-blur">
                ✦ Two easy ways to start
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                MailFlow Pro
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-300 sm:text-xl">
                Choose the option that fits you best.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm text-slate-200 shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                  <div className="font-semibold text-white">Login with Google</div>
                  <p className="mt-1">By login with Google you can send mail using your email address.</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm text-slate-200 shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                  <div className="font-semibold text-white">Login as guest</div>
                  <p className="mt-1">Otherwise random mail will be used to send mail.</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => {
                    window.location.href = buildAuthUrl("/auth/google");
                  }}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Continue with Google
                </button>
                <button
                  onClick={() => setGuestMode(true)}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-slate-50/90 px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Login as guest
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-white/80 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user.photo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name || user.email || "User")}
            alt="Profile"
            className="h-14 w-14 rounded-full border border-slate-200 object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Welcome back, {user.name || "there"}</h2>
            <p className="text-sm text-slate-500">{user.email || "Your inbox is ready"}</p>
          </div>
        </div>

        <button
          onClick={() => {
            window.location.href = buildAuthUrl("/auth/logout");
          }}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Logout
        </button>
      </div>

      <EmailForm />
    </Layout>
  );
}