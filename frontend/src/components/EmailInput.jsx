import { useState } from "react";

export default function EmailInput({ emails, setEmails }) {
  const [input, setInput] = useState("");

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // Add a single email
  const addEmail = (email) => {
    const cleanEmail = email.trim();

    if (!cleanEmail) return;

    if (!emailRegex.test(cleanEmail)) return;

    setEmails((prev) => {
      if (prev.includes(cleanEmail)) return prev;
      return [...prev, cleanEmail];
    });
  };

  // Convert all typed emails into chips
  const convertInputToEmails = () => {
    if (!input.trim()) return;

    const list = input
      .split(/[\s,;\n\r\t,]+/)
      .map((email) => email.trim())
      .filter(Boolean);

    list.forEach(addEmail);

    setInput("");
  };

  const handleKeyDown = (e) => {
    // Space, Enter, Comma or Tab creates chips
    if (
      e.key === " " ||
      e.key === "Enter" ||
      e.key === "," ||
      e.key === "Tab"
    ) {
      e.preventDefault();
      convertInputToEmails();
    }

    // Delete last chip
    if (e.key === "Backspace" && input === "" && emails.length > 0) {
      setEmails((prev) => prev.slice(0, -1));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text");

    const list = pasted
      .split(/[\s,;\n\r\t,]+/)
      .map((email) => email.trim())
      .filter(Boolean);

    list.forEach(addEmail);

    setInput("");
  };

  const removeEmail = (email) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  return (
    <div className="border rounded-lg p-3 flex flex-wrap gap-2 min-h-[60px] focus-within:ring-2 focus-within:ring-blue-500">

      {emails.map((email) => (
        <div
          key={email}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
        >
          <span>{email}</span>

          <button
            type="button"
            onClick={() => removeEmail(email)}
            className="font-bold hover:text-red-600"
          >
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
        placeholder="Type email addresses..."
        className="flex-1 min-w-[220px] outline-none"
      />
    </div>
  );
}