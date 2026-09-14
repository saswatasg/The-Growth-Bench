import React, { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

const MUTE_KEY = 'tgb-sound-muted';

function createOscillator(ctx, type, freq, duration, volume = 0.03) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function createNoise(ctx, duration, volume = 0.02) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.5;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2000;
  filter.Q.value = 0.5;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

export function SoundProvider({ children }) {
  const ctxRef = useRef(null);
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion.current) setMuted(true);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(MUTE_KEY, String(muted));
    } catch {}
  }, [muted]);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playHoverTick = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      createOscillator(ctx, 'sine', 800, 0.05, 0.02);
    } catch {}
  }, [muted, getCtx]);

  const playClickChime = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  }, [muted, getCtx]);

  const playSuccessTone = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      [523, 659, 784].forEach((freq, i) => {
        setTimeout(() => {
          createOscillator(ctx, 'sine', freq, 0.2, 0.03);
        }, i * 80);
      });
    } catch {}
  }, [muted, getCtx]);

  const playErrorTone = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      createOscillator(ctx, 'sawtooth', 200, 0.15, 0.02);
    } catch {}
  }, [muted, getCtx]);

  const playPageTransition = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      createNoise(ctx, 0.3, 0.015);
    } catch {}
  }, [muted, getCtx]);

  const toggleMute = useCallback(() => setMuted((prev) => !prev), []);

  return (
    <SoundContext.Provider value={{
      muted,
      toggleMute,
      playHoverTick,
      playClickChime,
      playSuccessTone,
      playErrorTone,
      playPageTransition,
    }}>
      {children}
      <button
        onClick={toggleMute}
        className="fixed bottom-4 left-4 z-[80] p-2 rounded-full bg-ink/10 dark:bg-canvas/10 text-mute dark:text-stone hover:text-ink dark:hover:text-canvas transition-colors backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 dark:focus-visible:ring-accent/40"
        aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </SoundContext.Provider>
  );
}
