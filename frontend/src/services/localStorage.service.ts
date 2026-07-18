import { Vendor, VendorComment } from "@/types/vendor";
import { PurchaseOrder } from "@/types/purchase-order";

// Standard Indian States/Territories
export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry", "Overseas"
];

// Initial Seed Data for Vendors
const INITIAL_VENDORS: Vendor[] = [
  {
    id: "VND-0001",
    salutation: "Mr.",
    firstName: "Ramesh",
    lastName: "Kumar",
    companyName: "Heritage Gold Refiners",
    displayName: "Heritage Gold Refiners (Ramesh Kumar)",
    email: "contact@heritagegold.in",
    workPhone: "+91 80 2345 6789",
    mobile: "+91 98450 12345",
    language: "English",
    gstTreatment: "Registered Business - Regular",
    sourceOfSupply: "Karnataka",
    pan: "AAAAA1111A",
    gstin: "29AAAAA1111A1Z1",
    currency: "INR - Indian Rupee",
    paymentTerms: "Net 30",
    tdsRate: "Contractors [2%]",
    billingAddress: {
      attention: "Accounts Payable",
      countryRegion: "India",
      street1: "12/A, Bull Temple Road",
      street2: "Basavanagudi",
      city: "Bengaluru",
      state: "Karnataka",
      zipCode: "560004",
      phone: "+91 80 2345 6789"
    },
    shippingAddress: {
      attention: "Receiving Bay 1",
      countryRegion: "India",
      street1: "12/A, Bull Temple Road",
      street2: "Basavanagudi",
      city: "Bengaluru",
      state: "Karnataka",
      zipCode: "560004",
      phone: "+91 80 2345 6789"
    },
    contactPersons: [
      {
        salutation: "Ms.",
        firstName: "Anjali",
        lastName: "Sharma",
        email: "anjali@heritagegold.in",
        workPhone: "+91 80 2345 6788",
        mobile: "+91 98450 12346"
      }
    ],
    bankAccounts: [
      {
        accountHolderName: "Heritage Gold Refiners",
        bankName: "HDFC Bank",
        accountNumber: "50100412345678",
        ifscCode: "HDFC0000012"
      }
    ],
    remarks: "Preferred vendor for 22kt pure gold sheets and wire.",
    payables: 450000,
    unusedCredits: 25000,
    status: "Active",
    createdAt: "2026-06-01T10:00:00.000Z"
  },
  {
    id: "VND-0002",
    salutation: "Mr.",
    firstName: "Amit",
    lastName: "Mehta",
    companyName: "Apex Diamond Cutters Ltd",
    displayName: "Apex Diamond Cutters Ltd (Amit Mehta)",
    email: "sales@apexdiamonds.com",
    workPhone: "+91 22 6678 9012",
    mobile: "+91 99200 54321",
    language: "English",
    gstTreatment: "Registered Business - Regular",
    sourceOfSupply: "Maharashtra",
    pan: "BBBBB2222B",
    gstin: "27BBBBB2222B2Z2",
    currency: "INR - Indian Rupee",
    paymentTerms: "Due on Receipt",
    tdsRate: "Professional Fees [10%]",
    billingAddress: {
      attention: "Accounts Department",
      countryRegion: "India",
      street1: "405, Bharat Diamond Bourse",
      street2: "Bandra Kurla Complex, Bandra (E)",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400051",
      phone: "+91 22 6678 9012"
    },
    shippingAddress: {
      attention: "Vault Incharge",
      countryRegion: "India",
      street1: "405, Bharat Diamond Bourse",
      street2: "Bandra Kurla Complex, Bandra (E)",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400051",
      phone: "+91 22 6678 9012"
    },
    contactPersons: [],
    bankAccounts: [
      {
        accountHolderName: "Apex Diamond Cutters Ltd",
        bankName: "ICICI Bank",
        accountNumber: "000405123456",
        ifscCode: "ICIC0000004"
      }
    ],
    remarks: "Supplier of certified GIA solitaire diamonds.",
    payables: 1200000,
    unusedCredits: 0,
    status: "Active",
    createdAt: "2026-06-10T11:00:00.000Z"
  },
  {
    id: "VND-0003",
    salutation: "Dr.",
    firstName: "Edward",
    lastName: "Zulu",
    companyName: "Zambian Gem Sourcing Corp",
    displayName: "Zambian Gem Sourcing Corp (Edward Zulu)",
    email: "info@zambiangems.co.zm",
    workPhone: "+260 211 234567",
    mobile: "+260 977 123456",
    language: "English",
    gstTreatment: "Overseas",
    sourceOfSupply: "Overseas",
    pan: "",
    gstin: "",
    currency: "INR - Indian Rupee",
    paymentTerms: "Net 45",
    tdsRate: "None",
    billingAddress: {
      attention: "Edward Zulu",
      countryRegion: "Zambia",
      street1: "Plot 45, Independence Avenue",
      street2: "Lusaka",
      city: "Lusaka",
      state: "Overseas",
      zipCode: "10101"
    },
    shippingAddress: {
      attention: "Import Custody",
      countryRegion: "Zambia",
      street1: "Plot 45, Independence Avenue",
      street2: "Lusaka",
      city: "Lusaka",
      state: "Overseas",
      zipCode: "10101"
    },
    contactPersons: [],
    bankAccounts: [],
    remarks: "Direct mine source for certified cushion-cut emeralds.",
    payables: 85000,
    unusedCredits: 5000,
    status: "Active",
    createdAt: "2026-06-15T09:30:00.000Z"
  }
];

