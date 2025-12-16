"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type VideoStatus = "idle" | "loading" | "ready" | "error";

// Lazy loading configuration
const LAZY_LOAD_THRESHOLD = 0.1; // Video loads when 10% is visible
const LAZY_LOAD_ROOT_MARGIN = "50px"; // Start loading 50px before viewport

export interface VideoPlayerProps {
  /** Video source URL (without extension for multi-format, or with extension for single format) */
  src: string;
  /** Poster image URL displayed before video loads */
  poster?: string;
  /** Enable autoplay (requires muted=true for browser compatibility) */
  autoplay?: boolean;
  /** Mute video audio */
  muted?: boolean;
  /** Enable video looping */
  loop?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Callback fired when video starts playing */
  onPlay?: () => void;
  /** Callback fired when video is paused */
  onPause?: () => void;
  /** Callback fired when video encounters an error */
  onError?: (error: Error) => void;
}

export const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {
      src,
      poster,
      autoplay = false,
      muted = false,
      loop = false,
      className,
      onPlay,
      onPause,
      onError,
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [status, setStatus] = useState<VideoStatus>("idle");
    const [isPlaying, setIsPlaying] = useState(false);

    // Forward ref to parent if provided
    useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

    // Lazy loading with Intersection Observer
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { threshold: LAZY_LOAD_THRESHOLD, rootMargin: LAZY_LOAD_ROOT_MARGIN }
      );

      observer.observe(container);

      return () => observer.disconnect();
    }, []);

    // Handle autoplay when video is ready
    useEffect(() => {
      const video = videoRef.current;
      if (!video || status !== "ready" || !autoplay || !muted) return;

      video.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
    }, [status, autoplay, muted]);

    // Play/Pause toggle handler
    const handleClick = useCallback(() => {
      const video = videoRef.current;
      if (!video || status !== "ready") return;

      if (video.paused) {
        video.play().catch((err) => {
          console.error("Play failed:", err);
        });
      } else {
        video.pause();
      }
    }, [status]);

    // Video event handlers
    const handleLoadStart = useCallback(() => {
      setStatus("loading");
    }, []);

    const handleCanPlay = useCallback(() => {
      setStatus("ready");
    }, []);

    const handleError = useCallback(() => {
      setStatus("error");
      const error = new Error(`Failed to load video: ${src}`);
      console.error(error.message);
      onError?.(error);
    }, [src, onError]);

    const handlePlay = useCallback(() => {
      setIsPlaying(true);
      onPlay?.();
    }, [onPlay]);

    const handlePause = useCallback(() => {
      setIsPlaying(false);
      onPause?.();
    }, [onPause]);

    // Determine if src includes extension
    const hasExtension = /\.(mp4|webm|ogg)$/i.test(src);

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full aspect-video overflow-hidden rounded-lg bg-black/50",
          className
        )}
      >
        {/* Loading State */}
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-amber-500" />
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
            <svg
              className="h-12 w-12 text-red-500 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-sm text-foreground/70">Failed to load video</p>
          </div>
        )}

        {/* Play/Pause Overlay */}
        {status === "ready" && !isPlaying && !autoplay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40">
            <button
              type="button"
              onClick={handleClick}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Play video"
            >
              <svg
                className="h-8 w-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}

        {/* Video Element */}
        {shouldLoad && (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={poster}
            playsInline
            muted={muted}
            loop={loop}
            onClick={handleClick}
            onLoadStart={handleLoadStart}
            onCanPlay={handleCanPlay}
            onError={handleError}
            onPlay={handlePlay}
            onPause={handlePause}
            aria-label="Video player"
          >
            {hasExtension ? (
              <source
                src={src}
                type={`video/${src.split(".").pop()!}`}
              />
            ) : (
              <>
                <source src={`${src}.webm`} type="video/webm" />
                <source src={`${src}.mp4`} type="video/mp4" />
              </>
            )}
            Your browser does not support the video tag.
          </video>
        )}

        {/* Placeholder when not loaded */}
        {!shouldLoad && poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";
