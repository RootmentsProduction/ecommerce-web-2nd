"use client";

import React, { useState, useEffect } from "react";
import { Upload, Trash2, Video, Image as ImageIcon, Loader2, MessageSquare, AlertCircle } from "lucide-react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import { getSystemSettings, saveSystemSetting } from "@/services/system-settings.service";
import { uploadFile } from "@/services/media.service";

export default function AdminHomepageConfigPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [reels, setReels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload loaders
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingCategory, setUploadingCategory] = useState(false);
  const [uploadingReel, setUploadingReel] = useState(false);

  // Promo Popup config states
  const [promoPopupEnabled, setPromoPopupEnabled] = useState(false);
  const [promoPopupTitle, setPromoPopupTitle] = useState("");
  const [promoPopupDescription, setPromoPopupDescription] = useState("");
  const [promoPopupLink, setPromoPopupLink] = useState("");
  const [promoPopupImage, setPromoPopupImage] = useState("");
  const [uploadingPromoImage, setUploadingPromoImage] = useState(false);
  const [savingPromo, setSavingPromo] = useState(false);

  const breadcrumbs = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Homepage Settings" },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await getSystemSettings();
      setSettings(data);
      if (data.instagram_videos) {
        try {
          const parsed = JSON.parse(data.instagram_videos);
          if (Array.isArray(parsed)) {
            setReels(parsed);
          }
        } catch (e) {
          console.error("Failed to parse instagram reels:", e);
        }
      }

      // Load popup settings
      setPromoPopupEnabled(data.promo_popup_enabled === "true");
      setPromoPopupTitle(data.promo_popup_title || "");
      setPromoPopupDescription(data.promo_popup_description || "");
      setPromoPopupLink(data.promo_popup_link || "");
      setPromoPopupImage(data.promo_popup_image || "");
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  // Image Upload Handlers
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    try {
      const url = await uploadFile(file, "categories");
      await saveSystemSetting("hero_image", url);
      setSettings(prev => ({ ...prev, hero_image: url }));
      alert("Hero image updated successfully!");
    } catch (err) {
      console.error("Hero upload failed:", err);
      alert("Failed to upload hero image.");
    } finally {
      setUploadingHero(false);
    }
  };

  const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCategory(true);
    try {
      const url = await uploadFile(file, "categories");
      await saveSystemSetting("category_image", url);
      setSettings(prev => ({ ...prev, category_image: url }));
      alert("Categories banner updated successfully!");
    } catch (err) {
      console.error("Category upload failed:", err);
      alert("Failed to upload categories banner.");
    } finally {
      setUploadingCategory(false);
    }
  };

  // Video Reels Handlers
  const handleReelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingReel(true);
    try {
      const url = await uploadFile(file, "categories");
      const updatedReels = [...reels, url];
      await saveSystemSetting("instagram_videos", JSON.stringify(updatedReels));
      setReels(updatedReels);
      alert("Reel video added successfully!");
    } catch (err) {
      console.error("Reel upload failed:", err);
      alert("Failed to upload video reel.");
    } finally {
      setUploadingReel(false);
    }
  };

  const handleDeleteReel = async (idxToDelete: number) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this instagram video reel?");
    if (!confirmDelete) return;

    const updatedReels = reels.filter((_, idx) => idx !== idxToDelete);
    try {
      await saveSystemSetting("instagram_videos", JSON.stringify(updatedReels));
      setReels(updatedReels);
      alert("Reel removed successfully!");
    } catch (err) {
      console.error("Failed to delete reel:", err);
      alert("Failed to delete reel.");
    }
  };

  // Promo Popup Handlers
  const handlePromoImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPromoImage(true);
    try {
      const url = await uploadFile(file, "categories");
      setPromoPopupImage(url);
      alert("Promo popup image uploaded successfully! Click 'Save Popup Configuration' below to save changes.");
    } catch (err) {
      console.error("Promo image upload failed:", err);
      alert("Failed to upload promo image.");
    } finally {
      setUploadingPromoImage(false);
    }
  };

  const handleSavePromoSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPromo(true);
    try {
      await Promise.all([
        saveSystemSetting("promo_popup_enabled", promoPopupEnabled ? "true" : "false"),
        saveSystemSetting("promo_popup_title", promoPopupTitle),
        saveSystemSetting("promo_popup_description", promoPopupDescription),
        saveSystemSetting("promo_popup_link", promoPopupLink),
        saveSystemSetting("promo_popup_image", promoPopupImage),
      ]);
      alert("Promo Announcement settings saved successfully!");
    } catch (err) {
      console.error("Failed to save promo settings:", err);
      alert("Failed to save promo configuration settings.");
    } finally {
      setSavingPromo(false);
    }
  };

  const getReelSource = (filename: string) => {
    if (filename.startsWith('http') || filename.startsWith('/')) {
      return filename;
    }
    return `/videos/${encodeURIComponent(filename)}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8F8F8] admin-dashboard-root">
        <AdminTopbar breadcrumbItems={breadcrumbs} showSearch={false} />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#C99213] animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8] admin-dashboard-root font-sans">
      <AdminTopbar breadcrumbItems={breadcrumbs} showSearch={false} />

      <div className="flex-grow p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* Title block */}
        <div>
          <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
            HOMEPAGE CONFIGURATOR
          </h1>
          <p className="text-[11px] text-neutral-500 mt-1 font-medium">
            Manage your storefront banners, promo popups, and instagram video marquee layout.
          </p>
        </div>

        {/* 2-Column Banner Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Main Hero Image card */}
          <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6 space-y-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Front Hero Image
              </h2>
              <p className="text-[10px] text-neutral-400 mt-0.5">
                Main background image displayed in the welcome hero banner. Recommend high-res 1920x1080.
              </p>
            </div>

            {/* Preview image */}
            <div className="relative aspect-video w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl overflow-hidden flex items-center justify-center">
              {settings.hero_image ? (
                <img
                  src={settings.hero_image}
                  alt="Current Hero Background"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center space-y-1 text-neutral-400">
                  <ImageIcon className="w-8 h-8 opacity-70" />
                  <span className="text-[11px] font-medium">No Custom Hero Background set</span>
                  <span className="text-[9px] opacity-70">Falling back to static: /hero-bg-v2.jpg</span>
                </div>
              )}

              {uploadingHero && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-[#C99213] animate-spin" />
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex items-center justify-end">
              <label className="flex items-center space-x-2 px-5 py-2.5 bg-[#C99213] hover:bg-[#a9831e] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-sm">
                <Upload className="w-4 h-4" />
                <span>Upload New Hero</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Categories Editorial Image card */}
          <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6 space-y-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Categories Editorial Banner
              </h2>
              <p className="text-[10px] text-neutral-400 mt-0.5">
                Large editorial style showcase image displayed in the right column of the categories list section.
              </p>
            </div>

            {/* Preview image */}
            <div className="relative aspect-video w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl overflow-hidden flex items-center justify-center">
              {settings.category_image ? (
                <img
                  src={settings.category_image}
                  alt="Current Category Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center space-y-1 text-neutral-400">
                  <ImageIcon className="w-8 h-8 opacity-70" />
                  <span className="text-[11px] font-medium">No Custom Categories Banner set</span>
                  <span className="text-[9px] opacity-70">Falling back to static: /cat_large.png</span>
                </div>
              )}

              {uploadingCategory && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-[#C99213] animate-spin" />
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex items-center justify-end">
              <label className="flex items-center space-x-2 px-5 py-2.5 bg-[#C99213] hover:bg-[#a9831e] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-sm">
                <Upload className="w-4 h-4" />
                <span>Upload New Banner</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCategoryImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Promo Announcement Popup Configurator Card */}
        <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C99213]" />
              <span>Promo / Announcement Popup Modal</span>
            </h2>
            <p className="text-[10px] text-neutral-400 mt-0.5">
              Configure a premium modal dialog overlay containing specific ads or announcements that pops up in the storefront center on page reload.
            </p>
          </div>

          <form onSubmit={handleSavePromoSettings} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Inputs (Left) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Toggle switch */}
              <div className="flex items-center justify-between p-4 bg-[#FAF9F6] border border-[#E5E5E5] rounded-xl">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-neutral-800 block">Enable Announcement Popup</span>
                  <span className="text-[9px] text-neutral-400 block">Control whether the ad modal is displayed to visitors.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={promoPopupEnabled}
                    onChange={(e) => setPromoPopupEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C99213]" />
                </label>
              </div>

              {/* Title input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block">
                  Popup Title
                </label>
                <input
                  type="text"
                  value={promoPopupTitle}
                  onChange={(e) => setPromoPopupTitle(e.target.value)}
                  placeholder="e.g. Exclusive Festive Sale!"
                  className="w-full h-11 px-4 border border-[#E5E5E5] rounded-xl text-xs bg-white focus:outline-none focus:border-[#C99213] text-neutral-800"
                />
              </div>

              {/* Description input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block">
                  Announcement Details / Description
                </label>
                <textarea
                  value={promoPopupDescription}
                  onChange={(e) => setPromoPopupDescription(e.target.value)}
                  placeholder="e.g. Discover our latest curated heritage jewelry with up to 10% off for new customers."
                  rows={4}
                  className="w-full p-4 border border-[#E5E5E5] rounded-xl text-xs bg-white focus:outline-none focus:border-[#C99213] text-neutral-800 resize-none"
                />
              </div>

              {/* Redirect link input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block">
                  CTA Redirect Action Link (Optional)
                </label>
                <input
                  type="text"
                  value={promoPopupLink}
                  onChange={(e) => setPromoPopupLink(e.target.value)}
                  placeholder="e.g. /shop?category=necklaces"
                  className="w-full h-11 px-4 border border-[#E5E5E5] rounded-xl text-xs bg-white focus:outline-none focus:border-[#C99213] text-neutral-800"
                />
              </div>
            </div>

            {/* Image Preview & Upload (Right) */}
            <div className="lg:col-span-5 space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block">
                Announcement Image / Banner
              </label>

              {/* Preview image */}
              <div className="relative aspect-[4/3] w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl overflow-hidden flex items-center justify-center group">
                {promoPopupImage ? (
                  <>
                    <img
                      src={promoPopupImage}
                      alt="Promo Popup Banner"
                      className="w-full h-full object-cover"
                    />
                    {/* Clear overlay button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setPromoPopupImage("")}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center space-y-1.5 text-neutral-400 p-4 text-center">
                    <ImageIcon className="w-8 h-8 opacity-70" />
                    <span className="text-[11px] font-semibold">No Custom Banner set</span>
                    <span className="text-[9px] opacity-75">Popup will load as a compact text announcement.</span>
                  </div>
                )}

                {uploadingPromoImage && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-[#C99213] animate-spin" />
                  </div>
                )}
              </div>

              {/* Upload block trigger */}
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-neutral-400">Supported formats: JPG, PNG, WebP.</span>
                <label className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePromoImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Bottom Actions block */}
            <div className="col-span-full border-t border-neutral-100 pt-5 flex justify-end">
              <button
                type="submit"
                disabled={savingPromo}
                className="flex items-center space-x-2 px-6 py-3 bg-[#C99213] hover:bg-[#a9831e] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
              >
                {savingPromo ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span>Save Popup Configuration</span>
              </button>
            </div>
          </form>
        </div>

        {/* Video Reels Section */}
        <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Instagram Reels / Video Showcase
              </h2>
              <p className="text-[10px] text-neutral-400 mt-0.5">
                Manage the vertical videos played inside the auto-scrolling gallery widget. Supports MP4, WebM format.
              </p>
            </div>

            <label className="flex items-center space-x-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer self-start sm:self-auto shadow-sm">
              {uploadingReel ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#C99213]" />
              ) : (
                <Video className="w-4 h-4 text-[#C99213]" />
              )}
              <span>Upload Video Reel</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleReelUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Reels Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {reels.map((reel, idx) => (
              <div
                key={idx}
                className="relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group shadow-xs hover:shadow-md transition-all"
              >
                <video
                  src={getReelSource(reel)}
                  className="w-full h-full object-cover"
                  controls={false}
                  muted
                  loop
                  playsInline
                />
                
                {/* Overlay hover details */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3.5 z-10">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDeleteReel(idx)}
                      className="p-1.5 bg-red-600/90 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                      aria-label="Delete video"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[9px] text-white/80 font-mono truncate">
                    Reel #{idx + 1}
                  </span>
                </div>
              </div>
            ))}

            {reels.length === 0 && (
              <div className="col-span-full py-12 text-center text-xs text-neutral-400 font-medium">
                No custom reels uploaded. Displaying fallback catalog videos from public folder.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
