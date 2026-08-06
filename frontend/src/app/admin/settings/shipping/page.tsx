"use client";

import React, { useEffect, useState } from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import {
  getShippingSettings,
  updateShippingSettings,
  testShiprocketConnection,
  ShippingSettings,
} from "@/services/shipping.service";

export default function AdminShippingSettingsPage() {
  const [settings, setSettings] = useState<ShippingSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    getShippingSettings()
      .then((res) => {
        setSettings(res);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message || "Failed to load shipping settings");
        setLoading(false);
      });
  }, []);

  const handleChange = (key: keyof ShippingSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const updated = await updateShippingSettings(settings);
      setSettings(updated);
      setToastMessage("Shipping settings saved successfully!");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await testShiprocketConnection();
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || "Connection test failed." });
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500 font-sans">
        Loading Shipping Settings...
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Settings", href: "/admin/settings/shipping" },
    { label: "Shipping" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8] text-left">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#1C1B19] text-white border border-[#C99213] rounded-lg shadow-xl px-5 py-3 text-xs font-semibold flex items-center space-x-2 animate-bounce font-sans">
          <svg className="w-4 h-4 text-[#C99213]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      <AdminTopbar breadcrumbItems={breadcrumbs} showSearch={false} />

      <div className="flex-1 p-6 md:p-8 space-y-6 max-w-5xl w-full mx-auto font-sans">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
              SHIPPING SETTINGS
            </h1>
            <p className="text-xs text-neutral-500 font-questrial mt-1">
              Configure Shiprocket integration, default dimensions, auto-fulfillment rules, and shipping charges.
            </p>
          </div>
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testing}
            className="px-4 py-2 bg-[#1C1B19] hover:bg-neutral-800 disabled:opacity-50 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-2"
          >
            {testing ? <span>Testing...</span> : <span>🔌 Test Connection</span>}
          </button>
        </div>

        {testResult && (
          <div
            className={`p-4 rounded-xl border text-xs font-semibold flex items-center space-x-3 ${
              testResult.success
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            <span className="text-base">{testResult.success ? "✓" : "⚠️"}</span>
            <span>{testResult.message}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Default Pickup Location */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-2">
              Default Pickup Location
            </h2>
            <div>
              <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                Pickup Location Name (as registered on Shiprocket panel)
              </label>
              <input
                type="text"
                value={settings?.pickupLocation || ""}
                onChange={(e) => handleChange("pickupLocation", e.target.value)}
                className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
              />
            </div>
          </div>

          {/* Section 2: Default Dimensions & Weights */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-2">
              Default Package Dimensions & Weight
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Length (cm)
                </label>
                <input
                  type="number"
                  value={settings?.defaultLength || 20}
                  onChange={(e) => handleChange("defaultLength", parseFloat(e.target.value))}
                  className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Width (cm)
                </label>
                <input
                  type="number"
                  value={settings?.defaultWidth || 20}
                  onChange={(e) => handleChange("defaultWidth", parseFloat(e.target.value))}
                  className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={settings?.defaultHeight || 10}
                  onChange={(e) => handleChange("defaultHeight", parseFloat(e.target.value))}
                  className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Weight ({settings?.weightUnit || "kg"})
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={settings?.defaultWeight || 0.5}
                  onChange={(e) => handleChange("defaultWeight", parseFloat(e.target.value))}
                  className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                Weight Unit
              </label>
              <select
                value={settings?.weightUnit || "kg"}
                onChange={(e) => handleChange("weightUnit", e.target.value)}
                className="w-full max-w-xs border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
              </select>
            </div>
          </div>

          {/* Section 3: Fulfillment & Automation Switches */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-2">
              Fulfillment Automation Switches
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings?.autoCreateShipment || false}
                  onChange={(e) => handleChange("autoCreateShipment", e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#C99213]"
                />
                <div>
                  <span className="text-xs font-bold text-neutral-800 block">Auto Create Shipment</span>
                  <span className="text-[11px] text-neutral-500 block">Create provider shipment automatically on order paid</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings?.autoAssignCourier || false}
                  onChange={(e) => handleChange("autoAssignCourier", e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#C99213]"
                />
                <div>
                  <span className="text-xs font-bold text-neutral-800 block">Auto Assign Courier</span>
                  <span className="text-[11px] text-neutral-500 block">Select cheapest/best courier automatically</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings?.autoGenerateAwb || false}
                  onChange={(e) => handleChange("autoGenerateAwb", e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#C99213]"
                />
                <div>
                  <span className="text-xs font-bold text-neutral-800 block">Auto Generate AWB</span>
                  <span className="text-[11px] text-neutral-500 block">Generate Airway Bill number automatically</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings?.autoSchedulePickup || settings?.autoPickup || false}
                  onChange={(e) => {
                    handleChange("autoSchedulePickup", e.target.checked);
                    handleChange("autoPickup", e.target.checked);
                  }}
                  className="w-4 h-4 rounded border-neutral-300 text-[#C99213]"
                />
                <div>
                  <span className="text-xs font-bold text-neutral-800 block">Auto Schedule Pickup</span>
                  <span className="text-[11px] text-neutral-500 block">Automatically schedule pickup request</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings?.autoGenerateManifest || settings?.autoManifest || false}
                  onChange={(e) => {
                    handleChange("autoGenerateManifest", e.target.checked);
                    handleChange("autoManifest", e.target.checked);
                  }}
                  className="w-4 h-4 rounded border-neutral-300 text-[#C99213]"
                />
                <div>
                  <span className="text-xs font-bold text-neutral-800 block">Auto Generate Manifest</span>
                  <span className="text-[11px] text-neutral-500 block">Generate shipping manifest document automatically</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings?.autoGenerateLabel || false}
                  onChange={(e) => handleChange("autoGenerateLabel", e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#C99213]"
                />
                <div>
                  <span className="text-xs font-bold text-neutral-800 block">Auto Generate Label</span>
                  <span className="text-[11px] text-neutral-500 block">Generate shipping label PDF automatically</span>
                </div>
              </label>
            </div>

            <div className="pt-2">
              <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                Default Courier Preference
              </label>
              <input
                type="text"
                value={settings?.defaultCourier || "Best Rate"}
                onChange={(e) => handleChange("defaultCourier", e.target.value)}
                placeholder="e.g. Best Rate, Blue Dart, Delhivery"
                className="w-full max-w-md border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
              />
            </div>
          </div>

          {/* Section 4: Shipping Charge Rules */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-2">
              Shipping Charges & Free Shipping Threshold
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Free Shipping Minimum Order (₹)
                </label>
                <input
                  type="number"
                  value={settings?.freeShippingThreshold || 2000}
                  onChange={(e) => handleChange("freeShippingThreshold", parseFloat(e.target.value))}
                  className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Standard Shipping Fee (₹)
                </label>
                <input
                  type="number"
                  value={settings?.standardShippingFee || 100}
                  onChange={(e) => handleChange("standardShippingFee", parseFloat(e.target.value))}
                  className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Express Shipping Fee (₹)
                </label>
                <input
                  type="number"
                  value={settings?.expressShippingFee || 200}
                  onChange={(e) => handleChange("expressShippingFee", parseFloat(e.target.value))}
                  className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
                />
              </div>
            </div>
          </div>

          {/* Section 5: COD, Returns & Webhooks */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-2">
              Payments, Returns & Webhook Config
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings?.codEnabled || false}
                  onChange={(e) => handleChange("codEnabled", e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#C99213]"
                />
                <span className="text-xs font-bold text-neutral-800">COD Shipping Allowed</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings?.internationalShipping || false}
                  onChange={(e) => handleChange("internationalShipping", e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#C99213]"
                />
                <span className="text-xs font-bold text-neutral-800">International Shipping</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings?.returnShippingEnabled || false}
                  onChange={(e) => handleChange("returnShippingEnabled", e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#C99213]"
                />
                <span className="text-xs font-bold text-neutral-800">Return Shipping Allowed</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  RTO Policy / Address Settings
                </label>
                <input
                  type="text"
                  value={settings?.rtoSettings || "Return to Origin Default"}
                  onChange={(e) => handleChange("rtoSettings", e.target.value)}
                  className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Webhook Secret Token
                </label>
                <input
                  type="password"
                  value={settings?.webhookSecret || ""}
                  onChange={(e) => handleChange("webhookSecret", e.target.value)}
                  placeholder="Secret token sent in x-shiprocket-secret header"
                  className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#C99213]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-[#C99213] hover:bg-[#b07e0e] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              {saving ? "Saving Changes..." : "Save Shipping Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
