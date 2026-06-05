import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminApi } from "@/lib/api";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const EMPTY = {
  title: "",
  description: "",
  longDescription: "",
  techStack: "",
  testingTypes: "",
  imageUrl: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  order: 0,
  metrics: { bugsCaught: 0, testCoverage: 0, testCases: 0 },
};

const toArr = (v: any) =>
  typeof v === "string"
    ? v
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
    : v ?? [];
const toStr = (v: any) => (Array.isArray(v) ? v.join(", ") : v ?? "");

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () =>
    adminApi
      .getProjects()
      .then((d: any) => setProjects(d))
      .finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const handleEdit = (p: any) => {
    setForm({
      ...p,
      techStack: toStr(p.techStack),
      testingTypes: toStr(p.testingTypes),
    });
    setEditId(p._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      techStack: toArr(form.techStack),
      testingTypes: toArr(form.testingTypes),
    };
    try {
      if (editId) await adminApi.updateProject(editId, payload);
      else await adminApi.createProject(payload);
      setForm(EMPTY);
      setEditId(null);
      setShowForm(false);
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const tf = (k: string, l: string, ph?: string) => (
    <div key={k}>
      <label className="block text-sm text-gray-300 mb-1">{l}</label>
      <input
        type="text"
        value={form[k] ?? ""}
        placeholder={ph}
        onChange={(e) => setForm((p: any) => ({ ...p, [k]: e.target.value }))}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
      />
    </div>
  );

  return (
    <AdminLayout>
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Project"
        message="Delete this project permanently?"
        onConfirm={async () => {
          await adminApi.deleteProject(deleteId!);
          setDeleteId(null);
          load();
        }}
        onCancel={() => setDeleteId(null)}
      />

      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm">{projects.length} projects</p>
        </div>
        <button
          onClick={() => {
            setForm(EMPTY);
            setEditId(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <i className="ri-add-line" /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="mb-5 bg-gray-900 border border-emerald-500/30 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-4">
            {editId ? "Edit" : "New"} Project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  required
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">
                  Short Description
                </label>
                <textarea
                  value={form.description}
                  required
                  rows={2}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, description: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">
                  Long Description
                </label>
                <textarea
                  value={form.longDescription}
                  rows={3}
                  onChange={(e) =>
                    setForm((p: any) => ({
                      ...p,
                      longDescription: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
              {tf(
                "techStack",
                "Tech Stack (comma separated)",
                "Cypress, Postman, JIRA"
              )}
              {tf(
                "testingTypes",
                "Testing Types (comma separated)",
                "Functional, API, Security"
              )}
              {tf("imageUrl", "Image URL")}
              {tf("liveUrl", "Live URL")}
              {tf("githubUrl", "GitHub URL")}
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
              <div className="flex items-center gap-2 mt-5">
                <input
                  type="checkbox"
                  id="feat"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, featured: e.target.checked }))
                  }
                  className="accent-emerald-500 w-4 h-4"
                />
                <label htmlFor="feat" className="text-sm text-gray-300">
                  Featured project
                </label>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm font-medium text-gray-300 mb-3">Metrics</p>
              <div className="grid grid-cols-3 gap-4">
                {(["bugsCaught", "testCoverage", "testCases"] as const).map(
                  (k) => (
                    <div key={k}>
                      <label className="block text-xs text-gray-400 mb-1 capitalize">
                        {k.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="number"
                        value={form.metrics[k]}
                        onChange={(e) =>
                          setForm((p: any) => ({
                            ...p,
                            metrics: { ...p.metrics, [k]: +e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex gap-3">
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
        <div className="grid lg:grid-cols-2 gap-4">
          {projects.map((p: any) => (
            <div
              key={p._id}
              className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-5 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{p.title}</h3>
                    {p.featured && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-1.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {p.description}
                  </p>
                </div>
                <div className="flex gap-1 ml-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                  >
                    <i className="ri-edit-line" />
                  </button>
                  <button
                    onClick={() => setDeleteId(p._id)}
                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    <i className="ri-delete-bin-line" />
                  </button>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-gray-400 mb-2">
                <span>
                  <i className="ri-bug-line text-red-400 mr-1" />
                  {p.metrics?.bugsCaught} bugs
                </span>
                <span>
                  <i className="ri-percent-line text-emerald-400 mr-1" />
                  {p.metrics?.testCoverage}% coverage
                </span>
                <span>
                  <i className="ri-file-list-line text-blue-400 mr-1" />
                  {p.metrics?.testCases} cases
                </span>
              </div>
              {p.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {p.techStack.slice(0, 4).map((t: string) => (
                    <span
                      key={t}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                  {p.techStack.length > 4 && (
                    <span className="text-xs text-gray-500">
                      +{p.techStack.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
