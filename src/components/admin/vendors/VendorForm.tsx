"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, AlertTriangle, ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
import { VendorAddress, ContactPerson, BankAccount } from "@/types/vendor";
import { INDIAN_STATES } from "@/services/localStorage.service";
import { getVendorById, createVendor, updateVendor } from "@/services/vendors.service";
import { uploadFile } from "@/services/media.service";
import PortalDropdown from "@/components/admin/shared/PortalDropdown";

interface VendorFormProps {
  initialVendorId?: string;
}

const GST_TREATMENTS = [
  { value: "Registered Business - Regular", tooltip: "Registered regular taxpayers who file GSTR-1 and GSTR-3B." },
  { value: "Registered Business - Composition", tooltip: "Businesses registered under Composition Scheme paying flat rate taxes." },
  { value: "Unregistered", tooltip: "Suppliers not registered under GST." },
  { value: "Overseas", tooltip: "Suppliers located outside India." },
  { value: "SEZ", tooltip: "Suppliers located in Special Economic Zone." },
  { value: "Deemed Export", tooltip: "Suppliers supplying goods that don't leave India but earn foreign currency." },
  { value: "Tax Deductor", tooltip: "Government or public sector undertaking deducting tax at source (TDS)." },
  { value: "SEZ Developer", tooltip: "Supplier developer of Special Economic Zone." },
];

const PAYMENT_TERMS = [
  "Due on Receipt",
  "Net 15",
  "Net 30",
  "Net 45",
  "Net 60",
];

const DEFAULT_ADDRESS: VendorAddress = {
  attention: "",
  countryRegion: "India",
  street1: "",
  street2: "",
  city: "",
  state: "Maharashtra",
  zipCode: "",
  phone: "",
  fax: "",
};

