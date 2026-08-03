import { useState } from "react";

export default function EmailInput({ emails, setEmails }) {
  const [input, setInput] = useState("");

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const addEmail = (email) => {
    const cleanEmail = email.trim();

    if (!cleanEmail || !emailRegex.test(cleanEmail)) return;

    setEmails((prev) => {
      if (prev.includes(cleanEmail)) return prev;
      return [...prev, cleanEmail];
    });
  };

  const convertInputToEmails = () => {
    if (!input.trim()) return;

    const list = input
      .split(/[\s,;\n\r\t]+/)
      .map((email) => email.trim())
      .filter(Boolean);

    list.forEach(addEmail);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if ([" ", "Enter", ",", "Tab"].includes(e.key)) {
      e.preventDefault();
      convertInputToEmails();
    }

    if (e.key === "Backspace" && input === "" && emails.length > 0) {
      setEmails((prev) => prev.slice(0, -1));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const list = pasted
      .split(/[\s,;\n\r\t]+/)
      .map((email) => email.trim())
      .filter(Boolean);

    list.forEach(addEmail);
    setInput("");
  };

  const removeEmail = (email) => {
    setEmails((prev) => prev.filter((item) => item !== email));
  };

  return (
    <div className="flex min-h-[64px] flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20">
      {emails.map((email) => (
        <div key={email} className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          <span>{email}</span>
          <button type="button" onClick={() => removeEmail(email)} className="font-semibold hover:text-red-600" aria-label={`Remove ${email}`}>
            ×
          </button>
        </div>
      ))}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder="Type or paste email addresses"
        className="min-w-[220px] flex-1 bg-transparent text-slate-800 outline-none"
      />
    </div>
  );
}