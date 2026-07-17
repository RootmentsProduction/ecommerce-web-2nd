export interface POItem {
  sku: string;
  name: string;
  size: string;
  quantity: number;
  receivedQuantity?: number;
  rate: number;
  taxRate: number;
  taxAmount: number;
  amount: number;
}

export interface PurchaseOrder {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorState: string;
  deliverToBranch: string;
  deliverToState: string;
  deliverToAddress: string;
  referenceNumber?: string;
  date: string;
  deliveryDate?: string;
  paymentTerms: string;
  shipmentPreference?: string;
  status: "Draft" | "Sent" | "Received" | "Cancelled" | "Partially_Received" | "Partially Received";
  items: POItem[];
  
  subtotal: number;
  discountType: "line" | "transaction";
  discountValue: number;
  discountUnit: "%" | "₹";
  discountAfterTax: boolean;
  discountAmount: number;
  
  taxSplitType: "Intra-state" | "Inter-state";
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  taxTotal: number;
  
  tdsTcsType: "TDS" | "TCS" | "None";
  tdsTcsRate: number;
  tdsTcsAmount: number;
  tdsTcsName?: string;
  
  adjustment: number;
  total: number;
  
  customerNotes?: string;
  termsAndConditions?: string;
  attachments?: string[];
  createdAt: string;
}
