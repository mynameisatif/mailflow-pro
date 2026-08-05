import { useState } from "react";
import EmailInput from "./EmailInput";
import api from "../services/api";

export default function EmailForm({ guest = false }) {
  const [emails, setEmails] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emails.length === 0) {
      alert("Please add at least one recipient email.");
      return;
    }

    if (!subject.trim()) {
      alert("Please enter a subject.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/send-email", {
        emails,
        subject,
        message,
        guest,
      });

      if (response.data?.success) {
        alert("Emails sent successfully!");
        setEmails([]);
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[30px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8"
    >
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Composer</p>
          <h3 className="text-2xl font-semibold text-slate-900">Send a polished message</h3>
          {guest ? (
            <p className="mt-2 text-sm text-blue-700">
              Guest mode enabled — your email address will not be used.
            </p>
          ) : null}
        </div>
        <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          {emails.length} recipient{emails.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Recipients</label>
          <EmailInput emails={emails} setEmails={setEmails} />
          <p className="mt-2 text-sm text-slate-500">
            Separate addresses with spaces, commas, or Enter. You can also paste multiple emails at once.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Subject</label>
          <input
            type="text"
            placeholder="Share your update, offer, or welcome note"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Message</label>
          <textarea
            rows={10}
            placeholder="Write your email here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
          <label className="mb-2 block text-sm font-semibold text-slate-700">Attachment</label>
          <input type="file" accept=".pdf" disabled className="block w-full cursor-not-allowed opacity-60" />
          <p className="mt-2 text-sm text-slate-500">PDF attachments will be available in a future update.</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-2xl px-4 py-3.5 font-semibold text-white transition ${loading ? "cursor-not-allowed bg-slate-400" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"}`}
        >
          {loading ? "Sending messages..." : guest ? "Send as guest" : "Send emails"}
        </button>
      </div>
    </form>
  );
}