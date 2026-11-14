"use client";

import React, { useEffect, useRef, useState } from "react";
import { useArchiveStore } from "@/lib/store";
import { MuteButton } from "@/components/ui/MuteButton";

export interface AmbientPlayerProps {
  src?: string;
  showMuteButton?: boolean;
  className?: string;
}

export const AmbientPlayer: React.FC<AmbientPlayerProps> = ({
  src = "/audio/let-it-happen.mp3",
  showMuteButton = true,
  className = "",
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = useArchiveStore((state) => state.isPlaying);
  const isMuted = useArchiveStore((state) => state.isMuted);
  const volume = useArchiveStore((state) => state.volume);

  const [hasInteracted, setHasInteracted] = useState(false);

  // Synchronize audio properties with Zustand store
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    audio.volume = isMuted ? 0 : Math.max(0, Math.min(1, volume));
  }, [volume, isMuted]);

  // Synchronize playback state safely without aggressive autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser prevented autoplay prior to user interaction
          const handleFirstInteraction = () => {
            setHasInteracted(true);
            if (useArchiveStore.getState().isPlaying && audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
          };

          window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, hasInteracted]);

  return (
    <>
      {/* Persistent HTML Audio Element */}
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="metadata"
        playsInline
      />

      {/* Floating Corner Mute & Volume Controller */}
      {showMuteButton && (
        <aside className={`fixed bottom-5 right-5 z-30 ${className}`}>
          <MuteButton />
        </aside>
      )}
    </>
  );
};
