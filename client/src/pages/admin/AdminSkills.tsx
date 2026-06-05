import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminApi } from "@/lib/api";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const EMPTY = { category: "", name: "", level: 80, icon: "", order: 0 };
const CATS = ["Testing Types", "Tools", "Programming", "Methodologies"];

export default function AdminSkills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () =>
    adminApi
      .getSkills()
      .then((d: any) => setSkills(d))
      .finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) await adminApi.updateSkill(editId, form);
      else await adminApi.createSkill(form);
      setForm(EMPTY);
      setEditId(null);
      setShowForm(false);
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const grouped = skills.reduce((acc: any, s: any) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  return (
    <AdminLayout>
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Skill"
        message="Delete this skill? This cannot be undone."
        onConfirm={async () => {
          await adminApi.deleteSkill(deleteId!);
          setDeleteId(null);
          load();
        }}
        onCancel={() => setDeleteId(null)}
      />

      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills</h1>
          <p className="text-gray-400 text-sm">{skills.length} skills</p>
        </div>
        <button
          onClick={() => {
            setForm(EMPTY);
            setEditId(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <i className="ri-add-line" /> Add Skill
        </button>
      </div>

      {showForm && (
        <div className="mb-5 bg-gray-900 border border-emerald-500/30 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-4">
            {editId ? "Edit" : "New"} Skill
          </h2>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((p: any) => ({ ...p, category: e.target.value }))
                }
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="">Select…</option>
                {CATS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Skill Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((p: any) => ({ ...p, name: e.target.value }))
                }
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                placeholder="e.g. Selenium"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Level: {form.level}%
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={form.level}
                onChange={(e) =>
                  setForm((p: any) => ({ ...p, level: +e.target.value }))
                }
                className="w-full accent-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Icon (Remix Icon class)
              </label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) =>
                  setForm((p: any) => ({ ...p, icon: e.target.value }))
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                placeholder="ri-code-line"
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
        <div className="space-y-5">
          {Object.entries(grouped).map(([cat, list]: any) => (
            <div
              key={cat}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
            >
              <div className="px-4 py-2.5 bg-gray-800 flex items-center justify-between">
                <h2 className="font-semibold text-white text-sm">{cat}</h2>
                <span className="text-xs text-gray-400">
                  {list.length} skills
                </span>
              </div>
              <div className="divide-y divide-gray-800">
                {list.map((s: any) => (
                  <div
                    key={s._id}
                    className="px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {s.icon && (
                        <i className={`${s.icon} text-emerald-400 text-lg`} />
                      )}
                      <div>
                        <p className="text-white font-medium text-sm">
                          {s.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-28 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${s.level}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">
                            {s.level}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setForm({
                            category: s.category,
                            name: s.name,
                            level: s.level,
                            icon: s.icon || "",
                            order: s.order || 0,
                          });
                          setEditId(s._id);
                          setShowForm(true);
                        }}
                        className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                      >
                        <i className="ri-edit-line" />
                      </button>
                      <button
                        onClick={() => setDeleteId(s._id)}
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                      >
                        <i className="ri-delete-bin-line" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