// Initial Seed Data for Purchase Orders
const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: "PO-0001",
    vendorId: "VND-0001",
    vendorName: "Heritage Gold Refiners",
    vendorState: "Karnataka",
    deliverToBranch: "Mumbai Central Warehouse",
    deliverToState: "Maharashtra",
    deliverToAddress: "Building 4B, Sanjay Gandhi Industrial Estate, Kandivali East, Mumbai, MH - 400101",
    referenceNumber: "REF-2026-001",
    date: "01/07/2026",
    deliveryDate: "15/07/2026",
    paymentTerms: "Net 30",
    shipmentPreference: "Insured Air Cargo",
    status: "Received",
    items: [
      {
        sku: "SKU-001",
        name: "Golden Chain Ring",
        size: "16",
        quantity: 10,
        rate: 3200,
        taxRate: 3,
        taxAmount: 960,
        amount: 32000
      }
    ],
    subtotal: 32000,
    discountType: "transaction",
    discountValue: 1000,
    discountUnit: "₹",
    discountAfterTax: false,
    discountAmount: 1000,
    taxSplitType: "Inter-state", // MH Delivery vs KA Supply
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 930, // 3% of (32000 - 1000)
    taxTotal: 930,
    tdsTcsType: "TDS",
    tdsTcsRate: 2,
    tdsTcsAmount: 620, // 2% of 31000
    tdsTcsName: "Contractors [2%]",
    adjustment: 70,
    total: 31380, // 31000 - 1000 + 930 - 620 + 70 = 31380
    customerNotes: "Please ensure assay certificates are included.",
    termsAndConditions: "Goods subject to purity inspection upon arrival.",
    createdAt: "2026-07-01T12:00:00.000Z"
  },
  {
    id: "PO-0002",
    vendorId: "VND-0002",
    vendorName: "Apex Diamond Cutters Ltd",
    vendorState: "Maharashtra",
    deliverToBranch: "Mumbai Central Warehouse",
    deliverToState: "Maharashtra",
    deliverToAddress: "Building 4B, Sanjay Gandhi Industrial Estate, Kandivali East, Mumbai, MH - 400101",
    referenceNumber: "REF-DIAMOND-77",
    date: "10/07/2026",
    deliveryDate: "22/07/2026",
    paymentTerms: "Due on Receipt",
    shipmentPreference: "Secure Vault Logistics",
    status: "Sent",
    items: [
      {
        sku: "SKU-002",
        name: "Classic Diamond Studs",
        size: "O/S",
        quantity: 2,
        rate: 90000,
        taxRate: 3,
        taxAmount: 5400,
        amount: 180000
      }
    ],
    subtotal: 180000,
    discountType: "transaction",
    discountValue: 5,
    discountUnit: "%",
    discountAfterTax: false,
    discountAmount: 9000, // 5% of 180000
    taxSplitType: "Intra-state", // MH Delivery vs MH Supply
    cgstAmount: 2565, // 1.5% of 171000
    sgstAmount: 2565, // 1.5% of 171000
    igstAmount: 0,
    taxTotal: 5130,
    tdsTcsType: "TDS",
    tdsTcsRate: 10,
    tdsTcsAmount: 17100, // 10% of 171000
    tdsTcsName: "Professional Fees [10%]",
    adjustment: -30,
    total: 159000, // 171000 + 5130 - 17100 - 30 = 159000
    customerNotes: "Laser inscription registry matching GIA details is mandatory.",
    termsAndConditions: "Payment immediately on validation under vault microscope.",
    createdAt: "2026-07-10T14:30:00.000Z"
  }
];

// Helper to check environment
const isClient = typeof window !== "undefined";

