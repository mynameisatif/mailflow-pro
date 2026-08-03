import { useEffect, useState } from "react";
import api, { buildAuthUrl } from "../services/api";
import Layout from "../components/Layout";
import EmailForm from "../components/EmailForm";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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

  if (!user) {
    return (
      <Layout>
        <section className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 py-10 shadow-[0_30px_90px_rgba(15,23,42,0.28)] sm:px-10 lg:px-16 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.18),_transparent_30%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-blue-100 backdrop-blur">
                ✦ Premium email automation for modern teams
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                MailFlow Pro
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-300 sm:text-xl">
                Send polished email campaigns and personal messages directly from your Gmail account with a secure, elegant experience.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => {
                    window.location.href = buildAuthUrl("/auth/google");
                  }}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Continue with Google
                </button>
                <div className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-medium text-slate-200 backdrop-blur">
                  Secure • Fast • Gmail-powered
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[24px] bg-gradient-to-br from-white to-blue-50 p-6 text-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Inbox</p>
                    <h2 className="mt-2 text-2xl font-semibold">Ready to send</h2>
                  </div>
                  <div className="rounded-2xl bg-blue-600/10 p-3 text-blue-600">✉️</div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Recipients</p>
                    <p className="mt-1 font-semibold text-slate-900">24 contacts</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-500">Status</p>
                    <p className="mt-1 font-semibold text-emerald-600">Authenticated with Google</p>
                  </div>
                </div>
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