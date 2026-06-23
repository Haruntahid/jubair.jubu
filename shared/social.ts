export interface SocialLink {
  label: string;
  url: string;
  icon: string;
  order: number;
}

export interface ProfileSocialSource {
  github?: string;
  linkedin?: string;
  twitter?: string;
  socialLinks?: SocialLink[];
}

export function getProfileSocialLinks(
  profile?: ProfileSocialSource | null
): SocialLink[] {
  if (!profile) return [];

  const legacy: SocialLink[] = [];
  if (profile.github) {
    legacy.push({
      label: "GitHub",
      url: profile.github,
      icon: "ri-github-fill",
      order: 1,
    });
  }
  if (profile.linkedin) {
    legacy.push({
      label: "LinkedIn",
      url: profile.linkedin,
      icon: "ri-linkedin-fill",
      order: 2,
    });
  }
  if (profile.twitter) {
    legacy.push({
      label: "Twitter",
      url: profile.twitter,
      icon: "ri-twitter-x-fill",
      order: 3,
    });
  }

  const custom = (profile.socialLinks || [])
    .filter((link) => link.url?.trim())
    .map((link, idx) => ({
      label: link.label || "Link",
      url: link.url,
      icon: link.icon || "ri-link",
      order: link.order ?? idx + 10,
    }));

  const merged = [...legacy, ...custom];
  const seen = new Set<string>();

  return merged
    .filter((link) => {
      const key = link.url.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.order - b.order);
}

export function extractGithubUsername(
  profile?: { githubUsername?: string; github?: string } | null
): string {
  if (profile?.githubUsername?.trim()) {
    return profile.githubUsername.trim();
  }
  if (!profile?.github) return "";
  try {
    const url = new URL(profile.github);
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[0] || "";
  } catch {
    return profile.github.replace(/^@/, "").trim();
  }
}
