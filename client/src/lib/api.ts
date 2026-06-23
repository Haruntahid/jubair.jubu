import { authHeaders } from "./adminAuth";

const BASE = "/api";

async function request<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const mergedHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(authHeaders() as Record<string, string>),
    ...((options.headers as Record<string, string>) || {}),
  };

  const res = await fetch(`${BASE}${url}`, {
    ...options,
    headers: mergedHeaders,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return res.json();
}

export const portfolioApi = {
  getProfile: () => request("/portfolio/profile"),
  getSkills: () => request("/portfolio/skills"),
  getProjects: () => request("/portfolio/projects"),
  getExperience: () => request("/portfolio/experience"),
  getEducation: () => request("/portfolio/education"),
  getCertifications: () => request("/portfolio/certifications"),
  getTestimonials: () => request("/portfolio/testimonials"),
  getBlogPosts: () => request("/portfolio/blog-posts"),
  getProcessSteps: () => request("/portfolio/process-steps"),
  getTestingApproaches: () => request("/portfolio/testing-approaches"),
  getTerminalCommands: () => request("/portfolio/terminal-commands"),
  getSiteSections: () => request("/portfolio/site-sections"),
  getGithubContributions: () => request("/portfolio/github-contributions"),
};

export const authApi = {
  login: (username: string, password: string) =>
    request<{ token: string; admin: { id: string; username: string } }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }
    ),
  changePassword: (
    username: string,
    oldPassword: string,
    newPassword: string
  ) =>
    request("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ username, oldPassword, newPassword }),
    }),
  changeCredentials: (data: {
    username: string;
    oldPassword: string;
    newUsername?: string;
    newPassword?: string;
  }) =>
    request<{ message: string; admin: { id: string; username: string } }>(
      "/auth/change-credentials",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ),
};

export const adminApi = {
  getProfile: () => request("/admin/profile"),
  updateProfile: (data: any) =>
    request("/admin/profile", { method: "PUT", body: JSON.stringify(data) }),

  getSkills: () => request("/admin/skills"),
  createSkill: (data: any) =>
    request("/admin/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill: (id: string, data: any) =>
    request(`/admin/skills/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteSkill: (id: string) =>
    request(`/admin/skills/${id}`, { method: "DELETE" }),

  getProjects: () => request("/admin/projects"),
  createProject: (data: any) =>
    request("/admin/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id: string, data: any) =>
    request(`/admin/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteProject: (id: string) =>
    request(`/admin/projects/${id}`, { method: "DELETE" }),

  getExperience: () => request("/admin/experience"),
  createExperience: (data: any) =>
    request("/admin/experience", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateExperience: (id: string, data: any) =>
    request(`/admin/experience/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteExperience: (id: string) =>
    request(`/admin/experience/${id}`, { method: "DELETE" }),

  getEducation: () => request("/admin/education"),
  createEducation: (data: any) =>
    request("/admin/education", { method: "POST", body: JSON.stringify(data) }),
  updateEducation: (id: string, data: any) =>
    request(`/admin/education/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteEducation: (id: string) =>
    request(`/admin/education/${id}`, { method: "DELETE" }),

  getCertifications: () => request("/admin/certifications"),
  createCertification: (data: any) =>
    request("/admin/certifications", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateCertification: (id: string, data: any) =>
    request(`/admin/certifications/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteCertification: (id: string) =>
    request(`/admin/certifications/${id}`, { method: "DELETE" }),

  getTestimonials: () => request("/admin/testimonials"),
  createTestimonial: (data: any) =>
    request("/admin/testimonials", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateTestimonial: (id: string, data: any) =>
    request(`/admin/testimonials/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteTestimonial: (id: string) =>
    request(`/admin/testimonials/${id}`, { method: "DELETE" }),

  getBlogPosts: () => request("/admin/blog-posts"),
  createBlogPost: (data: any) =>
    request("/admin/blog-posts", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateBlogPost: (id: string, data: any) =>
    request(`/admin/blog-posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteBlogPost: (id: string) =>
    request(`/admin/blog-posts/${id}`, { method: "DELETE" }),

  getProcessSteps: () => request("/admin/process-steps"),
  createProcessStep: (data: any) =>
    request("/admin/process-steps", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateProcessStep: (id: string, data: any) =>
    request(`/admin/process-steps/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteProcessStep: (id: string) =>
    request(`/admin/process-steps/${id}`, { method: "DELETE" }),

  getTestingApproaches: () => request("/admin/testing-approaches"),
  createTestingApproach: (data: any) =>
    request("/admin/testing-approaches", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        points: Array.isArray(data.points)
          ? data.points
          : String(data.points || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
      }),
    }),
  updateTestingApproach: (id: string, data: any) =>
    request(`/admin/testing-approaches/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...data,
        points: Array.isArray(data.points)
          ? data.points
          : String(data.points || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
      }),
    }),
  deleteTestingApproach: (id: string) =>
    request(`/admin/testing-approaches/${id}`, { method: "DELETE" }),

  getTerminalCommands: () => request("/admin/terminal-commands"),
  createTerminalCommand: (data: any) =>
    request("/admin/terminal-commands", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateTerminalCommand: (id: string, data: any) =>
    request(`/admin/terminal-commands/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteTerminalCommand: (id: string) =>
    request(`/admin/terminal-commands/${id}`, { method: "DELETE" }),

  getSiteSections: () => request("/admin/site-sections"),
  updateSiteSections: (sections: any[]) =>
    request("/admin/site-sections", {
      method: "PUT",
      body: JSON.stringify({ sections }),
    }),

  getMessages: () => request("/admin/messages"),
  getUnreadCount: () =>
    request<{ count: number }>("/admin/messages/unread-count"),
  markAsRead: (id: string) =>
    request(`/admin/messages/${id}/read`, { method: "PATCH" }),
  deleteMessage: (id: string) =>
    request(`/admin/messages/${id}`, { method: "DELETE" }),
};
