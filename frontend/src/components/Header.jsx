export default function Header() {
  return (
    <header className="bg-white shadow-sm h-20 flex items-center justify-between px-10">

      <div>
        <h2 className="text-2xl font-bold">
          Bulk Email Sender
        </h2>

        <p className="text-gray-500">
          Send emails to multiple recipients
        </p>
      </div>

      <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
        A
      </div>

    </header>
  );
}