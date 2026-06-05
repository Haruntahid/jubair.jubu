import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { isAuthenticated, clearAuth, getAdmin } from "@/lib/adminAuth";
import { adminApi } from "@/lib/api";

const navItems = [
  { path: "/admin/dashboard", icon: "ri-dashboard-line", label: "Dashboard" },
  { path: "/admin/profile", icon: "ri-user-line", label: "Profile" },
  { path: "/admin/skills", icon: "ri-tools-line", label: "Skills" },
  { path: "/admin/projects", icon: "ri-folder-line", label: "Projects" },
  { path: "/admin/experience", icon: "ri-briefcase-line", label: "Experience" },
  {
    path: "/admin/education",
    icon: "ri-graduation-cap-line",
    label: "Education",
  },
  {
    path: "/admin/certifications",
    icon: "ri-award-line",
    label: "Certifications",
  },
  {
    path: "/admin/testimonials",
    icon: "ri-chat-quote-line",
    label: "Testimonials",
  },
  { path: "/admin/blog-posts", icon: "ri-article-line", label: "Blog" },
  {
    path: "/admin/process-steps",
    icon: "ri-flow-chart",
    label: "Process Steps",
  },
  {
    path: "/admin/testing-approaches",
    icon: "ri-test-tube-line",
    label: "Approaches",
  },
  {
    path: "/admin/terminal-commands",
    icon: "ri-terminal-box-line",
    label: "Terminal Commands",
  },
  { path: "/admin/inbox", icon: "ri-mail-line", label: "Inbox", badge: true },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location, navigate] = useLocation();
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("admin_sidebar_open");
    return saved ? saved === "true" : true;
  });
  const admin = getAdmin();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
      return;
    }
    adminApi
      .getUnreadCount()
      .then((d) => setUnread(d.count))
      .catch(() => {});
  }, [location]);

  const logout = () => {
    clearAuth();
    navigate("/admin/login");
  };

  useEffect(() => {
    localStorage.setItem("admin_sidebar_open", String(open));
  }, [open]);

  if (!isAuthenticated()) return null;

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-60" : "w-14"
        } flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-200`}
      >
        <div className="p-3 border-b border-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/40 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="ri-shield-check-line text-emerald-400 text-sm" />
          </div>
          {open && (
            <div className="overflow-hidden">
              <p className="font-bold text-white text-sm truncate">QA Admin</p>
              <p className="text-xs text-gray-400 truncate">
                @{admin?.username}
              </p>
            </div>
          )}
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${
                  location === item.path
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <i className={`${item.icon} text-base flex-shrink-0`} />
                {open && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && unread > 0 && (
                      <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {unread > 9 ? "9+" : unread}
                      </span>
                    )}
                  </>
                )}
              </a>
            </Link>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-800 space-y-0.5">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
          >
            <i className="ri-external-link-line text-base flex-shrink-0" />
            {open && <span>View Portfolio</span>}
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <i className="ri-logout-box-line text-base flex-shrink-0" />
            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto flex flex-col">
        <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur border-b border-gray-800 px-5 py-2.5 flex items-center justify-between">
          <button
            onClick={() => setOpen((p) => !p)}
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <i
              className={`${
                open ? "ri-menu-fold-line" : "ri-menu-unfold-line"
              } text-xl`}
            />
            <span className="text-xs text-gray-400">
              {open ? "Collapse" : "Expand"}
            </span>
          </button>
          <span className="text-sm text-gray-400 flex items-center gap-1.5">
            <i className="ri-user-circle-line" />
            {admin?.username}
          </span>
        </header>
        <div className="flex-1 p-5">{children}</div>
      </main>
    </div>
  );
}
