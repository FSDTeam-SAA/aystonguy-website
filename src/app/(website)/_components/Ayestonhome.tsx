"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Instagram,
  Facebook,
  Youtube,
  Search,
  Menu,
  Eye,
  ThumbsUp,
  Share2,
} from "lucide-react";

/* ---------- Types ---------- */
type Video = {
  id: number;
  title?: string;
  subtitle?: string;
  thumbnail: string;
  duration?: string;
  views?: string;
  likes?: string;
};

/* ---------- Dummy data ---------- */
const CATEGORIES = ["ENTERTAINMENT", "COMEDY", "MODELS"];

const FEATURED: Video[] = [
  {
    id: 1,
    title: "Accidentally Becoming the Next Dance Sensation!",
    thumbnail: "https://picsum.photos/seed/feat1/600/400",
    duration: "5:35",
  },
  {
    id: 2,
    title: "Epic Cooking Fail: Nailed It... Almost!",
    thumbnail: "https://picsum.photos/seed/feat2/600/400",
  },
  {
    id: 3,
    title: "Epic Cooking Fail: Nailed It... Almost!",
    thumbnail: "https://picsum.photos/seed/feat3/600/400",
  },
];

const VIDEOS: Video[] = [
  {
    id: 1,
    title: "Accidentally Becoming the Next Dance Sensation!",
    thumbnail: "https://picsum.photos/seed/vid1/400/400",
    duration: "5:35",
    views: "3.2k",
    likes: "3.2k",
  },
  {
    id: 2,
    title: "Epic Cooking Fail: Nailed It... Almost!",
    subtitle: "Aug 3, 2024 by David",
    thumbnail: "https://picsum.photos/seed/vid2/400/400",
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/seed/vid3/400/400",
    duration: "0:24",
    views: "3.2k",
  },
  {
    id: 4,
    title: "Accidentally Becoming the Next Dance Sensation!",
    thumbnail: "https://picsum.photos/seed/vid4/400/400",
    duration: "5:35",
    views: "3.2k",
    likes: "3.2k",
  },
];

/* ---------- X (Twitter) icon ---------- */
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ================================================================ */
/* MAIN COMPONENT                                                   */
/* ================================================================ */
export default function AyestonHome() {
  // IMPORTANT: Radix Select does NOT accept empty string "" as value.
  // Keep it undefined when nothing is selected.
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    // TODO: plug in real search
    console.log("Searching:", search, "| category:", category);
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        {/* ---------- Brand title ---------- */}
        <h1 className="mb-6 text-center text-4xl font-black italic tracking-wider text-cyan-300 md:mb-8 md:text-7xl">
          AYESTON
        </h1>

        {/* ---------- Hero Section ---------- */}
        <div className="mb-10 grid grid-cols-12 gap-3 md:gap-4">
          {/* Left: Categories */}
          <div className="order-1 col-span-6 flex flex-col gap-3 md:col-span-3">
            {CATEGORIES.map((cat) => (
              <OutlineButton key={cat}>{cat}</OutlineButton>
            ))}
            <OutlineButton>+ MORE</OutlineButton>
          </div>

          {/* Right: Promo + Social */}
          <div className="order-2 col-span-6 flex flex-col gap-3 md:order-3 md:col-span-3">
            <OutlineButton>PROMOTION</OutlineButton>
            <div className="flex flex-1 items-center justify-center gap-3 rounded-xl border border-cyan-400/40 p-3">
              <button
                type="button"
                aria-label="Instagram"
                className="text-white transition hover:text-cyan-300"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Facebook"
                className="text-white transition hover:text-cyan-300"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Youtube"
                className="text-white transition hover:text-cyan-300"
              >
                <Youtube className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="X (Twitter)"
                className="text-white transition hover:text-cyan-300"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <button
              type="button"
              aria-label="Menu"
              className="flex flex-1 items-center justify-center rounded-xl border border-cyan-400/40 transition hover:bg-cyan-500/5"
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
            <OutlineButton>AYESTON&reg;</OutlineButton>
          </div>

          {/* Center: Hero Video */}
          <div className="order-3 col-span-12 md:order-2 md:col-span-6">
            <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-cyan-400/30">
              <img
                src="https://picsum.photos/seed/hero-main/1000/600"
                alt="Hero video"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  aria-label="Play video"
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-black/20 backdrop-blur-sm transition hover:scale-110 md:h-16 md:w-16"
                >
                  <Play className="h-6 w-6 fill-white text-white md:h-7 md:w-7" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Features Title ---------- */}
        <h2 className="mb-6 text-center text-2xl font-bold italic text-cyan-300 md:text-4xl">
          Features
        </h2>

        {/* ---------- Featured Videos ---------- */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {FEATURED.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* ---------- Category + Search ---------- */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-12 flex-1 rounded-lg border-cyan-400/30 bg-[#0a1022]/60 text-white focus:ring-cyan-400 focus:ring-offset-0">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="border-cyan-400/40 bg-[#0a1022] text-white">
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="comedy">Comedy</SelectItem>
              <SelectItem value="models">Models</SelectItem>
              <SelectItem value="promotion">Promotion</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="h-12 rounded-lg border-cyan-400/30 bg-[#0a1022]/60 pl-4 pr-14 text-white placeholder:text-white/40 focus-visible:ring-cyan-400 focus-visible:ring-offset-0"
            />
            <button
              type="button"
              onClick={handleSearch}
              aria-label="Search"
              className="absolute bottom-1 right-1 top-1 flex items-center justify-center rounded-md bg-cyan-300 px-4 font-semibold text-slate-900 transition hover:bg-cyan-400"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ---------- Video Grid ---------- */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} showMeta />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable: Outline category button ---------- */
function OutlineButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center rounded-xl border border-cyan-400/50 bg-transparent px-3 py-3 text-xs font-bold italic tracking-wider text-cyan-300 transition hover:bg-cyan-500/10 md:text-sm"
    >
      {children}
    </button>
  );
}

/* ---------- Reusable: Video Card ---------- */
function VideoCard({
  video,
  showMeta = false,
}: {
  video: Video;
  showMeta?: boolean;
}) {
  return (
    <div>
      <div className="relative mb-2 overflow-hidden rounded-xl border border-cyan-400/20">
        <img
          src={video.thumbnail}
          alt={video.title ?? "video"}
          className="aspect-video w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black/20 backdrop-blur-sm md:h-12 md:w-12">
            <Play className="h-4 w-4 fill-white text-white md:h-5 md:w-5" />
          </div>
        </div>
        {video.duration ? (
          <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white md:text-xs">
            {video.duration}
          </span>
        ) : null}
        {!showMeta && video.views ? (
          <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white md:text-xs">
            <Eye className="h-3 w-3" /> {video.views}
          </span>
        ) : null}
      </div>

      {showMeta && (video.views || video.likes) ? (
        <div className="mb-1 flex items-center gap-3 text-[11px] text-white/70 md:text-xs">
          {video.views ? (
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {video.views}
            </span>
          ) : null}
          {video.likes ? (
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" /> {video.likes}
            </span>
          ) : null}
          <button
            type="button"
            className="ml-auto flex items-center gap-1 transition hover:text-cyan-300"
          >
            <Share2 className="h-3 w-3" /> Share
          </button>
        </div>
      ) : null}

      {video.title ? (
        <h3 className="text-sm font-medium leading-snug text-white">
          {video.title}
        </h3>
      ) : null}
      {video.subtitle ? (
        <p className="mt-1 text-xs text-white/50">{video.subtitle}</p>
      ) : null}
    </div>
  );
}