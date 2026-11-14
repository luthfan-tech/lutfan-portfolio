"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HeroScene } from "@/components/hero/HeroScene";
import { Hero2DFallback } from "@/components/hero/Hero2DFallback";
import { ComputerScene } from "@/components/computer/ComputerScene";
import { Computer2DFallback } from "@/components/computer/Computer2DFallback";
import { WebGLErrorBoundary } from "@/components/common/WebGLErrorBoundary";
import { WorkSection } from "@/components/sections/WorkSection";
import { HeroBioBridge } from "@/components/sections/HeroBioBridge";
import { AboutSection } from "@/components/sections/AboutSection";
import { BuyMeACoffeeFooter } from "@/components/sections/BuyMeACoffeeFooter";
import { EditorialArchive } from "@/components/archive/EditorialArchive";
import { AboutBio } from "@/components/about/AboutBio";
import { RetroCrtInteractiveShell } from "@/components/terminal/RetroCrtInteractiveShell";
import { TechStackMarquee } from "@/components/marquee/TechStackMarquee";
import { NavButton } from "@/components/ui/NavButton";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { FEATURED_PROJECTS } from "@/content/reels/cyberpunk";
import { useArchiveStore } from "@/lib/store";
import { useWebGL } from "@/lib/useWebGL";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export type ViewMode = "hero" | "work" | "about";

