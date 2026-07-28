import { apiFetch } from "@/services/api";

export interface PhonepeRedirectResponse {
  redirectUrl: string;
}

export interface PhonepeStatusResponse {
  status: "SUCCESS" | "FAILED" | "PENDING";
  order: any;
}

/**
   * Initiates payment for a given order by calling backend /payments/phonepe/create
   */
export async function createPhonepePayment(orderId: string): Promise<PhonepeRedirectResponse> {
  return apiFetch<PhonepeRedirectResponse>("/api/payments/phonepe/create", {
    method: "POST",
    body: JSON.stringify({ orderId }),
    timeout: 20000,
  });
}

/**
   * Fetches the verification status of a merchant transaction ID from backend pg status check
   */
export async function verifyPhonepePayment(merchantTransactionId: string): Promise<PhonepeStatusResponse> {
  return apiFetch<PhonepeStatusResponse>(`/api/payments/phonepe/status/${merchantTransactionId}`, {
    timeout: 20000,
  });
}

/**
   * Generates a new PhonePe redirect URL for an existing order that was failed or pending
   */
export async function retryPhonepePayment(orderId: string): Promise<PhonepeRedirectResponse> {
  return createPhonepePayment(orderId);
}
