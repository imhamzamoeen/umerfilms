import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { VideoPlayer } from "./VideoPlayer";

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
let intersectionCallback: IntersectionObserverCallback | null = null;

beforeEach(() => {
  mockObserve.mockClear();
  mockDisconnect.mockClear();
  intersectionCallback = null;

  global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
    intersectionCallback = callback;
    return {
      observe: mockObserve,
      disconnect: mockDisconnect,
      unobserve: vi.fn(),
    };
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// Helper to trigger intersection
function triggerIntersection(isIntersecting: boolean) {
  if (intersectionCallback) {
    intersectionCallback(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  }
}

describe("VideoPlayer", () => {
  describe("Rendering", () => {
    it("renders container element", () => {
      const { container } = render(<VideoPlayer src="/videos/test.mp4" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders video element when in viewport", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
      });
    });

    it("does not render video element before entering viewport", () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      const video = document.querySelector("video");
      expect(video).not.toBeInTheDocument();
    });

    it("applies custom className to container", () => {
      const { container } = render(
        <VideoPlayer src="/videos/test.mp4" className="custom-class" />
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Poster Image", () => {
    it("applies poster attribute when provided", async () => {
      render(
        <VideoPlayer src="/videos/test.mp4" poster="/images/poster.jpg" />
      );
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toHaveAttribute("poster", "/images/poster.jpg");
      });
    });

    it("shows poster image placeholder before video loads", () => {
      render(
        <VideoPlayer src="/videos/test.mp4" poster="/images/poster.jpg" />
      );
      // Before intersection, poster should be shown as img
      const posterImg = document.querySelector('img[aria-hidden="true"]');
      expect(posterImg).toBeInTheDocument();
      expect(posterImg).toHaveAttribute("src", "/images/poster.jpg");
    });
  });

  describe("iOS Compatibility", () => {
    it("adds playsInline attribute", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toHaveAttribute("playsinline");
      });
    });
  });

  describe("Video Sources", () => {
    it("renders multiple source elements for extensionless src", async () => {
      render(<VideoPlayer src="/videos/test" />);
      triggerIntersection(true);

      await waitFor(() => {
        const sources = document.querySelectorAll("source");
        expect(sources.length).toBe(2);
        expect(sources[0]).toHaveAttribute("src", "/videos/test.webm");
        expect(sources[0]).toHaveAttribute("type", "video/webm");
        expect(sources[1]).toHaveAttribute("src", "/videos/test.mp4");
        expect(sources[1]).toHaveAttribute("type", "video/mp4");
      });
    });

    it("renders single source for src with extension", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        const sources = document.querySelectorAll("source");
        expect(sources.length).toBe(1);
        expect(sources[0]).toHaveAttribute("src", "/videos/test.mp4");
        expect(sources[0]).toHaveAttribute("type", "video/mp4");
      });
    });
  });

  describe("Video Attributes", () => {
    it("applies muted attribute when muted=true", async () => {
      render(<VideoPlayer src="/videos/test.mp4" muted />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video") as HTMLVideoElement;
        expect(video).toBeInTheDocument();
        // muted is a property, not an attribute in the DOM
        expect(video.muted).toBe(true);
      });
    });

    it("applies loop attribute when loop=true", async () => {
      render(<VideoPlayer src="/videos/test.mp4" loop />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toHaveAttribute("loop");
      });
    });

    it("has aria-label for accessibility", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toHaveAttribute("aria-label", "Video player");
      });
    });

    it("triggers autoplay when muted and autoplay are true", async () => {
      render(<VideoPlayer src="/videos/test.mp4" autoplay muted />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
      });

      const video = document.querySelector("video")!;
      const mockPlay = vi.fn().mockResolvedValue(undefined);
      video.play = mockPlay;

      // Trigger canplay to set status to ready, which triggers autoplay
      fireEvent.canPlay(video);

      await waitFor(() => {
        expect(mockPlay).toHaveBeenCalled();
      });
    });
  });

  describe("Play/Pause Toggle", () => {
    it("renders play button when video is ready and not playing", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
      });

      // Trigger canplay event to set status to ready
      const video = document.querySelector("video")!;
      fireEvent.canPlay(video);

      await waitFor(() => {
        const playButton = screen.getByRole("button", { name: /play video/i });
        expect(playButton).toBeInTheDocument();
      });
    });

    it("calls play on click when video is paused", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
      });

      const video = document.querySelector("video")!;
      const mockPlay = vi.fn().mockResolvedValue(undefined);
      video.play = mockPlay;
      fireEvent.canPlay(video);

      await waitFor(() => {
        const playButton = screen.getByRole("button", { name: /play video/i });
        fireEvent.click(playButton);
      });

      expect(mockPlay).toHaveBeenCalled();
    });

    it("calls pause on click when video is playing", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
      });

      const video = document.querySelector("video")!;
      const mockPause = vi.fn();
      video.pause = mockPause;
      Object.defineProperty(video, "paused", { value: false, writable: true });

      fireEvent.canPlay(video);
      fireEvent.play(video);
      fireEvent.click(video);

      expect(mockPause).toHaveBeenCalled();
    });
  });

  describe("Event Callbacks", () => {
    it("calls onPlay callback when video starts playing", async () => {
      const onPlay = vi.fn();
      render(<VideoPlayer src="/videos/test.mp4" onPlay={onPlay} />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
      });

      const video = document.querySelector("video")!;
      fireEvent.play(video);

      expect(onPlay).toHaveBeenCalled();
    });

    it("calls onPause callback when video is paused", async () => {
      const onPause = vi.fn();
      render(<VideoPlayer src="/videos/test.mp4" onPause={onPause} />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
      });

      const video = document.querySelector("video")!;
      fireEvent.pause(video);

      expect(onPause).toHaveBeenCalled();
    });

    it("calls onError callback when video fails to load", async () => {
      const onError = vi.fn();
      render(<VideoPlayer src="/videos/test.mp4" onError={onError} />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
      });

      const video = document.querySelector("video")!;
      fireEvent.error(video);

      expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("Loading State", () => {
    it("shows loading spinner when video is loading", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
      });

      const video = document.querySelector("video")!;
      fireEvent.loadStart(video);

      const spinner = document.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("displays error message when video fails to load", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
      });

      const video = document.querySelector("video")!;
      fireEvent.error(video);

      await waitFor(() => {
        expect(screen.getByText(/failed to load video/i)).toBeInTheDocument();
      });
    });
  });

  describe("Lazy Loading", () => {
    it("sets up IntersectionObserver on mount", () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      expect(IntersectionObserver).toHaveBeenCalled();
      expect(mockObserve).toHaveBeenCalled();
    });

    it("disconnects observer when video enters viewport", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        expect(mockDisconnect).toHaveBeenCalled();
      });
    });

    it("disconnects observer on unmount", () => {
      const { unmount } = render(<VideoPlayer src="/videos/test.mp4" />);
      unmount();
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe("Responsive Container", () => {
    it("has aspect-video class for 16:9 ratio", () => {
      const { container } = render(<VideoPlayer src="/videos/test.mp4" />);
      expect(container.firstChild).toHaveClass("aspect-video");
    });

    it("has full width class", () => {
      const { container } = render(<VideoPlayer src="/videos/test.mp4" />);
      expect(container.firstChild).toHaveClass("w-full");
    });
  });

  describe("Accessibility", () => {
    it("play button is keyboard focusable", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
      });

      const video = document.querySelector("video")!;
      fireEvent.canPlay(video);

      await waitFor(() => {
        const playButton = screen.getByRole("button", { name: /play video/i });
        expect(playButton).not.toHaveAttribute("tabindex", "-1");
      });
    });

    it("contains fallback text for unsupported browsers", async () => {
      render(<VideoPlayer src="/videos/test.mp4" />);
      triggerIntersection(true);

      await waitFor(() => {
        const video = document.querySelector("video");
        expect(video).toBeInTheDocument();
        expect(video?.textContent).toContain(
          "Your browser does not support the video tag"
        );
      });
    });
  });
});
