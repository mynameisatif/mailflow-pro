import { useState } from "react";

export default function EmailInput({ emails, setEmails }) {
  const [input, setInput] = useState("");

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const addEmail = (email) => {
    const cleanEmail = email.trim().replace(/,$/, "");

    if (!cleanEmail) return;

    if (!emailRegex.test(cleanEmail)) {
      console.log("Invalid:", cleanEmail);
      return;
    }

    if (emails.includes(cleanEmail)) return;

    setEmails((prev) => [...prev, cleanEmail]);
  };

  const handleKeyDown = (e) => {
    // Space, Enter, Comma or Tab
    if (
      e.key === " " ||
      e.key === "Enter" ||
      e.key === "Tab" ||
      e.key === ","
    ) {
      e.preventDefault();

      addEmail(input);
      setInput("");
      return;
    }

    if (e.key === "Backspace" && input === "" && emails.length) {
      setEmails((prev) => prev.slice(0, -1));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text");

    const list = pasted
      .split(/[\s,;\n\r\t]+/)
      .map((e) => e.trim())
      .filter((e) => emailRegex.test(e));

    const unique = list.filter((e) => !emails.includes(e));

    setEmails((prev) => [...prev, ...unique]);
  };

  const removeEmail = (email) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  return (
    <div className="border border-gray-300 rounded-lg p-3 flex flex-wrap gap-2 min-h-[60px]">

      {emails.map((email) => (
        <div
          key={email}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
        >
          {email}

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
        placeholder="Enter email addresses..."
        className="flex-1 outline-none min-w-[220px]"
      />
    </div>
  );
}