import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminApi } from "@/lib/api";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function AdminInbox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const load = () =>
    adminApi
      .getMessages()
      .then((d: any) => setMessages(d))
      .finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const handleOpen = async (msg: any) => {
    setSelected(msg);
    if (!msg.read) {
      await adminApi.markAsRead(msg._id);
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m))
      );
    }
  };

  const filtered = messages.filter((m) =>
    filter === "all" ? true : filter === "unread" ? !m.read : m.read
  );
  const unread = messages.filter((m) => !m.read).length;

  return (
    <AdminLayout>
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Message"
        message="Permanently delete this message?"
        onConfirm={async () => {
          await adminApi.deleteMessage(deleteId!);
          if (selected?._id === deleteId) setSelected(null);
          setDeleteId(null);
          load();
        }}
        onCancel={() => setDeleteId(null)}
      />

      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white">Inbox</h1>
        <p className="text-gray-400 text-sm">
          {messages.length} messages · {unread} unread
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        {(["all", "unread", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
              filter === f
                ? "bg-emerald-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {f} {f === "unread" && unread > 0 && `(${unread})`}
          </button>
        ))}
      </div>

      <div className="flex gap-4" style={{ height: "calc(100vh - 260px)" }}>
        {/* List */}
        <div className="w-72 flex-shrink-0 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1 divide-y divide-gray-800">
            {loading ? (
              <p className="p-4 text-gray-400">Loading…</p>
            ) : filtered.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <i className="ri-inbox-line text-3xl block mb-2" />
                No messages
              </div>
            ) : (
              filtered.map((msg: any) => (
                <button
                  key={msg._id}
                  onClick={() => handleOpen(msg)}
                  className={`w-full text-left p-3.5 hover:bg-gray-800 transition-colors ${
                    selected?._id === msg._id
                      ? "bg-gray-800 border-r-2 border-emerald-500"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <p
                      className={`font-medium text-sm truncate ${
                        !msg.read ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {msg.name}
                    </p>
                    {!msg.read && (
                      <span className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {msg.subject}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
          {!selected ? (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <i className="ri-mail-open-line text-4xl block mb-2" />
                <p>Select a message to read</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-5 border-b border-gray-800 flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-white text-lg">
                    {selected.subject}
                  </h2>
                  <div className="flex flex-wrap gap-3 mt-1.5 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <i className="ri-user-line" />
                      {selected.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-mail-line" />
                      {selected.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-time-line" />
                      {new Date(selected.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setDeleteId(selected._id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg ml-3 flex-shrink-0"
                >
                  <i className="ri-delete-bin-line text-lg" />
                </button>
              </div>
              <div className="flex-1 p-5 overflow-y-auto">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
              <div className="p-4 border-t border-gray-800">
                <a
                  href={`mailto:${
                    selected.email
                  }?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-semibold transition-colors"
                >
                  <i className="ri-reply-line" /> Reply via Email
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
