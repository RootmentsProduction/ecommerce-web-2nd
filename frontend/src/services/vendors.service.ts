import { Vendor } from "@/types/vendor";
import { apiFetch } from "@/services/api";

export async function getVendors(): Promise<Vendor[]> {
  try {
    const data = await apiFetch<Vendor[]>("/api/vendors");
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getVendorById(id: string): Promise<Vendor | undefined> {
  try {
    return await apiFetch<Vendor>(`/api/vendors/${id}`);
  } catch {
    return undefined;
  }
}

export async function createVendor(payload: Record<string, any>): Promise<Vendor> {
  return apiFetch<Vendor>("/api/vendors", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateVendor(id: string, payload: Partial<Vendor>): Promise<Vendor> {
  return apiFetch<Vendor>(`/api/vendors/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteVendor(id: string): Promise<void> {
  await apiFetch<void>(`/api/vendors/${id}`, { method: "DELETE" });
}
