"use client";

import React, { useEffect, useRef } from "react";
import { useArchiveStore } from "@/lib/store";

export interface FoleyProps {
  humSrc?: string;
  clickSrc?: string;
  baseVolumeRatio?: number;
}

/**
 * Procedurally generates a short mechanical click transient using Web Audio API
 * as a robust zero-asset fallback if click.mp3 is unavailable.
 */
function playSynthesizedClick(ctx: AudioContext, gainRatio: number) {
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;

  // Sharp mechanical impulse transient
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(1400, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1800, now);
  filter.Q.setValueAtTime(3.0, now);

  gain.gain.setValueAtTime(0.35 * gainRatio, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

export const Foley: React.FC<FoleyProps> = ({
  humSrc = "/audio/projector-hum.mp3",
  clickSrc = "/audio/click.mp3",
  baseVolumeRatio = 0.18, // Kept soft and ambient
}) => {
  const isPlaying = useArchiveStore((state) => state.isPlaying);
  const isMuted = useArchiveStore((state) => state.isMuted);
  const volume = useArchiveStore((state) => state.volume);
  const currentReel = useArchiveStore((state) => state.currentReel);

  const humAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio Context for synthesized procedural fallbacks
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthHumGainRef = useRef<GainNode | null>(null);
  const synthHumOscRef = useRef<OscillatorNode | null>(null);

  // Initialize Web Audio Context lazily on user gesture
  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    return audioCtxRef.current;
  };

  // Play mechanical click
  const triggerClick = () => {
    if (isMuted || volume === 0) return;

    const effectiveVol = Math.max(0, Math.min(1, volume * 0.4));

    if (clickAudioRef.current && clickAudioRef.current.duration > 0) {
      clickAudioRef.current.volume = effectiveVol;
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {
        const ctx = getAudioContext();
        if (ctx) playSynthesizedClick(ctx, effectiveVol);
      });
    } else {
      const ctx = getAudioContext();
      if (ctx) playSynthesizedClick(ctx, effectiveVol);
    }
  };

  // Trigger click sound when reel is switched
  const prevReelRef = useRef<string | null>(null);
  useEffect(() => {
    if (prevReelRef.current !== currentReel && prevReelRef.current !== null) {
      triggerClick();
    }
    prevReelRef.current = currentReel;
  }, [currentReel]);

  // Listen for custom trigger click events across the app
  useEffect(() => {
    const handleFoleyClickEvent = () => triggerClick();
    window.addEventListener("foley-click", handleFoleyClickEvent);
    return () => window.removeEventListener("foley-click", handleFoleyClickEvent);
  }, [isMuted, volume]);

  // Manage looping projector hum
  useEffect(() => {
    const humAudio = humAudioRef.current;
    const effectiveHumVolume = isMuted ? 0 : volume * baseVolumeRatio;

    if (humAudio) {
      humAudio.volume = Math.max(0, Math.min(1, effectiveHumVolume));
    }

    // Update procedural hum gain if active
    if (synthHumGainRef.current) {
      synthHumGainRef.current.gain.setTargetAtTime(
        isPlaying && !isMuted ? effectiveHumVolume * 0.2 : 0,
        0,
        0.1
      );
    }

    if (isPlaying && !isMuted) {
      if (humAudio && humAudio.duration > 0) {
        humAudio.play().catch(() => {
          startProceduralHum(effectiveHumVolume);
        });
      } else {
        startProceduralHum(effectiveHumVolume);
      }
    } else {
      if (humAudio) humAudio.pause();
      stopProceduralHum();
    }
  }, [isPlaying, isMuted, volume, baseVolumeRatio]);

  // Start synthesized 24fps mechanical hum fallback
  const startProceduralHum = (gainLevel: number) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    if (synthHumOscRef.current) return; // Already running

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Low 58Hz mechanical motor resonance
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(58, ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gainLevel * 0.15, ctx.currentTime + 0.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      synthHumOscRef.current = osc;
      synthHumGainRef.current = gain;
    } catch {
      // Ignore audio synthesis errors on locked environments
    }
  };

  const stopProceduralHum = () => {
    if (synthHumGainRef.current && audioCtxRef.current) {
      synthHumGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
    }
    setTimeout(() => {
      if (synthHumOscRef.current) {
        try {
          synthHumOscRef.current.stop();
          synthHumOscRef.current.disconnect();
        } catch {}
        synthHumOscRef.current = null;
        synthHumGainRef.current = null;
      }
    }, 150);
  };

  return (
    <>
      <audio
        ref={humAudioRef}
        src={humSrc}
        loop
        preload="auto"
        playsInline
      />
      <audio
        ref={clickAudioRef}
        src={clickSrc}
        preload="auto"
        playsInline
      />
    </>
  );
};