const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (!isClient) return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored) as T;
  } catch {
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  if (isClient) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// CRUD API
export const localStorageService = {
  // --- VENDORS ---
  getVendors(): Vendor[] {
    return getStorageItem<Vendor[]>("admin_vendors", INITIAL_VENDORS);
  },

  getVendorById(id: string): Vendor | undefined {
    const vendors = this.getVendors();
    return vendors.find((v) => v.id === id);
  },

  saveVendor(vendor: Omit<Vendor, "createdAt" | "payables" | "unusedCredits"> & { createdAt?: string; payables?: number; unusedCredits?: number }): Vendor {
    const vendors = this.getVendors();
    const existingIdx = vendors.findIndex((v) => v.id === vendor.id);

    const fullVendor: Vendor = {
      ...(vendor as any),
      payables: vendor.payables ?? 0,
      unusedCredits: vendor.unusedCredits ?? 0,
      createdAt: vendor.createdAt ?? new Date().toISOString(),
    };

    if (existingIdx >= 0) {
      vendors[existingIdx] = fullVendor;
      this.logHistory(vendor.id, `Vendor details updated for ${vendor.displayName}`);
    } else {
      vendors.push(fullVendor);
      this.logHistory(vendor.id, `Vendor ${vendor.displayName} registered successfully`);
    }

    setStorageItem("admin_vendors", vendors);
    return fullVendor;
  },

  deleteVendor(id: string): boolean {
    const vendors = this.getVendors();
    const filtered = vendors.filter((v) => v.id !== id);
    if (filtered.length === vendors.length) return false;
    setStorageItem("admin_vendors", filtered);
    // Clear logs
    if (isClient) {
      localStorage.removeItem(`vendor_comments_${id}`);
      localStorage.removeItem(`vendor_history_${id}`);
    }
    return true;
  },

  // --- VENDOR COMMENTS ---
  getVendorComments(vendorId: string): VendorComment[] {
    return getStorageItem<VendorComment[]>(`vendor_comments_${vendorId}`, [
      {
        id: "c-1",
        author: "Admin User",
        text: "Vendor onboarding complete. Verified bank accounts and GSTIN registration.",
        date: "16/07/2026 10:00 AM"
      }
    ]);
  },

  addVendorComment(vendorId: string, text: string): VendorComment {
    const comments = this.getVendorComments(vendorId);
    const newComment: VendorComment = {
      id: `comment-${Date.now()}`,
      author: "Admin User",
      text,
      date: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      })
    };
    comments.push(newComment);
    setStorageItem(`vendor_comments_${vendorId}`, comments);
    return newComment;
  },

  // --- VENDOR HISTORY ---
  getVendorHistory(vendorId: string): string[] {
    return getStorageItem<string[]>(`vendor_history_${vendorId}`, [
      `[${new Date().toLocaleDateString("en-IN")}] Vendor profile created.`
    ]);
  },

  logHistory(vendorId: string, action: string): void {
    const history = this.getVendorHistory(vendorId);
    const dateStr = new Date().toLocaleDateString("en-IN") + " " + new Date().toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' });
    history.unshift(`[${dateStr}] ${action}`);
    setStorageItem(`vendor_history_${vendorId}`, history);
  },

  // --- PURCHASE ORDERS ---
  getPurchaseOrders(): PurchaseOrder[] {
    return getStorageItem<PurchaseOrder[]>("admin_purchase_orders", INITIAL_PURCHASE_ORDERS);
  },

  getPurchaseOrderById(id: string): PurchaseOrder | undefined {
    const pos = this.getPurchaseOrders();
    return pos.find((po) => po.id === id);
  },

  savePurchaseOrder(po: Omit<PurchaseOrder, "createdAt"> & { createdAt?: string }): PurchaseOrder {
    const pos = this.getPurchaseOrders();
    const existingIdx = pos.findIndex((p) => p.id === po.id);

    const fullPO: PurchaseOrder = {
      ...po,
      createdAt: po.createdAt ?? new Date().toISOString()
    };

    if (existingIdx >= 0) {
      pos[existingIdx] = fullPO;
      // Log vendor history if matching vendor exists
      this.logHistory(po.vendorId, `Purchase Order ${po.id} details updated. Total amount: ₹${po.total.toLocaleString("en-IN")}`);
    } else {
      pos.push(fullPO);
      this.logHistory(po.vendorId, `Purchase Order ${po.id} created. Total amount: ₹${po.total.toLocaleString("en-IN")}`);
    }

    setStorageItem("admin_purchase_orders", pos);
    return fullPO;
  },

  deletePurchaseOrder(id: string): boolean {
    const pos = this.getPurchaseOrders();
    const po = pos.find((p) => p.id === id);
    const filtered = pos.filter((p) => p.id !== id);
    if (filtered.length === pos.length) return false;
    setStorageItem("admin_purchase_orders", filtered);
    if (po) {
      this.logHistory(po.vendorId, `Purchase Order ${id} was deleted.`);
    }
    return true;
  }
};
