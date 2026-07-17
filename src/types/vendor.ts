export interface VendorAddress {
  attention?: string;
  countryRegion?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  fax?: string;
}

export interface ContactPerson {
  salutation?: string;
  firstName: string;
  lastName: string;
  email: string;
  workPhone?: string;
  mobile?: string;
}

export interface BankAccount {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface VendorComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Vendor {
  id: string;
  salutation?: string;
  firstName: string;
  lastName: string;
  companyName: string;
  displayName: string;
  email: string;
  workPhone: string;
  mobile: string;
  language: string;
  
  gstTreatment: string;
  sourceOfSupply: string;
  pan: string;
  gstin: string;
  currency: string;
  paymentTerms: string;
  tdsRate: string;
  
  billingAddress: VendorAddress;
  shippingAddress: VendorAddress;
  
  contactPersons: ContactPerson[];
  bankAccounts: BankAccount[];
  remarks: string;
  attachments?: string[];
  
  payables: number;
  unusedCredits: number;
  status: "Active" | "Inactive";
  createdAt: string;
  // Server-persisted JSON blobs for comments and audit history
  commentsJson?: string | null;
  historyJson?: string | null;
  // Backend may also return nested relations
  [key: string]: any;
}
