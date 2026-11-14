"use client";

import React, { useEffect } from "react";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: () => void;
  onSelectWork: () => void;
  onSelectAbout: () => void;
  onSelectArsenal: () => void;
  activeMode: "hero" | "work" | "about";
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onSelectIndex,
  onSelectWork,
  onSelectAbout,
  onSelectArsenal,
  activeMode,
}) => {
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAction = (action: () => void) => {
    action();
    onClose();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#060B06]/98 p-6 backdrop-blur-2xl sm:p-10 md:hidden animate-backdrop-in"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold tracking-wider text-white uppercase">
            LUTFAN MOHAMMED ASIF
          </span>
          <span className="text-white/30">•</span>
          <span className="font-mono text-xs text-[#5DD62C]">Menu</span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs text-white shadow-xs transition-all hover:border-white/40 hover:bg-white/20 active:scale-95"
        >
          <span>✕</span>
          <span>Close</span>
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex flex-col gap-6 py-8">
        {/* Item 1: Index */}
        <button
          onClick={() => handleAction(onSelectIndex)}
          className="group flex items-center justify-between text-left"
        >
          <span
            className={`text-2xl sm:text-3xl font-medium tracking-tight transition-transform duration-200 group-hover:translate-x-1 ${
              activeMode === "hero" ? "text-[#5DD62C] font-semibold" : "text-white/70 hover:text-white"
            }`}
          >
            Index
          </span>
          <span className="font-mono text-xs text-white/40">01</span>
        </button>

        {/* Item 2: Work */}
        <button
          onClick={() => handleAction(onSelectWork)}
          className="group flex items-center justify-between text-left"
        >
          <span
            className={`text-2xl sm:text-3xl font-medium tracking-tight transition-transform duration-200 group-hover:translate-x-1 ${
              activeMode === "work" ? "text-[#5DD62C] font-semibold" : "text-white/70 hover:text-white"
            }`}
          >
            Featured Work
          </span>
          <span className="font-mono text-xs text-white/40">02</span>
        </button>

        {/* Item 3: Arsenal */}
        <button
          onClick={() => handleAction(onSelectArsenal)}
          className="group flex items-center justify-between text-left"
        >
          <span className="text-2xl sm:text-3xl font-medium tracking-tight text-white/70 hover:text-white transition-transform duration-200 group-hover:translate-x-1">
            Arsenal &amp; Toolkit
          </span>
          <span className="font-mono text-xs text-white/40">03</span>
        </button>

        {/* Item 4: About */}
        <button
          onClick={() => handleAction(onSelectAbout)}
          className="group flex items-center justify-between text-left"
        >
          <span
            className={`text-2xl sm:text-3xl font-medium tracking-tight transition-transform duration-200 group-hover:translate-x-1 ${
              activeMode === "about" ? "text-[#5DD62C] font-semibold" : "text-white/70 hover:text-white"
            }`}
          >
            About &amp; Philosophy
          </span>
          <span className="font-mono text-xs text-white/40">04</span>
        </button>

        {/* Item 5: Buy Me a Coffee */}
        <a
          href="#support"
          onClick={() => onClose()}
          className="group flex items-center justify-between text-left"
        >
          <span className="text-2xl sm:text-3xl font-medium tracking-tight text-white/70 hover:text-white transition-transform duration-200 group-hover:translate-x-1 flex items-center gap-2">
            <span>Buy Me a Coffee</span>
            <span className="text-[#5DD62C]">☕</span>
          </span>
          <span className="font-mono text-xs text-[#5DD62C]/70">05</span>
        </a>

        {/* Primary Contact CTA */}
        <div className="pt-4">
          <a
            href="mailto:contact@lutfan.dev"
            onClick={() => onClose()}
            className="flex items-center justify-between rounded-2xl bg-[#5DD62C] px-5 py-4 text-[#060B06] font-bold shadow-[0_0_20px_rgba(93,214,44,0.3)] transition-all duration-200 hover:bg-[#52c027] active:scale-95"
          >
            <span className="font-medium text-base">Get in Touch</span>
            <span className="font-mono text-base font-bold">✉ ↗</span>
          </a>
        </div>
      </nav>

      {/* Bottom Status & Links */}
      <div className="border-t border-white/10 pt-5 flex items-center justify-between font-mono text-xs text-white/60">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] animate-pulse" />
          <span>Available for Commissions</span>
        </span>
        <a
          href="https://github.com/luthfan-tech"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#5DD62C] transition-colors"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
};
