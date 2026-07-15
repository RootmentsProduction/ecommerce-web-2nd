import { AdminOrder, AdminOrderDetails } from "@/types/admin";
import { adminOrdersFixture, adminOrdersDetailFixture } from "@/data/fixtures/orders";

export async function getOrders(): Promise<AdminOrder[]> {
  return adminOrdersFixture;
}

export async function getOrderById(id: string): Promise<AdminOrderDetails | undefined> {
  const cleanId = id.replace("#", "").trim();
  return adminOrdersDetailFixture[cleanId] || adminOrdersDetailFixture["ORD-1234"];
}
export async function getCustomers() {
  const { adminCustomersFixture } = await import("@/data/fixtures/customers");
  return adminCustomersFixture;
}