export default function HomePage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  const { activeProjectIndex, setActiveProjectIndex } = useArchiveStore();
  const { isWebGLSupported } = useWebGL();

  const [viewMode, setViewMode] = useState<ViewMode>("hero");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isRetroShellOpen, setIsRetroShellOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleOpenShell = () => setIsRetroShellOpen(true);
    window.addEventListener("open-retro-shell", handleOpenShell);
    return () => window.removeEventListener("open-retro-shell", handleOpenShell);
  }, []);

  const isSplitView = viewMode !== "hero";

  const activeProject =
    viewMode === "work"
      ? FEATURED_PROJECTS[activeProjectIndex] || null
      : null;

  // 1. Initial Page Load Entrance Animation (triggers when loading screen completes)
  useGSAP(
    () => {
      if (!isLoaded) {
        gsap.set(
          [
            heroContainerRef.current,
            ".hero-header-item",
            ".hero-footer-item",
          ],
          { opacity: 0 }
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      // Hero 3D Typography fades and floats in smoothly
      tl.fromTo(
        heroContainerRef.current,
        {
          opacity: 0,
          scale: 0.94,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
        },
        0.05
      );

      // Header items stagger in from above
      tl.fromTo(
        ".hero-header-item",
        {
          opacity: 0,
          y: -10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.28
      );

      // Footer items stagger in from below (< 1.4s total timeline)
      tl.fromTo(
        ".hero-footer-item",
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.42
      );
    },
    { dependencies: [isLoaded], scope: containerRef }
  );

  // Active Section ScrollSpy State
  const [activeSection, setActiveSection] = useState<"hero" | "work" | "arsenal" | "about">("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const workEl = document.getElementById("work");
      const arsenalEl = document.getElementById("arsenal");
      const aboutEl = document.getElementById("about");

      const workTop = workEl ? workEl.offsetTop - 220 : 800;
      const arsenalTop = arsenalEl ? arsenalEl.offsetTop - 220 : 1600;
      const aboutTop = aboutEl ? aboutEl.offsetTop - 220 : 2400;

      if (scrollY >= aboutTop) {
        setActiveSection("about");
      } else if (scrollY >= arsenalTop) {
        setActiveSection("arsenal");
      } else if (scrollY >= workTop) {
        setActiveSection("work");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Switch View Mode with Tactile Audio
  const switchView = (mode: ViewMode) => {
    setViewMode(mode);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  const scrollToTop = () => {
    if (viewMode !== "hero") setViewMode("hero");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  const scrollToWork = () => {
    if (viewMode !== "hero") setViewMode("hero");
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  const scrollToArsenal = () => {
    if (viewMode !== "hero") setViewMode("hero");
    document.getElementById("arsenal")?.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  const scrollToAbout = () => {
    if (viewMode !== "hero") setViewMode("hero");
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSplitView) {
        switchView("hero");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSplitView]);

  // Lock background body scrolling when split drawer is open
  useEffect(() => {
    if (isSplitView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSplitView]);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full overflow-x-hidden bg-transparent text-[#F4F5F4] select-none"
    >
      {/* --- ARCHITECTURAL CUSTOM LOADING SCREEN --- */}
      <LoadingScreen onLoaded={() => setIsLoaded(true)} />

      {/* ================================================================ */}
      {/* --- SECTION 1: HERO VIEWPORT (3D VOXEL CENTERPIECE) ------------ */}
      {/* ================================================================ */}
      <section id="hero" className="relative flex h-[100dvh] w-full flex-col justify-end overflow-hidden">
        {/* --- Persistent Top Navigation Header --- */}
        <header className="fixed top-0 left-0 right-0 z-40 flex w-full shrink-0 items-center justify-between px-4 py-3 sm:px-8 md:px-12 bg-[#060B06]/85 backdrop-blur-md border-b border-white/10 transition-all duration-300">
          {/* Brand / Designer Identity */}
          <div
            onClick={() => switchView("hero")}
            className="hero-header-item flex cursor-pointer items-center gap-2.5 shrink-0 select-none group"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5DD62C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5DD62C] shadow-[0_0_8px_#5DD62C]" />
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white uppercase whitespace-nowrap group-hover:text-[#5DD62C] transition-colors">
              <span className="inline sm:hidden">LUTFAN M. ASIF</span>
              <span className="hidden sm:inline">LUTFAN MOHAMMED ASIF</span>
            </span>
            <span className="hidden text-white/30 sm:inline">•</span>
            <span className="hidden font-mono text-[11px] tracking-wider text-[#5DD62C] font-semibold sm:inline whitespace-nowrap">
              CS &amp; FULL-STACK DEVELOPER
            </span>
          </div>

          {/* Desktop Navigation with Active ScrollSpy Indicator */}
          <nav className="hero-header-item hidden md:flex items-center gap-1.5 font-mono text-xs tracking-wider">
            <NavButton
              label="Index"
              active={activeSection === "hero"}
              onClick={scrollToTop}
            />
            <NavButton
              label="Work"
              active={activeSection === "work"}
              onClick={scrollToWork}
            />
            <NavButton
              label="Arsenal"
              active={activeSection === "arsenal"}
              onClick={scrollToArsenal}
            />
            <NavButton
              label="About"
              active={activeSection === "about"}
              onClick={scrollToAbout}
            />

            {/* Direct High-Contrast Primary Contact Action */}
            <a
              href="mailto:contact@lutfan.dev"
              className="ml-3 flex items-center gap-1.5 rounded-full bg-[#5DD62C] px-4 py-1.5 font-mono text-xs font-bold text-[#060B06] shadow-[0_0_15px_rgba(93,214,44,0.3)] transition-all duration-200 hover:bg-[#52c027] hover:scale-105 active:scale-95"
            >
              <span>Contact</span>
              <span className="text-xs">↗</span>
            </a>
          </nav>

          {/* Refined Mobile Controls */}
          <div className="hero-header-item flex md:hidden items-center gap-2">
            <a
              href="mailto:contact@lutfan.dev"
              className="flex items-center gap-1 rounded-full bg-[#5DD62C] px-3 py-1.5 font-mono text-[11px] font-bold text-[#060B06] shadow-xs transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Contact</span>
              <span>↗</span>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-1 font-mono text-[11px] tracking-wider rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 shadow-xs backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/20 active:scale-95 text-white"
            >
              <span className="font-semibold">Menu</span>
            </button>
          </div>
        </header>

        {/* --- 3D Canvas Area (with Graceful 2D Fallback) --- */}
        <div
          ref={heroContainerRef}
          className="absolute inset-0 h-full w-full will-change-transform z-10"
        >
          <WebGLErrorBoundary
            fallback={<Hero2DFallback onExploreWork={() => switchView("work")} />}
          >
            {isWebGLSupported ? (
              <HeroScene onDragStateChange={setIsDragging} />
            ) : (
              <Hero2DFallback onExploreWork={() => switchView("work")} />
            )}
          </WebGLErrorBoundary>
        </div>

        {/* --- Bottom Pinned Clean Action Cluster --- */}
        <div className="hero-footer-item pointer-events-auto absolute bottom-5 sm:bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-3 px-4 transition-opacity duration-300">
          {/* Primary Call to Action: View Work */}
          <button
            onClick={scrollToWork}
            className="flex items-center gap-2 rounded-full bg-[#5DD62C] px-5 py-2.5 font-mono text-xs font-bold text-[#060B06] shadow-[0_0_20px_rgba(93,214,44,0.4)] transition-all duration-200 hover:scale-105 hover:bg-[#52c027] hover:shadow-[0_0_28px_rgba(93,214,44,0.6)] active:scale-95"
          >
            <span>View Work</span>
            <span>↓</span>
          </button>

          {/* Secondary Action: About */}
          <button
            onClick={scrollToAbout}
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-4 py-2.5 font-mono text-xs text-white font-medium backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-black/60 active:scale-95"
          >
            <span>About</span>
            <span>→</span>
          </button>
        </div>
      </section>

      {/* ================================================================ */}
      {/* --- SECTION 1.5: EDITORIAL BIO & STUDIO DISPLAY COMPANION ----- */}
      {/* ================================================================ */}
      <HeroBioBridge
        onExploreWork={scrollToWork}
        onExploreAbout={scrollToAbout}
      />

      {/* ================================================================ */}
      {/* --- SECTION 2: FEATURED WORK & ENGINEERING ARCHIVE ------------- */}
      {/* ================================================================ */}
      <WorkSection
        onInspectInTerminal={(idx) => {
          setActiveProjectIndex(idx);
          switchView("work");
        }}
      />

      {/* ================================================================ */}
      {/* --- SECTION 3: DUAL INFINITE MARQUEES (STACK + TOOLS) ---------- */}
      {/* ================================================================ */}
      <TechStackMarquee />

      {/* ================================================================ */}
      {/* --- SECTION 4: BIOGRAPHICAL DOSSIER & SYSTEMS PHILOSOPHY ------- */}
      {/* ================================================================ */}
      <AboutSection
        onOpenTerminal={() => switchView("about")}
      />

      {/* ================================================================ */}
      {/* --- SECTION 5: BUY ME A COFFEE⁺ & EDITORIAL FOOTER ------------ */}
      {/* ================================================================ */}
      <BuyMeACoffeeFooter
        onScrollToWork={scrollToWork}
        onScrollToArsenal={scrollToArsenal}
        onScrollToAbout={scrollToAbout}
        onScrollToTop={scrollToTop}
      />

      {/* ================================================================ */}
      {/* --- MODAL DRAWER OVERLAY (WORK & ABOUT VIEWS) ------------------ */}
      {/* ================================================================ */}
      {isSplitView && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#060B06]/95 backdrop-blur-xl overflow-hidden animate-backdrop-in text-[#F4F5F4]">
          {/* Drawer Header */}
          <header className="relative z-30 flex w-full shrink-0 items-center justify-between border-b border-white/10 bg-[#060B06]/90 px-6 py-4 backdrop-blur-md sm:px-10 md:px-14">
            <div
              onClick={() => switchView("hero")}
              className="group flex cursor-pointer items-center gap-3"
            >
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-white uppercase">
                LUTFAN MOHAMMED ASIF
              </span>
              <span className="hidden text-white/30 sm:inline">•</span>
              <span className="font-mono text-[11px] tracking-wider text-[#5DD62C] font-medium">
                {viewMode === "work" ? "Featured Work" : "About & Philosophy"}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs tracking-wider">
              <NavButton
                label="Work"
                active={viewMode === "work"}
                onClick={() => switchView("work")}
              />
              <NavButton
                label="About"
                active={viewMode === "about"}
                onClick={() => switchView("about")}
              />
              <a
                href="mailto:contact@lutfan.dev"
                className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#5DD62C] px-4 py-1.5 font-mono text-xs font-bold text-[#060B06] shadow-[0_0_12px_rgba(93,214,44,0.3)] transition-all hover:bg-[#52c027] active:scale-95"
              >
                <span>Contact</span>
                <span>↗</span>
              </a>
              <button
                onClick={() => switchView("hero")}
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-white shadow-xs backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/20 ml-1"
              >
                <span className="text-xs">✕</span>
                <span className="text-xs font-medium">Close</span>
              </button>
            </div>
          </header>

          {/* Split Content: 3D Terminal on Left, Content Drawer on Right */}
          <div className="flex h-full w-full flex-col md:flex-row overflow-hidden">
            {/* Supporting Viewport (Docked Left: 3D or 2D Vector CRT Fallback) */}
            <div className="relative h-[36vh] w-full md:h-full md:w-[42%] lg:w-[40%] shrink-0 bg-[#060B06] animate-computer-in">
              <WebGLErrorBoundary
                fallback={
                  <Computer2DFallback
                    className="h-full w-full"
                    isActive={true}
                    mode={viewMode}
                    activeProject={activeProject}
                  />
                }
              >
                {isWebGLSupported ? (
                  <ComputerScene
                    className="h-full w-full"
                    isActive={true}
                    mode={viewMode}
                    activeProject={activeProject}
                    onActiveChange={() => switchView("hero")}
                    onHoverChange={setIsHovered}
                    onDragStateChange={setIsDragging}
                  />
                ) : (
                  <Computer2DFallback
                    className="h-full w-full"
                    isActive={true}
                    mode={viewMode}
                    activeProject={activeProject}
                  />
                )}
              </WebGLErrorBoundary>
            </div>

            {/* Work Projects Drawer */}
            {viewMode === "work" && (
              <div className="relative z-20 flex h-[64vh] w-full flex-col overflow-hidden bg-[#060B06]/90 animate-drawer-in md:h-full md:w-[58%] lg:w-[60%] border-t md:border-t-0 md:border-l border-white/10">
                <EditorialArchive
                  onClose={() => switchView("hero")}
                  onSelectProject={(idx) => setActiveProjectIndex(idx)}
                  className="h-full w-full"
                />
              </div>
            )}

            {/* About / Bio Dossier Drawer */}
            {viewMode === "about" && (
              <div className="relative z-20 flex h-[64vh] w-full flex-col overflow-hidden bg-[#060B06]/90 animate-drawer-in md:h-full md:w-[58%] lg:w-[60%] border-t md:border-t-0 md:border-l border-white/10">
                <AboutBio
                  onClose={() => switchView("hero")}
                  className="h-full w-full"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Refined Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectIndex={scrollToTop}
        onSelectWork={scrollToWork}
        onSelectAbout={scrollToAbout}
        onSelectArsenal={scrollToArsenal}
        activeMode={activeSection === "hero" ? "hero" : activeSection === "work" ? "work" : "about"}
      />

      {/* Interactive Retro CRT Easter Egg Terminal */}
      <RetroCrtInteractiveShell
        isOpen={isRetroShellOpen}
        onClose={() => setIsRetroShellOpen(false)}
      />
    </main>
  );
}
