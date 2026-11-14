import type { Metadata, Viewport } from "next";
import Image from "next/image";
import "./globals.css";
import { AmbientPlayer } from "@/components/audio/AmbientPlayer";
import { Foley } from "@/components/audio/Foley";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackgroundReveal } from "@/components/ui/BackgroundReveal";

export const viewport: Viewport = {
  themeColor: "#060B06",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Lutfan Mohammed Asif — CS Student & Full-Stack Developer",
  description:
    "Portfolio of Lutfan Mohammed Asif — Computer Science Student & Full-Stack Developer specializing in real-time 3D web environments, accessible learning tools, and distributed backend systems.",
  keywords: [
    "Lutfan Mohammed Asif",
    "Creative Developer",
    "Full-Stack Developer",
    "Three.js",
    "Next.js",
    "Python",
    "FastAPI",
    "WebGL",
    "Portfolio",
  ],
  authors: [{ name: "Lutfan Mohammed Asif", url: "https://github.com/luthfan-tech" }],
  creator: "Lutfan Mohammed Asif",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lutfan.dev",
    title: "Lutfan Mohammed Asif — CS Student & Full-Stack Developer",
    description:
      "Interactive 3D voxel portfolio showcasing full-stack systems, verified open-source builds, and spatial web engineering.",
    siteName: "Lutfan Mohammed Asif Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lutfan Mohammed Asif — CS Student & Full-Stack Developer",
    description:
      "Interactive 3D voxel portfolio showcasing full-stack systems, verified open-source builds, and spatial web engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#060B06] text-[#F4F5F4] min-h-screen antialiased selection:bg-[#5DD62C] selection:text-[#060B06]">
        {/* Global Cinematic Green Silk Spatial Gradient Background */}
        <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/images/bg-green-gradient.jpg"
            alt="Green Silk Spatial Gradient Background"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="object-cover object-center opacity-85 filter brightness-95"
          />
          {/* Ambient depth vignette to ensure crisp high-contrast readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060B06]/30 via-[#060B06]/20 to-[#060B06]/50" />
        </div>

        <div className="film-grain" aria-hidden="true" />

        {/* Soft Background Cursor Glow */}
        <BackgroundReveal />

        {/* Significantly Enlarged Agency Cursor */}
        <CustomCursor />

        {/* Persistent Audio Systems */}
        <AmbientPlayer />
        <Foley />

        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
