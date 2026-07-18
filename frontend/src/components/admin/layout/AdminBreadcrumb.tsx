import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
  return (
    <nav className="flex items-center text-xs font-medium tracking-wide">
      <Link href="/admin" className="text-[#C99213] hover:underline font-semibold">
        Jewelry
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          <span className="mx-2 text-neutral-400 font-light">&gt;</span>
          {item.href ? (
            <Link href={item.href} className="text-neutral-400 hover:text-neutral-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-500 font-normal">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
