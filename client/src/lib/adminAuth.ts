const TOKEN_KEY = "admin_token";
const ADMIN_KEY = "admin_user";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(
  token: string,
  admin: { id: string; username: string }
): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}
export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}
export function getAdmin(): { id: string; username: string } | null {
  const data = localStorage.getItem(ADMIN_KEY);
  return data ? JSON.parse(data) : null;
}
export function isAuthenticated(): boolean {
  return !!getToken();
}
export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function updateAdmin(admin: { id: string; username: string }): void {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}