export default function VendorForm({ initialVendorId }: VendorFormProps) {
  const router = useRouter();
  const isEdit = !!initialVendorId;

  // Active Tab
  const [activeTab, setActiveTab] = useState("Other Details");
  const tabs = ["Other Details", "Address", "Contact Persons", "Bank Details", "Remarks"];

  // Header Details
  const [salutation, setSalutation] = useState("Mr.");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [workPhone, setWorkPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [language, setLanguage] = useState("English");

  // Tab 1: Other Details State
  const [gstTreatment, setGstTreatment] = useState("Registered Business - Regular");
  const [sourceOfSupply, setSourceOfSupply] = useState("Maharashtra");
  const [pan, setPan] = useState("");
  const [gstin, setGstin] = useState("");
  const [currency, setCurrency] = useState("INR - Indian Rupee");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [tdsRate, setTdsRate] = useState("None");

  // Tab 2: Addresses State
  const [billingAddress, setBillingAddress] = useState<VendorAddress>({ ...DEFAULT_ADDRESS });
  const [shippingAddress, setShippingAddress] = useState<VendorAddress>({ ...DEFAULT_ADDRESS });

  // Tab 3: Contact Persons State
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([]);

  // Tab 4: Bank Details State
  const [bankAccounts, setBankAccounts] = useState<(BankAccount & { reAccountNumber: string })[]>([]);

  // Tab 5: Remarks
  const [remarks, setRemarks] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [fileInputVal, setFileInputVal] = useState("");
  const [uploadingDoc, setUploadingDoc] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error/validation messages
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-generate Display Name Options list
  const getDisplayNameOptions = () => {
    const list = [];
    const fullName = `${firstName} ${lastName}`.trim();
    if (fullName) list.push(fullName);
    if (companyName) list.push(companyName);
    if (companyName && fullName) {
      list.push(`${companyName} (${fullName})`);
      list.push(`${fullName} (${companyName})`);
    }
    return list;
  };

  // Prepopulate if Edit Mode
  useEffect(() => {
    if (isEdit && initialVendorId) {
      getVendorById(initialVendorId).then((vendor) => {
        if (vendor) {
          setSalutation(vendor.salutation || "Mr.");
          setFirstName(vendor.firstName);
          setLastName(vendor.lastName);
          setCompanyName(vendor.companyName);
          setDisplayName(vendor.displayName);
          setEmail(vendor.email);
          setWorkPhone(vendor.workPhone);
          setMobile(vendor.mobile);
          setLanguage(vendor.language);
          setGstTreatment(vendor.gstTreatment);
          setSourceOfSupply(vendor.sourceOfSupply);
          setPan(vendor.pan);
          setGstin(vendor.gstin);
          setCurrency(vendor.currency);
          setPaymentTerms(vendor.paymentTerms);
          setTdsRate(vendor.tdsRate);
          // Backend returns addresses array; extract billing/shipping
          const addresses = (vendor as any).addresses || [];
          const billing = addresses.find((a: any) => a.type === 'BILLING');
          const shipping = addresses.find((a: any) => a.type === 'SHIPPING');
          if (billing) setBillingAddress(billing);
          if (shipping) setShippingAddress(shipping);
          const contacts = (vendor as any).contacts || vendor.contactPersons || [];
          setContactPersons(contacts);
          setRemarks(vendor.remarks || "");
          // attachments is stored as serialized JSON string in DB
          const rawAttachments = (vendor as any).attachments;
          if (rawAttachments) {
            try {
              setAttachments(JSON.parse(rawAttachments));
            } catch {
              setAttachments([]);
            }
          }
          const banks = (vendor as any).bankAccounts || vendor.bankAccounts || [];
          const mappedBank = banks.map((b: any) => ({
            ...b,
            reAccountNumber: b.accountNumber,
          }));
          setBankAccounts(mappedBank);
        }
      });
    }
  }, [isEdit, initialVendorId]);

  // Set default Display name if empty
  useEffect(() => {
    const opts = getDisplayNameOptions();
    if (opts.length > 0 && !displayName) {
      Promise.resolve().then(() => {
        setDisplayName(opts[0]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, companyName]);

  // GSTIN changes => Autocomplete PAN (characters 3 to 12)
  const handleGstinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setGstin(val);
    if (val.length >= 10) {
      // First 2 chars represent state code, next 10 are PAN.
      // E.g. 29AAAAA1111A1Z1 => AAAAA1111A
      const autoPan = val.substring(2, 12);
      setPan(autoPan);
    }
  };

  // Copy billing to shipping
  const copyBillingToShipping = () => {
    setShippingAddress({ ...billingAddress });
  };

  // Dynamic Array Adders
  const addContactPerson = () => {
    setContactPersons([
      ...contactPersons,
      { salutation: "Mr.", firstName: "", lastName: "", email: "", workPhone: "", mobile: "" },
    ]);
  };

  const removeContactPerson = (idx: number) => {
    setContactPersons(contactPersons.filter((_, i) => i !== idx));
  };

  const handleContactPersonChange = (idx: number, field: keyof ContactPerson, value: string) => {
    const updated = [...contactPersons];
    updated[idx] = { ...updated[idx], [field]: value };
    setContactPersons(updated);
  };

  const addBankAccount = () => {
    setBankAccounts([
      ...bankAccounts,
      { accountHolderName: "", bankName: "", accountNumber: "", reAccountNumber: "", ifscCode: "" },
    ]);
  };

  const removeBankAccount = (idx: number) => {
    setBankAccounts(bankAccounts.filter((_, i) => i !== idx));
  };

  const handleBankAccountChange = (idx: number, field: string, value: string) => {
    const updated = [...bankAccounts];
    updated[idx] = { ...updated[idx], [field]: value };
    setBankAccounts(updated);
  };

  // File Upload handler — uploads to S3 and stores URLs
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setUploadingDoc(true);
      try {
        const uploadedUrls = await Promise.all(
          filesArray.map((file) => uploadFile(file, "vendors/documents"))
        );
        setAttachments((prev) => [...prev, ...uploadedUrls]);
      } catch (err: any) {
        console.error(err);
        setErrors((prev) => ({ ...prev, upload: err.message || "Failed to upload document." }));
      } finally {
        setUploadingDoc(false);
        setFileInputVal("");
      }
    }
  };

  const removeAttachment = (name: string) => {
    setAttachments(attachments.filter((f) => f !== name));
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const validationErrors: Record<string, string> = {};
    if (!displayName) validationErrors.displayName = "Display Name is required.";
    if (!companyName && (!firstName || !lastName)) {
      validationErrors.primaryContact = "Either Company Name or First & Last Name is required.";
    }

    // Verify bank accounts match
    bankAccounts.forEach((b, idx) => {
      if (b.accountNumber !== b.reAccountNumber) {
        validationErrors[`bank_${idx}`] = "Bank account numbers do not match.";
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (Object.keys(validationErrors).some((key) => key.startsWith("bank_"))) {
        setActiveTab("Bank Details");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    try {
      // Extract clean bank accounts
      const cleanBankAccounts: BankAccount[] = bankAccounts.map((b) => ({
        accountHolderName: b.accountHolderName,
        bankName: b.bankName,
        accountNumber: b.accountNumber,
        ifscCode: b.ifscCode,
      }));

      const vendorPayload = {
        salutation,
        firstName,
        lastName,
        companyName,
        displayName,
        email,
        workPhone,
        mobile,
        language,
        gstTreatment,
        sourceOfSupply,
        pan,
        gstin,
        currency,
        paymentTerms,
        tdsRate,
        billingAddress,
        shippingAddress,
        contactPersons,
        bankAccounts: cleanBankAccounts,
        remarks,
        attachments: JSON.stringify(attachments),
      };

      let resultId: string;
      if (isEdit && initialVendorId) {
        const result = await updateVendor(initialVendorId, vendorPayload as any);
        resultId = result.id;
      } else {
        const result = await createVendor(vendorPayload);
        resultId = result.id;
      }

      router.push(`/admin/vendors/${resultId}`);
    } catch (err: any) {
      console.error(err);
      setErrors((prev) => ({ ...prev, submit: err.message || "Failed to save vendor." }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Primary Contact Header */}
      <div className="bg-white border border-[#e1e5f5] rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
          Primary Vendor Contact
        </h2>
        
        {errors.primaryContact && (
          <div className="flex items-center space-x-2 text-xs text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errors.primaryContact}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Salutation + Names */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Salutation</label>
              <select
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                className="w-full px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all"
              >
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Dr.</option>
                <option>Mrs.</option>
                <option>M/s.</option>
              </select>
            </div>
            
            <div className="sm:col-span-1.5">
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800 placeholder-neutral-400"
              />
            </div>

            <div className="sm:col-span-1.5">
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800 placeholder-neutral-400"
              />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Company Name</label>
            <input
              type="text"
              placeholder="e.g. Heritage Refiners Ltd."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800 placeholder-neutral-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Display Name Dropdown/Input */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Vendor Display Name *</label>
            <div className="relative">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Select or enter display name"
                className={`w-full px-4 py-2 bg-[#f5f7fb] border ${errors.displayName ? "border-red-400" : "border-[#d7dcf5]"} rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800`}
              />
              {getDisplayNameOptions().length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {getDisplayNameOptions().map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setDisplayName(opt)}
                      className={`text-[9px] px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                        displayName === opt
                          ? "bg-[#3762f9] text-white border-[#3762f9]"
                          : "bg-white text-neutral-500 border-[#d7dcf5] hover:bg-neutral-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800 placeholder-neutral-400"
            />
          </div>

          {/* Contact Numbers */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Work Phone</label>
              <input
                type="text"
                placeholder="Landline"
                value={workPhone}
                onChange={(e) => setWorkPhone(e.target.value)}
                className="w-full px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800 placeholder-neutral-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Mobile</label>
              <input
                type="text"
                placeholder="Cell Phone"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800 placeholder-neutral-400"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Language Selection */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Preferred Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Kannada</option>
              <option>Marathi</option>
              <option>Tamil</option>
              <option>Gujarati</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabbed Navigation System */}
      <div className="bg-white border border-[#e1e5f5] rounded-3xl overflow-hidden shadow-[0_30px_90px_-40px_rgba(15,23,42,0.15)] flex flex-col">
        {/* Tab Headers */}
        <div className="flex border-b border-[#e1e5f5] bg-[#f5f6ff] overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-[#3762f9] text-[#3762f9] bg-white font-bold"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className="p-6 md:p-8">
          
          {/* TAB 1: OTHER DETAILS */}
          {activeTab === "Other Details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* GST Treatment */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span>GST Treatment</span>
                    <span title="Defines GST filing regulations"><HelpCircle className="w-3.5 h-3.5 text-neutral-400" /></span>
                  </label>
                  <PortalDropdown
                    align="left"
                    trigger={(isOpen, toggle) => (
                      <button
                        type="button"
                        onClick={toggle}
                        className="w-full flex items-center justify-between px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800 text-left cursor-pointer"
                      >
                        <span>{gstTreatment}</span>
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      </button>
                    )}
                    renderContent={(close) => (
                      <div className="py-1 max-h-60 overflow-y-auto">
                        {GST_TREATMENTS.map((gst) => (
                          <button
                            key={gst.value}
                            type="button"
                            onClick={() => {
                              setGstTreatment(gst.value);
                              close();
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                              gstTreatment === gst.value ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                            }`}
                          >
                            {gst.value}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  <p className="text-[10px] text-neutral-400 mt-1.5 font-medium leading-relaxed italic">
                    {GST_TREATMENTS.find((t) => t.value === gstTreatment)?.tooltip}
                  </p>
                </div>

                {/* Source of Supply State */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Source of Supply / State</label>
                  <PortalDropdown
                    align="left"
                    trigger={(isOpen, toggle) => (
                      <button
                        type="button"
                        onClick={toggle}
                        className="w-full flex items-center justify-between px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800 text-left cursor-pointer"
                      >
                        <span>{sourceOfSupply}</span>
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      </button>
                    )}
                    renderContent={(close) => (
                      <div className="py-1 max-h-60 overflow-y-auto">
                        {INDIAN_STATES.map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => {
                              setSourceOfSupply(st);
                              close();
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                              sourceOfSupply === st ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* GSTIN */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">GSTIN</label>
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="e.g. 29AAAAA1111A1Z1"
                    value={gstin}
                    onChange={handleGstinChange}
                    className="w-full px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all uppercase placeholder-neutral-400"
                  />
                  <p className="text-[9px] text-neutral-450 mt-1 leading-normal">
                    Enter 15-character GSTIN. PAN will be extracted automatically.
                  </p>
                </div>

                {/* PAN */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">PAN (Permanent Account Number)</label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="Auto-populated from GSTIN"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    className="w-full px-4 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all uppercase placeholder-neutral-400"
                  />
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Currency</label>
                  <PortalDropdown
                    align="left"
                    trigger={(isOpen, toggle) => (
                      <button
                        type="button"
                        onClick={toggle}
                        className="w-full flex items-center justify-between px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800 text-left cursor-pointer"
                      >
                        <span>{currency}</span>
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      </button>
                    )}
                    renderContent={(close) => (
                      <div className="py-1 max-h-60 overflow-y-auto">
                        {["INR - Indian Rupee", "USD - United States Dollar", "EUR - Euro"].map((curr) => (
                          <button
                            key={curr}
                            type="button"
                            onClick={() => {
                              setCurrency(curr);
                              close();
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                              currency === curr ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                            }`}
                          >
                            {curr}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Terms */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Payment Terms</label>
                  <PortalDropdown
                    align="left"
                    trigger={(isOpen, toggle) => (
                      <button
                        type="button"
                        onClick={toggle}
                        className="w-full flex items-center justify-between px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800 text-left cursor-pointer"
                      >
                        <span>{paymentTerms}</span>
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      </button>
                    )}
                    renderContent={(close) => (
                      <div className="py-1 max-h-60 overflow-y-auto">
                        {PAYMENT_TERMS.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => {
                              setPaymentTerms(term);
                              close();
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                              paymentTerms === term ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                            }`}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>

                {/* TDS Option rate */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">TDS / withholding tax rate</label>
                  <PortalDropdown
                    align="left"
                    trigger={(isOpen, toggle) => (
                      <button
                        type="button"
                        onClick={toggle}
                        className="w-full flex items-center justify-between px-3 py-2 bg-[#f5f7fb] border border-[#d7dcf5] rounded-xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800 text-left cursor-pointer"
                      >
                        <span>{tdsRate}</span>
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      </button>
                    )}
                    renderContent={(close) => (
                      <div className="py-1 max-h-60 overflow-y-auto">
                        {[
                          "None",
                          "Contractors [2%]",
                          "Professional Fees [10%]",
                          "Commission / Brokerage [5%]",
                          "Rent on Land/Building [10%]"
                        ].map((rate) => (
                          <button
                            key={rate}
                            type="button"
                            onClick={() => {
                              setTdsRate(rate);
                              close();
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                              tdsRate === rate ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                            }`}
                          >
                            {rate}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ADDRESS */}
          {activeTab === "Address" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-neutral-100">
              
              {/* Billing Address */}
              <div className="space-y-4 pr-0 lg:pr-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#3762f9] mb-4">
                  Billing Address
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Attention</label>
                    <input
                      type="text"
                      placeholder="e.g. Accounts Dept"
                      value={billingAddress.attention}
                      onChange={(e) => setBillingAddress({ ...billingAddress, attention: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Country / Region</label>
                    <input
                      type="text"
                      value={billingAddress.countryRegion}
                      onChange={(e) => setBillingAddress({ ...billingAddress, countryRegion: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Street Address Line 1</label>
                    <input
                      type="text"
                      placeholder="Line 1"
                      value={billingAddress.street1}
                      onChange={(e) => setBillingAddress({ ...billingAddress, street1: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Street Address Line 2</label>
                    <input
                      type="text"
                      placeholder="Line 2"
                      value={billingAddress.street2}
                      onChange={(e) => setBillingAddress({ ...billingAddress, street2: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">State</label>
                    <PortalDropdown
                      align="left"
                      trigger={(isOpen, toggle) => (
                        <button
                          type="button"
                          onClick={toggle}
                          className="w-full flex items-center justify-between px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4] text-neutral-800 text-left cursor-pointer"
                        >
                          <span>{billingAddress.state || "Select State"}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                        </button>
                      )}
                      renderContent={(close) => (
                        <div className="py-1 max-h-60 overflow-y-auto">
                          {INDIAN_STATES.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => {
                                setBillingAddress({ ...billingAddress, state: s });
                                close();
                              }}
                              className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                                billingAddress.state === s ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">ZIP / Pin Code</label>
                    <input
                      type="text"
                      placeholder="Pin Code"
                      value={billingAddress.zipCode}
                      onChange={(e) => setBillingAddress({ ...billingAddress, zipCode: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Phone</label>
                    <input
                      type="text"
                      placeholder="Phone"
                      value={billingAddress.phone}
                      onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 pt-6 lg:pt-0 pl-0 lg:pl-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3762f9]">
                    Shipping Address
                  </h3>
                  <button
                    type="button"
                    onClick={copyBillingToShipping}
                    className="text-[10px] bg-[#fff7ed] text-[#b45309] hover:bg-[#ffedd5] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Copy Billing Address
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Attention</label>
                    <input
                      type="text"
                      placeholder="e.g. Receiving Bay"
                      value={shippingAddress.attention}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, attention: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Country / Region</label>
                    <input
                      type="text"
                      value={shippingAddress.countryRegion}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, countryRegion: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Street Address Line 1</label>
                    <input
                      type="text"
                      placeholder="Line 1"
                      value={shippingAddress.street1}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street1: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Street Address Line 2</label>
                    <input
                      type="text"
                      placeholder="Line 2"
                      value={shippingAddress.street2}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street2: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">State</label>
                    <PortalDropdown
                      align="left"
                      trigger={(isOpen, toggle) => (
                        <button
                          type="button"
                          onClick={toggle}
                          className="w-full flex items-center justify-between px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4] text-neutral-800 text-left cursor-pointer"
                        >
                          <span>{shippingAddress.state || "Select State"}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                        </button>
                      )}
                      renderContent={(close) => (
                        <div className="py-1 max-h-60 overflow-y-auto">
                          {INDIAN_STATES.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => {
                                setShippingAddress({ ...shippingAddress, state: s });
                                close();
                              }}
                              className={`w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs transition-colors ${
                                shippingAddress.state === s ? "font-bold text-[#3762f9] bg-blue-50/50" : "text-neutral-700"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">ZIP / Pin Code</label>
                    <input
                      type="text"
                      placeholder="Pin Code"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Phone</label>
                    <input
                      type="text"
                      placeholder="Phone"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#f5f7fb] border border-[#d7dcf5] rounded-lg text-xs outline-none focus:border-[#4285f4]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT PERSONS */}
          {activeTab === "Contact Persons" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-neutral-500 font-medium">Add associated contact persons for this vendor.</span>
                <button
                  type="button"
                  onClick={addContactPerson}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-[#3762f9]/10 text-[#3762f9] hover:bg-[#3762f9]/20 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Contact Person</span>
                </button>
              </div>

              {contactPersons.length > 0 ? (
                <div className="space-y-4">
                  {contactPersons.map((contact, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-[#e1e5f5] rounded-2xl bg-[#fafbff] relative flex flex-col md:flex-row md:items-center gap-4 pr-12"
                    >
                      <div className="w-24">
                        <label className="block text-[9px] font-bold text-neutral-450 uppercase mb-1">Salutation</label>
                        <select
                          value={contact.salutation}
                          onChange={(e) => handleContactPersonChange(idx, "salutation", e.target.value)}
                          className="w-full px-2 py-1.5 bg-white border border-[#d7dcf5] rounded-lg text-xs outline-none"
                        >
                          <option>Mr.</option>
                          <option>Ms.</option>
                          <option>Dr.</option>
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-neutral-450 uppercase mb-1">First Name</label>
                        <input
                          type="text"
                          value={contact.firstName}
                          onChange={(e) => handleContactPersonChange(idx, "firstName", e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#d7dcf5] rounded-lg text-xs outline-none"
                          required
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-neutral-450 uppercase mb-1">Last Name</label>
                        <input
                          type="text"
                          value={contact.lastName}
                          onChange={(e) => handleContactPersonChange(idx, "lastName", e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#d7dcf5] rounded-lg text-xs outline-none"
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-neutral-450 uppercase mb-1">Email</label>
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) => handleContactPersonChange(idx, "email", e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#d7dcf5] rounded-lg text-xs outline-none"
                          required
                        />
                      </div>

                      <div className="w-32">
                        <label className="block text-[9px] font-bold text-neutral-450 uppercase mb-1">Work Phone</label>
                        <input
                          type="text"
                          value={contact.workPhone}
                          onChange={(e) => handleContactPersonChange(idx, "workPhone", e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#d7dcf5] rounded-lg text-xs outline-none"
                        />
                      </div>

                      <div className="w-32">
                        <label className="block text-[9px] font-bold text-neutral-450 uppercase mb-1">Mobile</label>
                        <input
                          type="text"
                          value={contact.mobile}
                          onChange={(e) => handleContactPersonChange(idx, "mobile", e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#d7dcf5] rounded-lg text-xs outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeContactPerson(idx)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-450 hover:text-red-500 cursor-pointer p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 border-2 border-dashed border-[#e1e5f5] rounded-2xl text-center text-xs text-neutral-400">
                  No contact persons added yet. Click &quot;+ Add Contact Person&quot; to add.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BANK DETAILS */}
          {activeTab === "Bank Details" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-neutral-500 font-medium">Add payment destination bank details.</span>
                <button
                  type="button"
                  onClick={addBankAccount}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-[#3762f9]/10 text-[#3762f9] hover:bg-[#3762f9]/20 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Bank Account</span>
                </button>
              </div>

              {bankAccounts.length > 0 ? (
                <div className="space-y-6">
                  {bankAccounts.map((acct, idx) => (
                    <div
                      key={idx}
                      className="p-5 border border-[#e1e5f5] rounded-2xl bg-[#fafbff] relative space-y-4"
                    >
                      <div className="absolute right-4 top-4">
                        <button
                          type="button"
                          onClick={() => removeBankAccount(idx)}
                          className="text-neutral-400 hover:text-red-500 cursor-pointer p-1.5"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 pb-2">
                        Bank Account #{idx + 1}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold text-neutral-450 uppercase mb-1">Account Holder Name</label>
                          <input
                            type="text"
                            value={acct.accountHolderName}
                            onChange={(e) => handleBankAccountChange(idx, "accountHolderName", e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-[#d7dcf5] rounded-lg text-xs outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-neutral-450 uppercase mb-1">Bank Name</label>
                          <input
                            type="text"
                            placeholder="e.g. HDFC Bank"
                            value={acct.bankName}
                            onChange={(e) => handleBankAccountChange(idx, "bankName", e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-[#d7dcf5] rounded-lg text-xs outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-neutral-450 uppercase mb-1">IFSC Code</label>
                          <input
                            type="text"
                            placeholder="11-character code"
                            value={acct.ifscCode}
                            onChange={(e) => handleBankAccountChange(idx, "ifscCode", e.target.value.toUpperCase())}
                            className="w-full px-3 py-1.5 bg-white border border-[#d7dcf5] rounded-lg text-xs outline-none uppercase"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold text-neutral-450 uppercase mb-1">Account Number</label>
                          <input
                            type="password"
                            value={acct.accountNumber}
                            onChange={(e) => handleBankAccountChange(idx, "accountNumber", e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-[#d7dcf5] rounded-lg text-xs outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-neutral-450 uppercase mb-1">Re-enter Account Number</label>
                          <input
                            type="text"
                            value={acct.reAccountNumber}
                            onChange={(e) => handleBankAccountChange(idx, "reAccountNumber", e.target.value)}
                            className={`w-full px-3 py-1.5 bg-white border ${
                              errors[`bank_${idx}`] || (acct.reAccountNumber && acct.accountNumber !== acct.reAccountNumber)
                                ? "border-red-400"
                                : "border-[#d7dcf5]"
                            } rounded-lg text-xs outline-none`}
                            required
                          />
                          {acct.reAccountNumber && acct.accountNumber !== acct.reAccountNumber && (
                            <p className="text-[10px] text-red-500 mt-1 font-semibold">
                              Account numbers do not match!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 border-2 border-dashed border-[#e1e5f5] rounded-2xl text-center text-xs text-neutral-400">
                  No bank accounts registered yet. Click &quot;+ Add Bank Account&quot; to add.
                </div>
              )}
            </div>
          )}

          {/* TAB 5: REMARKS */}
          {activeTab === "Remarks" && (
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Remarks / Internal Notes</label>
                <textarea
                  rows={4}
                  placeholder="Keep internal notes regarding prices, service or supply lead times here..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f5f7fb] border border-[#d7dcf5] rounded-2xl text-xs outline-none focus:border-[#4285f4] transition-all text-neutral-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Attachments</label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      value={fileInputVal}
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 border border-[#e1e5f5] rounded-xl bg-white text-neutral-700 hover:bg-neutral-50 text-xs font-semibold cursor-pointer"
                    >
                      Choose Files
                    </button>
                  </div>
                  {uploadingDoc ? (
                    <span className="text-[11px] text-blue-500 font-semibold flex items-center space-x-1">
                      <span className="inline-block border-2 border-t-transparent border-blue-400 rounded-full h-3 w-3 animate-spin"></span>
                      <span>Uploading...</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-neutral-400">Upload agreement documents, tax forms or certificates.</span>
                  )}
                </div>
                {errors.upload && <p className="text-[10px] text-red-500 mt-1">{errors.upload}</p>}

                {attachments.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {attachments.map((file) => (
                      <div
                        key={file}
                        className="flex items-center space-x-2 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-xl text-xs font-medium text-neutral-700"
                      >
                        <span>{file}</span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(file)}
                          className="text-neutral-400 hover:text-red-500 cursor-pointer"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Form Submission Buttons */}
      {errors.submit && (
        <div className="flex items-center space-x-2 text-xs text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errors.submit}</span>
        </div>
      )}
      <div className="flex items-center gap-3 justify-end pt-4 border-t border-[#e1e5f5]">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-[#e1e5f5] rounded-full bg-white text-neutral-700 hover:bg-neutral-55 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting || uploadingDoc}
          className="flex items-center space-x-2 px-8 py-3 bg-[#3762f9] hover:bg-[#2748c9] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full text-xs font-bold tracking-wide transition-all shadow-[0_4px_12px_rgba(55,98,249,0.2)] cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block border-2 border-t-transparent border-white rounded-full h-3 w-3 animate-spin"></span>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span>Save Vendor</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </form>
  );
}
