"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface BuyMeACoffeeFooterProps {
  className?: string;
  onScrollToWork?: () => void;
  onScrollToArsenal?: () => void;
  onScrollToAbout?: () => void;
  onScrollToTop?: () => void;
}

/**
 * BuyMeACoffeeFooter
 * Faithful, clean reimagining of the iconic "Superintelligent⁺" meadow reference:
 * - Serene sky with soft twilight clouds and floating monarch butterflies.
 * - Bold iconic typography: "Buy Me a Coffee⁺" with glowing emerald star.
 * - Lush curved meadow hill populated with delicate wildflowers.
 * - Centered stack of antique hardcover books with a monarch butterfly perched on top.
 * - Clean, exclusive Buy Me a Coffee integration:
 *   - Direct Link: https://buymeacoffee.com/luthfanmakl
 *   - Interactive official QR Code scanner modal & inline preview
 *   - Zero extra UPIs or distractions — 100% focused, clean, and interactive.
 * - Integrated editorial footer navigation & copyright.
 */
export const BuyMeACoffeeFooter: React.FC<BuyMeACoffeeFooterProps> = ({
  className = "",
  onScrollToWork,
  onScrollToArsenal,
  onScrollToAbout,
  onScrollToTop,
}) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const bmacUrl = "https://buymeacoffee.com/luthfanmakl";
  const bmacDisplayUrl = "buymeacoffee.com/luthfanmakl";

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(bmacUrl);
      setCopiedLink(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("foley-click"));
      }
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsQrModalOpen(false);
    };
    if (isQrModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isQrModalOpen]);

  return (
    <footer
      id="support"
      className={`relative w-full overflow-hidden bg-gradient-to-b from-[#050B05] via-[#071308] to-[#040804] text-white ${className}`}
    >
      {/* ============================================================== */}
      {/* --- ATMOSPHERIC SKY & SOFT CLOUDS ---------------------------- */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Soft Organic Emerald Nebula Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#5DD62C]/10 via-[#5DD62C]/5 to-transparent blur-3xl rounded-full" />

        {/* Soft Fluffy Twilight Clouds */}
        <div className="absolute top-10 left-[10%] w-72 h-24 bg-white/[0.03] blur-2xl rounded-full" />
        <div className="absolute top-20 right-[15%] w-80 h-28 bg-[#5DD62C]/[0.04] blur-2xl rounded-full" />
        <div className="absolute top-4 left-[45%] w-96 h-20 bg-white/[0.02] blur-xl rounded-full" />

        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-screen"
          style={{
            backgroundImage: "url('/images/bg-black-pattern.jpg')",
            backgroundSize: "cover",
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* --- FLOATING MONARCH BUTTERFLIES (SKY LEVEL) ----------------- */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Butterfly 1: Far Left floating high */}
        <div
          className="absolute top-14 left-[8%] sm:left-[14%] animate-float"
          style={{ animationDuration: "6.5s" }}
        >
          <svg
            viewBox="0 0 32 32"
            className="w-5 h-5 sm:w-6 sm:h-6 -rotate-12 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]"
          >
            <path d="M16 16 C11 5, 2 8, 4 19 C6 24, 13 20, 16 18 Z" fill="#F59E0B" />
            <path d="M16 16 C21 5, 30 8, 28 19 C26 24, 19 20, 16 18 Z" fill="#D97706" />
            <circle cx="16" cy="16" r="1.2" fill="#18181B" />
          </svg>
        </div>

        {/* Butterfly 2: Mid-Left dipping toward hill */}
        <div
          className="absolute top-36 left-[22%] sm:left-[28%] animate-float"
          style={{ animationDuration: "5.8s", animationDelay: "1.4s" }}
        >
          <svg
            viewBox="0 0 32 32"
            className="w-4 h-4 sm:w-5 sm:h-5 rotate-6 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]"
          >
            <path d="M16 16 C12 7, 3 9, 5 18 C7 23, 14 20, 16 18 Z" fill="#FBBF24" />
            <path d="M16 16 C20 7, 29 9, 27 18 C25 23, 18 20, 16 18 Z" fill="#D97706" />
            <circle cx="16" cy="16" r="1" fill="#18181B" />
          </svg>
        </div>

        {/* Butterfly 3: Top-Center fluttering above typography */}
        <div
          className="absolute top-8 left-[52%] sm:left-[51%] animate-float"
          style={{ animationDuration: "7.2s", animationDelay: "0.7s" }}
        >
          <svg
            viewBox="0 0 32 32"
            className="w-5 h-5 sm:w-6 sm:h-6 rotate-12 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          >
            <path d="M16 16 C11 6, 2 8, 4 18 C6 24, 13 20, 16 18 Z" fill="#F59E0B" />
            <path d="M16 16 C21 6, 30 8, 28 18 C26 24, 19 20, 16 18 Z" fill="#B45309" />
            <circle cx="16" cy="16" r="1.2" fill="#18181B" />
          </svg>
        </div>

        {/* Butterfly 4: Mid-Right floating gracefully */}
        <div
          className="absolute top-20 right-[10%] sm:right-[18%] animate-float"
          style={{ animationDuration: "6.2s", animationDelay: "2.1s" }}
        >
          <svg
            viewBox="0 0 32 32"
            className="w-4 h-4 sm:w-5 sm:h-5 -rotate-6 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]"
          >
            <path d="M16 16 C12 7, 3 9, 5 18 C7 23, 14 20, 16 18 Z" fill="#F59E0B" />
            <path d="M16 16 C20 7, 29 9, 27 18 C25 23, 18 20, 16 18 Z" fill="#D97706" />
            <circle cx="16" cy="16" r="1" fill="#18181B" />
          </svg>
        </div>

        {/* Butterfly 5: Far Right dipping low */}
        <div
          className="absolute top-44 right-[6%] sm:right-[12%] animate-float"
          style={{ animationDuration: "5.5s", animationDelay: "3.0s" }}
        >
          <svg
            viewBox="0 0 32 32"
            className="w-4 h-4 rotate-15 drop-shadow-[0_0_5px_rgba(245,158,11,0.4)]"
          >
            <path d="M16 16 C11 7, 3 9, 5 18 C7 22, 14 19, 16 17 Z" fill="#D97706" />
            <path d="M16 16 C21 7, 29 9, 27 18 C25 22, 18 19, 16 17 Z" fill="#B45309" />
          </svg>
        </div>
      </div>

      {/* ============================================================== */}
      {/* --- MAIN HERO OUTRO STAGE ------------------------------------ */}
      {/* ============================================================== */}
      <div className="relative z-20 mx-auto max-w-7xl pt-16 sm:pt-24 pb-4 flex flex-col items-center text-center px-4">
        {/* ============================================================ */}
        {/* --- ICONIC TITLE: "Buy Me a Coffee⁺" (EXACT IMAGE STYLE) --- */}
        {/* ============================================================ */}
        <div className="relative mb-8 sm:mb-12">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F4F5F4] flex items-center justify-center select-none leading-none">
            <span className="drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
              Buy Me a Coffee
            </span>
            <span className="text-[#5DD62C] ml-1 sm:ml-2.5 font-sans font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-glow-green">
              ⁺
            </span>
          </h2>
          <p className="mt-3 font-mono text-xs sm:text-sm text-white/60 tracking-wider">
            Fuel creative exploration, open-source builds &amp; late-night code
          </p>
        </div>

        {/* ============================================================ */}
        {/* --- MEADOW HILL + CENTERED BOOK STACK & MONARCH BUTTERFLY -- */}
        {/* ============================================================ */}
        <div className="relative w-full max-w-4xl flex flex-col items-center justify-end select-none">
          {/* Centered Vintage Book Stack + Monarch Butterfly */}
          <div className="relative z-20 flex flex-col items-center -mb-3 sm:-mb-4">
            {/* The Hero Monarch Butterfly (Sitting on top book) */}
            <div
              className="relative z-30 mb-0.5 animate-float"
              style={{ animationDuration: "4.5s" }}
            >
              <svg
                viewBox="0 0 48 40"
                className="w-10 h-8 sm:w-12 sm:h-10 drop-shadow-[0_0_12px_rgba(245,158,11,0.85)] -rotate-3"
              >
                {/* Left Forewing */}
                <path
                  d="M24 22 C18 6, 4 8, 6 24 C8 32, 20 26, 24 24 Z"
                  fill="#F59E0B"
                  stroke="#18181B"
                  strokeWidth="1.2"
                />
                <path
                  d="M12 14 C16 18, 20 21, 24 22"
                  stroke="#18181B"
                  strokeWidth="0.8"
                  fill="none"
                />
                <circle cx="8" cy="18" r="0.8" fill="#F4F5F4" />
                <circle cx="10" cy="22" r="0.8" fill="#F4F5F4" />

                {/* Right Forewing */}
                <path
                  d="M24 22 C30 6, 44 8, 42 24 C40 32, 28 26, 24 24 Z"
                  fill="#D97706"
                  stroke="#18181B"
                  strokeWidth="1.2"
                />
                <path
                  d="M36 14 C32 18, 28 21, 24 22"
                  stroke="#18181B"
                  strokeWidth="0.8"
                  fill="none"
                />
                <circle cx="40" cy="18" r="0.8" fill="#F4F5F4" />
                <circle cx="38" cy="22" r="0.8" fill="#F4F5F4" />

                {/* Butterfly Body */}
                <ellipse cx="24" cy="23" rx="1.5" ry="5.5" fill="#18181B" />
                <line x1="23" y1="18" x2="20" y2="13" stroke="#18181B" strokeWidth="0.8" />
                <line x1="25" y1="18" x2="28" y2="13" stroke="#18181B" strokeWidth="0.8" />
              </svg>
            </div>

            {/* Antique Hardcover Book Stack */}
            <div className="flex flex-col items-center">
              {/* Book 1 (Top: Emerald Leather with Gold Band) */}
              <div className="relative w-28 sm:w-36 h-4 sm:h-5 rounded-xs bg-[#17381C] border-t border-x border-[#5DD62C]/40 shadow-md flex items-center justify-between px-2.5">
                <span className="block h-1 w-6 sm:w-8 bg-[#5DD62C]/60 rounded-xs" />
                <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-[#5DD62C] font-semibold">
                  VOL. I
                </span>
                <span className="block h-1 w-2 bg-[#5DD62C]/40 rounded-xs" />
              </div>

              {/* Book 2 (Middle-Top: Dark Walnut Cloth) */}
              <div className="relative w-32 sm:w-42 h-4 sm:h-5 rounded-xs bg-[#221C16] border-t border-x border-amber-600/30 shadow-md flex items-center justify-between px-3 -mt-0.5">
                <span className="block h-1 w-10 sm:w-14 bg-amber-400/40 rounded-xs" />
                <span className="text-[7px] sm:text-[8px] font-mono tracking-wider text-amber-300/80">
                  SYSTEMS
                </span>
              </div>

              {/* Book 3 (Middle-Bottom: Deep Slate Grey) */}
              <div className="relative w-36 sm:w-48 h-4.5 sm:h-5.5 rounded-xs bg-[#19221C] border-t border-x border-white/20 shadow-md flex items-center justify-between px-3.5 -mt-0.5">
                <span className="block h-1 w-12 sm:w-16 bg-white/30 rounded-xs" />
                <span className="text-[7px] sm:text-[8px] font-mono tracking-wider text-white/60">
                  ALGORITHMS
                </span>
              </div>

              {/* Book 4 (Base: Heavy Folio Volume with Ribbon) */}
              <div className="relative w-40 sm:w-54 h-5 sm:h-6 rounded-xs bg-[#0E1610] border-t border-x border-[#5DD62C]/30 shadow-lg flex items-center justify-between px-4 -mt-0.5">
                <span className="block h-1.5 w-16 sm:w-20 bg-[#5DD62C]/50 rounded-xs" />
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#5DD62C]/90 font-bold">
                  FOLIO 2026
                </span>
                {/* Hanging Silk Ribbon Bookmark */}
                <div className="absolute -bottom-2 right-6 w-1.5 h-3 bg-amber-500 rounded-b-xs shadow-xs" />
              </div>
            </div>
          </div>

          {/* Curved Lush Meadow Hill (SVG Horizon) */}
          <div className="relative w-full overflow-hidden">
            <svg
              viewBox="0 0 1000 160"
              className="w-full h-24 sm:h-36 md:h-44 text-[#0E2412]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1C4520" />
                  <stop offset="35%" stopColor="#122E15" />
                  <stop offset="75%" stopColor="#0B1C0D" />
                  <stop offset="100%" stopColor="#050B05" />
                </linearGradient>
                <radialGradient id="hillGlow" cx="50%" cy="10%" r="50%">
                  <stop offset="0%" stopColor="#5DD62C" stopOpacity="0.35" />
                  <stop offset="70%" stopColor="#5DD62C" stopOpacity="0.0" />
                </radialGradient>
              </defs>

              {/* Ambient Meadow Glow */}
              <path d="M 0 160 Q 500 20 1000 160 Z" fill="url(#hillGlow)" />

              {/* Main Grassy Hill Mound */}
              <path
                d="M 0 160 Q 500 28 1000 160 Z"
                fill="url(#hillGrad)"
                stroke="rgba(93, 214, 44, 0.4)"
                strokeWidth="1.5"
              />

              {/* Delicate Wildflowers on Hill Surface */}
              <circle cx="460" cy="55" r="2.5" fill="#F59E0B" />
              <circle cx="475" cy="62" r="2" fill="#EC4899" />
              <circle cx="530" cy="56" r="2.5" fill="#38BDF8" />
              <circle cx="545" cy="64" r="2" fill="#FBBF24" />
              <circle cx="500" cy="50" r="1.5" fill="#5DD62C" />

              <circle cx="280" cy="85" r="2" fill="#F59E0B" />
              <circle cx="310" cy="80" r="2.5" fill="#EC4899" />
              <circle cx="340" cy="74" r="2" fill="#5DD62C" />
              <circle cx="380" cy="70" r="2.5" fill="#38BDF8" />
              <circle cx="220" cy="105" r="2" fill="#FBBF24" />
              <circle cx="150" cy="125" r="2.5" fill="#EC4899" />

              <circle cx="620" cy="72" r="2.5" fill="#EC4899" />
              <circle cx="660" cy="78" r="2" fill="#F59E0B" />
              <circle cx="700" cy="84" r="2.5" fill="#38BDF8" />
              <circle cx="740" cy="92" r="2" fill="#5DD62C" />
              <circle cx="820" cy="112" r="2.5" fill="#FBBF24" />
              <circle cx="890" cy="130" r="2" fill="#EC4899" />
            </svg>
          </div>
        </div>

        {/* ============================================================ */}
        {/* --- EXCLUSIVE CLEAN BUY ME A COFFEE ACTIONS ----------------- */}
        {/* ============================================================ */}
        <div className="relative z-30 -mt-4 sm:-mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md px-4">
          {/* Primary Action 1: Direct Buy Me a Coffee Profile */}
          <a
            href={bmacUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-full bg-[#5DD62C] px-8 py-3.5 font-mono text-xs font-bold text-[#060B06] shadow-[0_0_25px_rgba(93,214,44,0.35)] transition-all duration-200 hover:bg-[#52c027] hover:scale-105 active:scale-95"
          >
            <span>☕ Buy Me a Coffee</span>
            <span className="text-xs">↗</span>
          </a>

          {/* Primary Action 2: Interactive QR Code View */}
          <button
            onClick={() => {
              setIsQrModalOpen(true);
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("foley-click"));
              }
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-mono text-xs font-medium text-white shadow-xs backdrop-blur-md transition-all duration-200 hover:border-[#5DD62C] hover:bg-[#5DD62C]/20 active:scale-95"
          >
            <span>📱 Scan QR Code</span>
          </button>
        </div>

        {/* Subtle Direct URL & Copy Trigger */}
        <div className="relative z-30 mt-4 flex items-center justify-center gap-2 font-mono text-xs text-white/60">
          <a
            href={bmacUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#5DD62C] transition-colors underline underline-offset-4"
          >
            {bmacDisplayUrl}
          </a>
          <span className="text-white/30">•</span>
          <button
            onClick={handleCopyLink}
            className="hover:text-[#5DD62C] transition-colors"
          >
            {copiedLink ? "✓ Link Copied!" : "Copy Link"}
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* --- INTEGRATED CLEAN EDITORIAL FOOTER STRIP ------------------ */}
      {/* ============================================================== */}
      <div className="relative z-30 w-full border-t border-white/10 bg-[#040804]/90 backdrop-blur-md mt-12 py-8 px-4 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-white/70">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="font-bold text-white tracking-wider uppercase">
              LUTFAN MOHAMMED ASIF
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="text-white/60">Computer Science Student · Karnataka, India</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {onScrollToWork && (
              <button
                onClick={onScrollToWork}
                className="hover:text-[#5DD62C] transition-colors"
              >
                Work
              </button>
            )}
            {onScrollToArsenal && (
              <button
                onClick={onScrollToArsenal}
                className="hover:text-[#5DD62C] transition-colors"
              >
                Arsenal
              </button>
            )}
            {onScrollToAbout && (
              <button
                onClick={onScrollToAbout}
                className="hover:text-[#5DD62C] transition-colors"
              >
                About
              </button>
            )}
            <a
              href="https://github.com/luthfan-tech"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#5DD62C] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/lutfan-mohammed-asif-692676414"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#5DD62C] transition-colors"
            >
              LinkedIn ↗
            </a>
            {onScrollToTop && (
              <button
                onClick={onScrollToTop}
                className="text-[#5DD62C] font-semibold hover:text-white transition-colors"
              >
                Top ↑
              </button>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-7xl mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-white/50">
          <span>© 2026 Lutfan Mohammed Asif</span>
          <span className="text-[#5DD62C]/80">Crafting algorithmic systems &amp; spatial web interfaces</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* --- OFFICIAL BUY ME A COFFEE QR MODAL ------------------------ */}
      {/* ============================================================== */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-[#0A120A] p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(93,214,44,0.15)] flex flex-col items-center text-center">
            {/* Close Button */}
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-xs text-white hover:bg-rose-500 hover:border-rose-500 hover:text-white transition-colors"
            >
              ✕
            </button>

            {/* Modal Heading */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm">☕</span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#5DD62C] font-semibold uppercase">
                BUY ME A COFFEE
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Scan to Support
            </h3>
            <p className="text-xs text-white/70 mt-1 max-w-xs">
              Point your smartphone camera to open on mobile
            </p>

            {/* Official Buy Me a Coffee QR Code Image */}
            <div className="mt-5 relative rounded-2xl bg-white p-3.5 shadow-2xl border-4 border-[#5DD62C]/40">
              <Image
                src="/images/buymeacoffee-qr.jpg"
                alt="Buy Me a Coffee QR Code - Lutfan"
                width={220}
                height={220}
                className="rounded-lg object-contain"
                priority
              />
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#060B06] border border-[#5DD62C] px-3 py-0.5 text-[9px] font-mono font-bold text-[#5DD62C] shadow-sm whitespace-nowrap">
                SCAN WITH ANY PHONE CAMERA
              </div>
            </div>

            {/* Direct Link Action */}
            <div className="mt-6 w-full flex flex-col gap-2 font-mono text-xs">
              <a
                href={bmacUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#5DD62C] py-3 font-bold text-[#060B06] shadow-[0_0_15px_rgba(93,214,44,0.3)] transition-all hover:bg-[#52c027] active:scale-95"
              >
                <span>Open {bmacDisplayUrl}</span>
                <span>↗</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="w-full rounded-xl border border-white/20 bg-white/5 py-2.5 text-white/80 transition-all hover:bg-white/10 hover:text-white"
              >
                {copiedLink ? "✓ Copied to Clipboard!" : "Copy Direct Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
