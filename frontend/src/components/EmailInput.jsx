import { useState } from "react";

export default function EmailInput({ emails, setEmails }) {
  const [input, setInput] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const addEmail = (value) => {
    const email = value.trim().replace(/,$/, "");

    if (!email) return;

    if (!emailRegex.test(email)) return;

    if (emails.includes(email)) return;

    setEmails([...emails, email]);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    // Split whenever user types space, comma or multiple spaces
    if (/[,\s]/.test(value)) {
      const parts = value.split(/[,\s]+/);

      parts.slice(0, -1).forEach(addEmail);

      setInput(parts[parts.length - 1]);
      return;
    }

    setInput(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();

      addEmail(input);
      setInput("");
    }

    if (e.key === "Backspace" && input === "" && emails.length) {
      setEmails(emails.slice(0, -1));
    }
  };

  const removeEmail = (email) => {
    setEmails(emails.filter((e) => e !== email));
  };

  return (
    <div className="border rounded-lg p-3 flex flex-wrap gap-2 min-h-[56px]">

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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter email addresses..."
        className="flex-1 outline-none min-w-[220px]"
      />
    </div>
  );
}