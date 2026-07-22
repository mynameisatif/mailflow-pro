import { useState } from "react";

export default function EmailInput({ emails, setEmails }) {
  const [input, setInput] = useState("");

  const addEmail = (email) => {
    email = email.trim();

    if (!email) return;

    if (!emails.includes(email)) {
      setEmails((prev) => [...prev, email]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      addEmail(input);
      setInput("");
    }
  };

  const handleBlur = () => {
    if (input.trim()) {
      addEmail(input);
      setInput("");
    }
  };

  const removeEmail = (email) => {
    setEmails((prev) => prev.filter((item) => item !== email));
  };

  return (
    <div className="border rounded-lg p-3 min-h-[120px] flex flex-wrap gap-2">

      {emails.map((email) => (
        <div
          key={email}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
        >
          {email}

          <button
            type="button"
            onClick={() => removeEmail(email)}
            className="font-bold"
          >
            ×
          </button>
        </div>
      ))}

      <input
        type="text"
        value={input}
        placeholder="Type email and press Enter..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="flex-1 min-w-[220px] outline-none"
      />
    </div>
  );
}