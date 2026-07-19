import { apiFetch } from "./api";

export async function getSystemSettings(): Promise<Record<string, string>> {
  try {
    return await apiFetch<Record<string, string>>("/api/system-settings", {
      method: "GET",
    });
  } catch (error) {
    console.error("Failed to fetch system settings:", error);
    return {};
  }
}

export async function saveSystemSetting(key: string, value: string): Promise<any> {
  return apiFetch("/api/system-settings", {
    method: "PUT",
    body: JSON.stringify({ key, value }),
  });
}
