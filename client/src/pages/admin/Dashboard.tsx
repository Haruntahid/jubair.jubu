import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminApi } from "@/lib/api";
import { Link } from "wouter";

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    messages: 0,
    unread: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminApi.getProjects(),
      adminApi.getSkills(),
      adminApi.getExperience(),
      adminApi.getMessages(),
      adminApi.getUnreadCount(),
    ])
      .then(([projects, skills, exp, msgs, unread]: any) => {
        setStats({
          projects: projects.length,
          skills: skills.length,
          experience: exp.length,
          messages: msgs.length,
          unread: unread.count,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      icon: "ri-folder-line",
      color: "text-blue-400",
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      href: "/admin/projects",
    },
    {
      label: "Skills",
      value: stats.skills,
      icon: "ri-tools-line",
      color: "text-purple-400",
      border: "border-purple-500/30",
      bg: "bg-purple-500/10",
      href: "/admin/skills",
    },
    {
      label: "Experience",
      value: stats.experience,
      icon: "ri-briefcase-line",
      color: "text-yellow-400",
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      href: "/admin/experience",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: "ri-mail-line",
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      href: "/admin/inbox",
      badge: stats.unread,
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-6">
        Overview of your portfolio content
      </p>

      {loading ? (
        <div className="text-gray-400">Loading…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map((c) => (
            <Link key={c.label} href={c.href}>
              <a
                className={`border ${c.border} ${c.bg} rounded-xl p-5 hover:opacity-90 transition-opacity block`}
              >
                <div className="flex items-center justify-between mb-3">
                  <i className={`${c.icon} text-2xl ${c.color}`} />
                  {c.badge ? (
                    <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {c.badge} new
                    </span>
                  ) : null}
                </div>
                <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
                <p className="text-gray-400 text-sm mt-0.5">{c.label}</p>
              </a>
            </Link>
          ))}
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-base font-semibold text-white mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              href: "/admin/profile",
              icon: "ri-user-line",
              label: "Edit Profile",
            },
            {
              href: "/admin/sections",
              icon: "ri-layout-line",
              label: "Manage Sections",
            },
            {
              href: "/admin/projects",
              icon: "ri-add-circle-line",
              label: "Add Project",
            },
            {
              href: "/admin/inbox",
              icon: "ri-mail-open-line",
              label: "Read Inbox",
            },
            {
              href: "/",
              icon: "ri-eye-line",
              label: "View Portfolio",
              target: "_blank",
            },
          ].map((a) => (
            <a
              key={a.href}
              href={a.href}
              target={(a as any).target}
              className="flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 hover:text-white transition-colors"
            >
              <i className={`${a.icon} text-emerald-400`} />
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
