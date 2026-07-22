export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400">
        MailFlow
      </h1>

      <p className="text-sm text-gray-400 mt-2">
        Bulk Email Platform
      </p>

      <div className="mt-12 space-y-3">

        <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700">
          📧 Compose
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-700">
          📜 History
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-700">
          📄 Templates
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-700">
          ⚙ Settings
        </button>

      </div>
    </aside>
  );
}