import { useState } from "react";

export default function EmailInput({ emails, setEmails }) {
  const [input, setInput] = useState("");

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const addEmail = (email) => {
    const cleanEmail = email.trim().replace(/,$/, "");

    if (!cleanEmail) return;

    if (!emailRegex.test(cleanEmail)) return;

    if (emails.includes(cleanEmail)) return;

    setEmails((prev) => [...prev, cleanEmail]);
  };

  const processInput = (text) => {
    const parts = text.split(/[\s,;\n\r\t]+/);

    if (parts.length > 1) {
      parts.slice(0, -1).forEach(addEmail);
      setInput(parts[parts.length - 1]);
    } else {
      setInput(text);
    }
  };

  const handleChange = (e) => {
    processInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();

      addEmail(input);
      setInput("");
    }

    if (e.key === "Backspace" && input === "" && emails.length > 0) {
      setEmails((prev) => prev.slice(0, -1));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData("text");

    const pastedEmails = pastedText
      .split(/[\s,;\n\r\t]+/)
      .map((email) => email.trim())
      .filter((email) => emailRegex.test(email));

    const uniqueEmails = pastedEmails.filter(
      (email) => !emails.includes(email)
    );

    setEmails((prev) => [...prev, ...uniqueEmails]);
    setInput("");
  };

  const removeEmail = (email) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  return (
    <div className="border border-gray-300 rounded-lg p-3 flex flex-wrap gap-2 min-h-[60px] focus-within:ring-2 focus-within:ring-blue-500">

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
        onPaste={handlePaste}
        placeholder="Enter email addresses..."
        className="flex-1 outline-none min-w-[220px]"
      />
    </div>
  );
}