import { useState } from "react";
import EmailInput from "./EmailInput";
import axios from "axios";

export default function EmailForm() {
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/send-email`,        {
          emails,
          subject,
          message,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Backend Response:", response.data);

      if (response.data.success) {
        alert("Emails sent successfully!");

        console.table(response.data.results);

        // Reset form
        setEmails([]);
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Failed to connect to server.");
      }
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      {/* Recipients */}
      <div>
        <label className="block font-semibold mb-2">
          Recipients
        </label>

        <EmailInput
          emails={emails}
          setEmails={setEmails}
        />

        <p className="text-sm text-gray-500 mt-2">
          Type an email and press <b>Enter</b> after each email.
        </p>
      </div>

      {/* Subject */}
      <div>
        <label className="block font-semibold mb-2">
          Subject
        </label>

        <input
          type="text"
          placeholder="Enter email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block font-semibold mb-2">
          Message
        </label>

        <textarea
          rows={10}
          placeholder="Write your email..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Resume Upload */}
      <div>
        <label className="block font-semibold mb-2">
          Resume Attachment (Coming Soon)
        </label>

        <input
          type="file"
          accept=".pdf"
          disabled
          className="block w-full cursor-not-allowed opacity-50"
        />

        <p className="text-sm text-gray-500 mt-2">
          PDF attachment will be added in the next step.
        </p>
      </div>

      {/* Send Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-lg font-semibold text-white transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Sending..." : "🚀 Send Emails"}
      </button>
    </form>
  );
}