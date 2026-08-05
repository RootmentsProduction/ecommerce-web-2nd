"use client";

import React, { useState } from "react";
import {
  ShipmentDetails,
  createShipment,
  generateAwb,
  requestPickup,
  generateLabel,
  generateInvoice,
  generateManifest,
  syncShipmentStatus,
  cancelShipment,
} from "@/services/shipping.service";

interface OrderShippingCardProps {
  orderId: string;
  initialShipment?: ShipmentDetails | null;
  onShipmentUpdate?: (shipment: ShipmentDetails) => void;
}

export default function OrderShippingCard({
  orderId,
  initialShipment,
  onShipmentUpdate,
}: OrderShippingCardProps) {
  const [shipment, setShipment] = useState<ShipmentDetails | null>(initialShipment || null);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "summary" | "package" | "courier" | "documents" | "tracking" | "actions"
  >("summary");

  // Form states for creating a new shipment
  const [length, setLength] = useState<number>(shipment?.length || 20);
  const [width, setWidth] = useState<number>(shipment?.width || 20);
  const [height, setHeight] = useState<number>(shipment?.height || 10);
  const [weight, setWeight] = useState<number>(shipment?.weight || 0.5);
  const [pickupLocation, setPickupLocation] = useState<string>(shipment?.pickupLocation || "Primary");

  const [copiedAwb, setCopiedAwb] = useState(false);

  const handleAction = async (actionFn: () => Promise<ShipmentDetails>, successText: string) => {
    setLoading(true);
    setActionMessage(null);
    try {
      const updated = await actionFn();
      setShipment(updated);
      if (onShipmentUpdate) onShipmentUpdate(updated);
      setActionMessage(successText);
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err: any) {
      alert(err.message || "Action failed.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAwb(true);
    setTimeout(() => setCopiedAwb(false), 2000);
  };

  const getStatusBadge = (status?: string) => {
    const s = (status || "NEW").toUpperCase();
    if (s.includes("DELIVERED")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (s.includes("SHIPPED") || s.includes("IN_TRANSIT") || s.includes("TRANSIT"))
      return "bg-blue-50 text-blue-700 border-blue-200";
    if (s.includes("PICKUP") || s.includes("PACKED") || s.includes("ASSIGNED"))
      return "bg-amber-50 text-amber-700 border-amber-200";
    if (s.includes("CANCEL")) return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-neutral-100 text-neutral-700 border-neutral-200";
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-5 shadow-sm font-sans text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-[#C99213]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider font-sans">
            Shiprocket Fulfilment
          </h3>
        </div>
        {shipment && (
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(shipment.shipmentStatus)}`}>
            {shipment.shipmentStatus || "NEW"}
          </span>
        )}
      </div>

      {actionMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 flex items-center space-x-2">
          <span>✓</span>
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Tabs Bar */}
      {shipment && (
        <div className="flex items-center space-x-1 border-b border-neutral-200 pb-1 overflow-x-auto no-scrollbar text-xs font-bold font-sans">
          {[
            { id: "summary", label: "Summary" },
            { id: "package", label: "Package Info" },
            { id: "courier", label: "Courier Info" },
            { id: "documents", label: "Documents" },
            { id: "tracking", label: "Logs & Scans" },
            { id: "actions", label: "Actions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#1C1B19] text-white"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Unregistered Shipment Form */}
      {!shipment ? (
        <div className="space-y-4">
          <p className="text-xs text-neutral-500 font-questrial">
            No active shipment created for this order yet. Set dimensions below to register with Shiprocket.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Length (cm)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value) || 20)}
                className="w-full border border-neutral-200 rounded-lg p-2 text-xs outline-none focus:border-[#C99213]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Width (cm)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 20)}
                className="w-full border border-neutral-200 rounded-lg p-2 text-xs outline-none focus:border-[#C99213]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value) || 10)}
                className="w-full border border-neutral-200 rounded-lg p-2 text-xs outline-none focus:border-[#C99213]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0.5)}
                className="w-full border border-neutral-200 rounded-lg p-2 text-xs outline-none focus:border-[#C99213]"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Pickup Location</label>
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full border border-neutral-200 rounded-lg p-2 text-xs outline-none focus:border-[#C99213]"
            />
          </div>

          <button
            onClick={() =>
              handleAction(
                () => createShipment(orderId, { length, width, height, weight, pickupLocation }),
                "Shipment registered successfully!"
              )
            }
            disabled={loading}
            className="w-full bg-[#1C1B19] hover:bg-neutral-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer"
          >
            {loading ? "Registering..." : "Create Shipment"}
          </button>
        </div>
      ) : (
        /* Tab Content Views */
        <div className="space-y-4">
          {/* TAB 1: SUMMARY */}
          {activeTab === "summary" && (
            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Courier</span>
                <span className="font-bold text-neutral-800 mt-0.5 block">{shipment.courier || "Unassigned"}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">AWB Code</span>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="font-bold text-neutral-900 font-mono">{shipment.awb || "Not Assigned"}</span>
                  {shipment.awb && (
                    <button
                      onClick={() => copyToClipboard(shipment.awb!)}
                      className="text-[10px] text-neutral-500 hover:text-black cursor-pointer underline"
                    >
                      {copiedAwb ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Pickup Status</span>
                <span className="font-semibold text-neutral-700 mt-0.5 block">{shipment.pickupStatus || "PENDING"}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Estimated Delivery</span>
                <span className="font-semibold text-neutral-700 mt-0.5 block">
                  {shipment.estimatedDelivery
                    ? new Date(shipment.estimatedDelivery).toLocaleDateString("en-IN")
                    : "Pending Scan"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Dimensions</span>
                <span className="font-semibold text-neutral-700 mt-0.5 block">
                  {shipment.length}x{shipment.width}x{shipment.height} cm
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Weight</span>
                <span className="font-semibold text-neutral-700 mt-0.5 block">{shipment.weight} kg</span>
              </div>
            </div>
          )}

          {/* TAB 2: PACKAGE INFORMATION */}
          {activeTab === "package" && (
            <div className="space-y-3 text-xs font-sans">
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Package Metric Breakdown
                </span>
                <div className="grid grid-cols-2 gap-2 text-neutral-800">
                  <div>Length: <span className="font-bold">{shipment.length} cm</span></div>
                  <div>Width: <span className="font-bold">{shipment.width} cm</span></div>
                  <div>Height: <span className="font-bold">{shipment.height} cm</span></div>
                  <div>Weight: <span className="font-bold">{shipment.weight} kg</span></div>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Pickup Location
                </span>
                <span className="font-bold text-neutral-800">{shipment.pickupLocation || "Primary Warehouse"}</span>
              </div>
            </div>
          )}

          {/* TAB 3: COURIER INFORMATION */}
          {activeTab === "courier" && (
            <div className="space-y-3 text-xs font-sans">
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Carrier Details
                </span>
                <div className="space-y-1 text-neutral-800">
                  <div>Company: <span className="font-bold">{shipment.courier || "Pending Assignment"}</span></div>
                  <div>Company ID: <span className="font-mono font-bold">{shipment.courierCompanyId || "N/A"}</span></div>
                  <div>AWB Number: <span className="font-mono font-bold">{shipment.awb || "N/A"}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="space-y-3 text-xs font-sans">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                Downloadable Shipping Documents
              </span>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-xl border">
                  <span>Shipping Label PDF</span>
                  {shipment.labelUrl ? (
                    <a href={shipment.labelUrl} target="_blank" rel="noopener noreferrer" className="text-[#C99213] font-bold underline">
                      Download ↗
                    </a>
                  ) : (
                    <button onClick={() => handleAction(() => generateLabel(orderId), "Label generated!")} className="text-[11px] font-bold text-neutral-700 underline">
                      Generate
                    </button>
                  )}
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-xl border">
                  <span>Order Invoice PDF</span>
                  {shipment.invoiceUrl ? (
                    <a href={shipment.invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-[#C99213] font-bold underline">
                      Download ↗
                    </a>
                  ) : (
                    <button onClick={() => handleAction(() => generateInvoice(orderId), "Invoice generated!")} className="text-[11px] font-bold text-neutral-700 underline">
                      Generate
                    </button>
                  )}
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-xl border">
                  <span>Pickup Manifest</span>
                  {shipment.manifestUrl ? (
                    <a href={shipment.manifestUrl} target="_blank" rel="noopener noreferrer" className="text-[#C99213] font-bold underline">
                      Download ↗
                    </a>
                  ) : (
                    <button onClick={() => handleAction(() => generateManifest(orderId), "Manifest generated!")} className="text-[11px] font-bold text-neutral-700 underline">
                      Generate
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LOGS & SCANS */}
          {activeTab === "tracking" && (
            <div className="space-y-3 text-xs font-sans">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Carrier Scan Activities
              </span>
              {shipment.events && shipment.events.length > 0 ? (
                <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                  {shipment.events.map((ev) => (
                    <div key={ev.id} className="p-2.5 bg-neutral-50 rounded-lg border text-xs">
                      <div className="flex justify-between font-bold text-neutral-800">
                        <span>{ev.activity}</span>
                        <span className="text-[10px] text-neutral-400 font-normal">
                          {new Date(ev.eventTimestamp).toLocaleString("en-IN")}
                        </span>
                      </div>
                      {ev.location && <p className="text-[10px] text-neutral-500 mt-0.5">{ev.location}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-xs">No scan events recorded yet.</p>
              )}
            </div>
          )}

          {/* TAB 6: ACTIONS */}
          {activeTab === "actions" && (
            <div className="space-y-2 text-xs font-sans">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                Fulfillment Operations
              </span>

              <div className="grid grid-cols-2 gap-2">
                {!shipment.awb && (
                  <button
                    onClick={() => handleAction(() => generateAwb(orderId), "AWB Generated!")}
                    disabled={loading}
                    className="px-3 py-2 bg-[#C99213] hover:bg-[#b07e0e] text-white rounded-lg text-[11px] font-bold uppercase transition-colors"
                  >
                    Generate AWB
                  </button>
                )}

                {shipment.awb && shipment.pickupStatus !== "SCHEDULED" && (
                  <button
                    onClick={() => handleAction(() => requestPickup(orderId), "Pickup Requested!")}
                    disabled={loading}
                    className="px-3 py-2 bg-[#1C1B19] hover:bg-neutral-800 text-white rounded-lg text-[11px] font-bold uppercase transition-colors"
                  >
                    Request Pickup
                  </button>
                )}

                <button
                  onClick={() => handleAction(() => generateLabel(orderId), "Label Generated!")}
                  disabled={loading}
                  className="px-3 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-800 rounded-lg text-[11px] font-bold uppercase transition-colors"
                >
                  Generate Label
                </button>

                <button
                  onClick={() => handleAction(() => generateInvoice(orderId), "Invoice Generated!")}
                  disabled={loading}
                  className="px-3 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-800 rounded-lg text-[11px] font-bold uppercase transition-colors"
                >
                  Generate Invoice
                </button>

                <button
                  onClick={() => handleAction(() => generateManifest(orderId), "Manifest Generated!")}
                  disabled={loading}
                  className="px-3 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-800 rounded-lg text-[11px] font-bold uppercase transition-colors"
                >
                  Generate Manifest
                </button>

                <button
                  onClick={() => handleAction(() => syncShipmentStatus(orderId), "Status Refreshed!")}
                  disabled={loading}
                  className="px-3 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-800 rounded-lg text-[11px] font-bold uppercase transition-colors"
                >
                  Refresh Status
                </button>
              </div>

              {shipment.shipmentStatus !== "CANCELLED" && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (confirm("Cancel this shipment on Shiprocket?")) {
                        handleAction(() => cancelShipment(orderId), "Shipment cancelled.");
                      }
                    }}
                    disabled={loading}
                    className="w-full text-center text-rose-600 hover:text-rose-800 text-[11px] font-bold uppercase py-1.5 cursor-pointer"
                  >
                    Cancel Shipment
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
