import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminApi, authApi } from "@/lib/api";
import { getAdmin, updateAdmin } from "@/lib/adminAuth";

export default function AdminProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [credSaving, setCredSaving] = useState(false);
  const [credMsg, setCredMsg] = useState("");
  const [credError, setCredError] = useState("");
  const [credentials, setCredentials] = useState({
    oldPassword: "",
    newUsername: "",
    newPassword: "",
  });

  useEffect(() => {
    adminApi
      .getProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await adminApi.updateProfile(profile);
      setProfile(updated);
      setSavedMsg("Saved!");
      setTimeout(() => setSavedMsg(""), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCredentialsSave = async () => {
    const admin = getAdmin();
    if (!admin?.username) {
      setCredError("Session expired. Please login again.");
      return;
    }

    setCredError("");
    setCredMsg("");
    setCredSaving(true);
    try {
      const payload = {
        username: admin.username,
        oldPassword: credentials.oldPassword,
        newUsername: credentials.newUsername.trim() || undefined,
        newPassword: credentials.newPassword.trim() || undefined,
      };

      const data = await authApi.changeCredentials(payload);
      updateAdmin(data.admin);
      setCredMsg("Credentials updated successfully");
      setCredentials({ oldPassword: "", newUsername: "", newPassword: "" });
      setTimeout(() => setCredMsg(""), 3000);
    } catch (err: any) {
      setCredError(err.message || "Failed to update credentials");
    } finally {
      setCredSaving(false);
    }
  };

  const inp = (
    key: string,
    label: string,
    type: string = "text",
    auto = false
  ) => (
    <div key={key}>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
        {auto && (
          <span className="ml-2 text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            Auto-displayed
          </span>
        )}
      </label>
      <input
        type={type}
        value={profile?.[key] ?? ""}
        onChange={(e) =>
          setProfile((p: any) => ({
            ...p,
            [key]: type === "number" ? +e.target.value : e.target.value,
          }))
        }
        className={`w-full px-3 py-2 bg-gray-800 border ${
          auto ? "border-emerald-500/40" : "border-gray-700"
        } rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors`}
      />
    </div>
  );

  if (loading)
    return (
      <AdminLayout>
        <p className="text-gray-400">Loading…</p>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Profile</h1>
            <p className="text-gray-400 text-sm">
              Fields marked "Auto-displayed" appear in the site header
              automatically
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            {saving ? (
              <>
                <i className="ri-loader-4-line animate-spin" /> Saving…
              </>
            ) : savedMsg ? (
              <>
                <i className="ri-check-line" /> {savedMsg}
              </>
            ) : (
              <>
                <i className="ri-save-line" /> Save
              </>
            )}
          </button>
        </div>

        <div className="space-y-5">
          <section className="bg-gray-900 border border-emerald-500/20 rounded-xl p-5">
            <h2 className="text-base font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <i className="ri-user-line" /> Identity
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {inp("name", "Full Name", "text", true)}
              {inp("role", "Job Role / Title", "text", true)}
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">
              Hero Section
            </h2>
            <div className="space-y-4">
              {inp("tagline", "Tagline")}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={profile?.bio ?? ""}
                  onChange={(e) =>
                    setProfile((p: any) => ({ ...p, bio: e.target.value }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
              {inp("avatarUrl", "Avatar Image URL")}
              {inp("resumeUrl", "Resume URL")}
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">Contact</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {inp("email", "Email")} {inp("phone", "Phone")}{" "}
              {inp("location", "Location")}
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">
              Social Links
            </h2>
            <div className="space-y-4">
              {inp("github", "GitHub URL")} {inp("linkedin", "LinkedIn URL")}{" "}
              {inp("twitter", "Twitter URL")}
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">Stats</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {inp("yearsOfExperience", "Years Experience", "number")}
              {inp("bugsFound", "Bugs Found", "number")}
              {inp("projectsTested", "Projects Tested", "number")}
              {inp("testCasesWritten", "Test Cases Written", "number")}
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">
              Admin Credentials
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Update username and/or password. Old password is required.
            </p>

            {credError && (
              <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {credError}
              </div>
            )}
            {credMsg && (
              <div className="mb-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
                {credMsg}
              </div>
            )}

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  value={credentials.oldPassword}
                  onChange={(e) =>
                    setCredentials((p) => ({
                      ...p,
                      oldPassword: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  New Username
                </label>
                <input
                  type="text"
                  value={credentials.newUsername}
                  onChange={(e) =>
                    setCredentials((p) => ({
                      ...p,
                      newUsername: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={credentials.newPassword}
                  onChange={(e) =>
                    setCredentials((p) => ({
                      ...p,
                      newPassword: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleCredentialsSave}
                disabled={credSaving}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg font-semibold transition-colors"
              >
                {credSaving ? "Updating…" : "Update Credentials"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
