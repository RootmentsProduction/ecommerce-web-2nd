import { AdminOrderDetails } from "@/types/admin";

export const adminOrdersDetail: Record<string, AdminOrderDetails> = {
  "ORD-1234": {
    id: "ORD-1234",
    date: "24 Jun 2026 11:24 AM",
    status: "Delivered",
    customerName: "Priya Sharma",
    customerPhone: "+91 98765 43210",
    customerEmail: "priya.sharma@example.com",
    shippingAddress: {
      street: "Flat 405, Gold Crest Apartments, Linking Road",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400054",
      country: "India",
    },
    billingAddress: {
      street: "Flat 405, Gold Crest Apartments, Linking Road",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400054",
      country: "India",
    },
    items: [
      {
        productId: "SKU-OO1",
        productName: "Golden Chain | Ring",
        sku: "SKU-OO1",
        variant: "Gold / 16 inch",
        quantity: 2,
        unitPrice: "₹1,17,250",
        totalPrice: "₹2,34,500",
        image: "/images/placeholder-ring-1.jpg",
      }
    ],
    payment: {
      method: "Razorpay (Credit Card)",
      status: "Captured",
      razorpayOrderId: "order_PRX8c39sKdm3aL",
      razorpayPaymentId: "pay_PRX9fD82Lkd90m",
      subtotal: "₹2,27,670",
      shipping: "₹0 (Free)",
      tax: "₹6,830 (GST 3%)",
      discount: "₹0",
      grandTotal: "₹2,34,500",
    },
    stockDeductionStatus: "Deducted Successfully",
    stockDeductedQty: 2,
    stockDeductionTime: "24 Jun 2026 11:28 AM",
    stockDeductionRef: "TXN-INV-9921",
    timeline: [
      { title: "Order Placed", description: "Order successfully placed by customer", date: "24 Jun 2026 11:24 AM", status: "completed" },
      { title: "Payment Confirmed", description: "Razorpay payment verified & captured", date: "24 Jun 2026 11:28 AM", status: "completed" },
      { title: "Processing", description: "Order details sent to packaging desk", date: "24 Jun 2026 02:10 PM", status: "completed" },
      { title: "Shipped", description: "Shipped via BlueDart, AWB #8493021", date: "25 Jun 2026 10:00 AM", status: "completed" },
      { title: "Delivered", description: "Handed over to customer", date: "27 Jun 2026 03:45 PM", status: "completed" }
    ]
  },
  "ORD-5678": {
    id: "ORD-5678",
    date: "14 Jul 2026 10:00 AM",
    status: "Pending Payment",
    customerName: "Aarav Mehta",
    customerPhone: "+91 91234 56789",
    customerEmail: "aarav.mehta@example.com",
    shippingAddress: {
      street: "12A, Sterling Heights, Koregaon Park",
      city: "Pune",
      state: "Maharashtra",
      zipCode: "411001",
      country: "India",
    },
    billingAddress: {
      street: "12A, Sterling Heights, Koregaon Park",
      city: "Pune",
      state: "Maharashtra",
      zipCode: "411001",
      country: "India",
    },
    items: [
      {
        productId: "SKU-OO2",
        productName: "Classic Diamond Studs",
        sku: "SKU-OO2",
        variant: "White Gold / 1.0ct",
        quantity: 1,
        unitPrice: "₹1,20,000",
        totalPrice: "₹1,20,000",
        image: "/images/placeholder-earring-1.jpg",
      }
    ],
    payment: {
      method: "Razorpay (Net Banking)",
      status: "Initiated",
      razorpayOrderId: "order_QYZ9s82Lkm3aK",
      razorpayPaymentId: "Pending",
      subtotal: "₹1,16,505",
      shipping: "₹0 (Free)",
      tax: "₹3,495 (GST 3%)",
      discount: "₹0",
      grandTotal: "₹1,20,000",
    },
    stockDeductionStatus: "Pending Verification",
    stockDeductedQty: 0,
    stockDeductionTime: undefined,
    stockDeductionRef: undefined,
    timeline: [
      { title: "Order Placed", description: "Order initialized by Aarav Mehta", date: "14 Jul 2026 10:00 AM", status: "completed" },
      { title: "Payment Confirmed", description: "Awaiting payment gateway confirmation", date: undefined, status: "current" },
      { title: "Processing", description: "Awaiting payment verification", date: undefined, status: "upcoming" },
      { title: "Shipped", description: "Awaiting package drop", date: undefined, status: "upcoming" },
      { title: "Delivered", description: "Awaiting shipment arrival", date: undefined, status: "upcoming" }
    ]
  }
};

// Help map order ID including '#' prefixes
export const getOrderDetailById = (id: string): AdminOrderDetails | undefined => {
  const cleanId = id.replace("#", "").trim();
  return adminOrdersDetail[cleanId] || adminOrdersDetail["ORD-1234"]; // Fallback to priority record
};
