import React, { useRef } from "react";
import { AdminProductMedia } from "@/types/admin";

interface ProductMediaProps {
  media: AdminProductMedia[];
  onChange: (media: AdminProductMedia[]) => void;
}

export default function ProductMediaSection({ media, onChange }: ProductMediaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newMedia: AdminProductMedia[] = [...media];

      // Limit to 5 images max
      const capacity = 5 - newMedia.length;
      const filesToProcess = filesArray.slice(0, capacity);

      filesToProcess.forEach((file, idx) => {
        const localUrl = URL.createObjectURL(file);
        newMedia.push({
          id: `media-upload-${Date.now()}-${idx}`,
          url: localUrl,
          isPrimary: newMedia.length === 0, // Mark first as primary if empty
        });
      });

      onChange(newMedia);
    }
  };

  const removeImage = (id: string) => {
    const isRemovingPrimary = media.find((m) => m.id === id)?.isPrimary;
    let newMedia = media.filter((item) => item.id !== id);

    // If we removed the primary image, make the first remaining image primary
    if (isRemovingPrimary && newMedia.length > 0) {
      newMedia = newMedia.map((m, idx) => ({
        ...m,
        isPrimary: idx === 0,
      }));
    }

    onChange(newMedia);
  };

  const setPrimary = (id: string) => {
    const newMedia = media.map((item) => ({
      ...item,
      isPrimary: item.id === id,
    }));
    onChange(newMedia);
  };

  const moveImage = (index: number, direction: "left" | "right") => {
    if (direction === "left" && index === 0) return;
    if (direction === "right" && index === media.length - 1) return;

    const newMedia = [...media];
    const targetIdx = direction === "left" ? index - 1 : index + 1;
    const temp = newMedia[index];
    newMedia[index] = newMedia[targetIdx];
    newMedia[targetIdx] = temp;

    onChange(newMedia);
  };

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-5">
      <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold tracking-wide text-neutral-800 uppercase font-sans">
            Product Images / Media
          </h2>
          <p className="text-[10px] text-neutral-400 mt-0.5">
            Add up to 5 premium media files. Mark one as primary.
          </p>
        </div>
        <span className="text-[11px] font-bold text-neutral-400">
          {media.length} / 5
        </span>
      </div>

      {/* Grid of images */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {media.map((item, idx) => (
          <div
            key={item.id}
            className={`group relative aspect-square rounded-lg overflow-hidden border flex flex-col items-center justify-center bg-neutral-50 transition-all ${
              item.isPrimary
                ? "border-[#C99213] ring-1 ring-[#C99213]/30"
                : "border-neutral-200 hover:border-neutral-400"
            }`}
          >
            {/* Image display */}
            {/* We can use standard img tags for object URL local previews */}
            <img
              src={item.url}
              alt="Product preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                // If local URL fails, fallback to gold ring SVG placeholder
                e.currentTarget.style.display = "none";
              }}
            />

            {/* Gradient Overlay for Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-2 transition-opacity">
              <div className="flex justify-between items-center">
                {/* Primary indicator toggle */}
                <button
                  type="button"
                  onClick={() => setPrimary(item.id)}
                  className={`text-[9px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                    item.isPrimary
                      ? "bg-[#C99213] text-white"
                      : "bg-white/80 text-neutral-800 hover:bg-white"
                  }`}
                >
                  {item.isPrimary ? "Primary" : "Set Main"}
                </button>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeImage(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full p-1 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Reordering indicators */}
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  onClick={() => moveImage(idx, "left")}
                  disabled={idx === 0}
                  className="bg-black/80 hover:bg-neutral-800 text-white p-1 rounded disabled:opacity-30 cursor-pointer"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(idx, "right")}
                  disabled={idx === media.length - 1}
                  className="bg-black/80 hover:bg-neutral-800 text-white p-1 rounded disabled:opacity-30 cursor-pointer"
                >
                  &rarr;
                </button>
              </div>
            </div>

            {/* Badges visible outside hover */}
            {item.isPrimary && (
              <span className="absolute top-1.5 left-1.5 bg-[#C99213] text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm">
                Primary
              </span>
            )}
          </div>
        ))}

        {/* Upload box if capacity allows */}
        {media.length < 5 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-lg border-2 border-dashed border-neutral-200 hover:border-[#C99213] flex flex-col items-center justify-center space-y-1.5 transition-colors cursor-pointer bg-[#FCFCFC]"
          >
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Upload Image
            </span>
          </button>
        )}
      </div>

      {/* Invisible file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />

      {/* Optional video field */}
      <div className="flex flex-col space-y-1.5 pt-2 border-t border-neutral-50">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
          Video LInk / Embed Placeholder
        </label>
        <input
          type="text"
          placeholder="e.g. https://youtube.com/watch?v=... or local video path"
          className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
        />
      </div>
    </div>
  );
}
