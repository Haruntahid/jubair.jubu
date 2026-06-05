import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminApi } from "@/lib/api";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const EMPTY = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  responsibilities: "",
  techStack: "",
  order: 0,
};

export default function AdminExperience() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () =>
    adminApi
      .getExperience()
      .then((d: any) => setItems(d))
      .finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const toForm = (item: any) => ({
    ...item,
    responsibilities: Array.isArray(item.responsibilities)
      ? item.responsibilities.join("\n")
      : item.responsibilities ?? "",
    techStack: Array.isArray(item.techStack)
      ? item.techStack.join(", ")
      : item.techStack ?? "",
  });

  const toPayload = (f: any) => ({
    ...f,
    responsibilities:
      typeof f.responsibilities === "string"
        ? f.responsibilities
            .split("\n")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : f.responsibilities,
    techStack:
      typeof f.techStack === "string"
        ? f.techStack
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : f.techStack,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) await adminApi.updateExperience(editId, toPayload(form));
      else await adminApi.createExperience(toPayload(form));
      setForm(EMPTY);
      setEditId(null);
      setShowForm(false);
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <AdminLayout>
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Experience"
        message="Delete this experience entry?"
        onConfirm={async () => {
          await adminApi.deleteExperience(deleteId!);
          setDeleteId(null);
          load();
        }}
        onCancel={() => setDeleteId(null)}
      />

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-white">Experience</h1>
        <button
          onClick={() => {
            setForm(EMPTY);
            setEditId(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <i className="ri-add-line" /> Add
        </button>
      </div>

      {showForm && (
        <div className="mb-5 bg-gray-900 border border-emerald-500/30 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-4">
            {editId ? "Edit" : "New"} Experience
          </h2>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            {[
              ["company", "Company"],
              ["role", "Role / Title"],
            ].map(([k, l]) => (
              <div key={k}>
                <label className="block text-sm text-gray-300 mb-1">{l}</label>
                <input
                  type="text"
                  required
                  value={form[k] ?? ""}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, [k]: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Start Date (YYYY-MM)
              </label>
              <input
                type="text"
                required
                value={form.startDate}
                onChange={(e) =>
                  setForm((p: any) => ({ ...p, startDate: e.target.value }))
                }
                placeholder="2020-03"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="text"
                disabled={form.current}
                value={form.endDate}
                onChange={(e) =>
                  setForm((p: any) => ({ ...p, endDate: e.target.value }))
                }
                placeholder="2022-01"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 disabled:opacity-40"
              />
              <label className="flex items-center gap-2 mt-1.5 text-sm text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.current}
                  onChange={(e) =>
                    setForm((p: any) => ({
                      ...p,
                      current: e.target.checked,
                      endDate: "",
                    }))
                  }
                  className="accent-emerald-500"
                />
                Currently working here
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                rows={2}
                onChange={(e) =>
                  setForm((p: any) => ({ ...p, description: e.target.value }))
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">
                Responsibilities (one per line)
              </label>
              <textarea
                value={form.responsibilities}
                rows={4}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    responsibilities: e.target.value,
                  }))
                }
                placeholder="Lead test automation...&#10;Manage team of 4..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Tech Stack (comma separated)
              </label>
              <input
                type="text"
                value={form.techStack}
                onChange={(e) =>
                  setForm((p: any) => ({ ...p, techStack: e.target.value }))
                }
                placeholder="Cypress, JIRA, Postman"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((p: any) => ({ ...p, order: +e.target.value }))
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold"
              >
                {editId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : (
        <div className="space-y-3">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-start justify-between"
            >
              <div>
                <p className="font-semibold text-white">{item.role}</p>
                <p className="text-emerald-400 text-sm">{item.company}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {item.startDate} → {item.current ? "Present" : item.endDate}
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setForm(toForm(item));
                    setEditId(item._id);
                    setShowForm(true);
                  }}
                  className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                >
                  <i className="ri-edit-line" />
                </button>
                <button
                  onClick={() => setDeleteId(item._id)}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  <i className="ri-delete-bin-line" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
