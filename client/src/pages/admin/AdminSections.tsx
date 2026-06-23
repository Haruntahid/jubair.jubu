import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminApi } from "@/lib/api";
import type { SiteSectionConfig } from "@shared/sections";

export default function AdminSections() {
  const [sections, setSections] = useState<SiteSectionConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    adminApi
      .getSiteSections()
      .then(setSections)
      .finally(() => setLoading(false));
  }, []);

  const moveSection = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;

    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    setSections(
      next.map((section, idx) => ({ ...section, order: idx + 1 }))
    );
  };

  const toggleVisible = (key: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.key === key
          ? { ...section, visible: !section.visible }
          : section
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await adminApi.updateSiteSections(sections);
      setSections(updated);
      setSavedMsg("Section layout saved!");
      setTimeout(() => setSavedMsg(""), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-gray-400">Loading…</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Page Sections</h1>
            <p className="text-gray-400 text-sm">
              Reorder sections and show or hide them on the portfolio homepage.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg font-semibold transition-colors"
          >
            {saving ? "Saving…" : savedMsg || "Save Layout"}
          </button>
        </div>

        <div className="space-y-3">
          {sections.map((section, index) => (
            <div
              key={section.key}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => moveSection(index, -1)}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-white disabled:opacity-30"
                  aria-label={`Move ${section.label} up`}
                >
                  <i className="ri-arrow-up-s-line text-lg"></i>
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(index, 1)}
                  disabled={index === sections.length - 1}
                  className="text-gray-400 hover:text-white disabled:opacity-30"
                  aria-label={`Move ${section.label} down`}
                >
                  <i className="ri-arrow-down-s-line text-lg"></i>
                </button>
              </div>

              <div className="flex-1">
                <p className="font-semibold text-white">{section.label}</p>
                <p className="text-xs text-gray-500">
                  key: {section.key} · order: {index + 1}
                </p>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={section.visible}
                  onChange={() => toggleVisible(section.key)}
                  className="rounded border-gray-600"
                />
                Visible
              </label>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
