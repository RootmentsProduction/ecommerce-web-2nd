"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface PortalDropdownProps {
  trigger: (open: boolean, toggle: () => void) => React.ReactNode;
  renderContent: (close: () => void) => React.ReactNode;
  align?: "left" | "right";
}

export default function PortalDropdown({
  trigger,
  renderContent,
  align = "left",
}: PortalDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const close = () => setIsOpen(false);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 4;
      let left = rect.left + window.scrollX;

      if (align === "right") {
        left = rect.right + window.scrollX;
      }

      setCoords({
        top,
        left,
        width: rect.width,
      });
    }
  }, [align]);

  useEffect(() => {
    if (!isOpen) return;

    // Recalculate position immediately on open
    updatePosition();

    const handleScrollAndResize = () => {
      updatePosition();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    window.addEventListener("scroll", handleScrollAndResize, true);
    window.addEventListener("resize", handleScrollAndResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize, true);
      window.removeEventListener("resize", handleScrollAndResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, updatePosition]);

  return (
    <div ref={triggerRef} className="inline-block">
      {trigger(isOpen, toggle)}
      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            className="absolute z-[9999] bg-white rounded-xl border border-neutral-200 shadow-xl overflow-hidden animate-in fade-in duration-100"
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              transform: align === "right" ? "translateX(-100%)" : "none",
              minWidth: "220px",
            }}
          >
            {renderContent(close)}
          </div>,
          document.body
        )}
    </div>
  );
}
