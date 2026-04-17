"use client";

import React, { useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  ArrowLeft,
  Share2,
} from "lucide-react";

type VideoDetailProps = {
  videoUrl?: string;
  poster?: string;
  title?: string;
  onBack?: () => void;
  onShare?: () => void;
};

export default function VideoDetail({
  videoUrl,
  poster = "https://picsum.photos/seed/queen-video/1400/800",
  title = "I Tried Following a 5-Minute Craft Tutorial and Ended Up with a 5-Hour Disaster!",
  onBack,
  onShare,
}: VideoDetailProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const mm = Math.floor(seconds / 60);
    const ss = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      const p = v.play();
      // Some browsers return a promise; ignore rejections (e.g. autoplay blocked)
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          /* state syncs via onPause */
        });
      }
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (v) v.muted = !v.muted;
    setMuted((m) => !m);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(formatTime(v.duration));
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration) || v.duration === 0) return;
    setProgress((v.currentTime / v.duration) * 100);
    setCurrentTime(formatTime(v.currentTime));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration) || v.duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const raw = ((e.clientX - rect.left) / rect.width) * 100;
    const pct = Math.max(0, Math.min(100, raw));
    v.currentTime = (pct / 100) * v.duration;
    setProgress(pct);
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white">
      <div className="mx-auto max-w-5xl p-4 md:p-8">
        {/* ---------- Brand Title ---------- */}
        <h1 className="mb-6 text-center text-4xl font-black italic tracking-wider text-cyan-300 md:mb-8 md:text-6xl">
          AYESTON
        </h1>

        {/* ---------- Video Player ---------- */}
        <div className="relative mb-4 overflow-hidden rounded-2xl border border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              poster={poster}
              playsInline
              className="aspect-video w-full bg-black object-cover"
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          ) : (
            <img
              src={poster}
              alt="video poster"
              className="aspect-video w-full object-cover"
            />
          )}

          {/* Center play button — only shown when video exists and is paused */}
          {!playing && videoUrl ? (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-black/30 backdrop-blur-sm transition hover:scale-110 md:h-20 md:w-20">
                <Play className="h-7 w-7 fill-white text-white md:h-9 md:w-9" />
              </div>
            </button>
          ) : null}

          {/* Custom controls overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 md:p-4">
            {/* Progress bar */}
            <div
              onClick={handleSeek}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              tabIndex={0}
              className="mb-3 h-1 w-full cursor-pointer rounded-full bg-white/30"
            >
              <div
                className="relative h-full rounded-full bg-white"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-white" />
              </div>
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="text-white transition hover:text-cyan-300"
              >
                {playing ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
              <button
                type="button"
                aria-label="Skip forward"
                className="text-white transition hover:text-cyan-300"
              >
                <SkipForward className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="text-white transition hover:text-cyan-300"
              >
                {muted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
              <span className="text-xs text-white md:text-sm">
                {currentTime} / {duration}
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Title ---------- */}
        <h2 className="mb-6 text-base font-semibold leading-snug text-white md:text-xl">
          {title}
        </h2>

        {/* ---------- Bottom Actions ---------- */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-transparent text-white transition hover:bg-cyan-500/10 hover:text-cyan-300 md:h-11 md:w-11"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <button
            type="button"
            onClick={onShare}
            aria-label="Share"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-transparent text-white transition hover:bg-cyan-500/10 hover:text-cyan-300 md:h-11 md:w-11"
          >
            <Share2 className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}