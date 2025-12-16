import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  describe("Copyright", () => {
    it("renders copyright text with correct year", () => {
      render(<Footer />);
      expect(
        screen.getByText(/© 2025 UmerFilms. All rights reserved./i)
      ).toBeInTheDocument();
    });
  });

  describe("Social Media Links", () => {
    it("renders Instagram link", () => {
      render(<Footer />);
      const instagramLinks = screen.getAllByRole("link", {
        name: /instagram/i,
      });
      expect(instagramLinks.length).toBeGreaterThanOrEqual(1);
      expect(instagramLinks[0]).toBeInTheDocument();
    });

    it("renders YouTube link", () => {
      render(<Footer />);
      const youtubeLinks = screen.getAllByRole("link", { name: /youtube/i });
      expect(youtubeLinks.length).toBeGreaterThanOrEqual(1);
      expect(youtubeLinks[0]).toBeInTheDocument();
    });

    it("renders TikTok link", () => {
      render(<Footer />);
      const tiktokLinks = screen.getAllByRole("link", { name: /tiktok/i });
      expect(tiktokLinks.length).toBeGreaterThanOrEqual(1);
      expect(tiktokLinks[0]).toBeInTheDocument();
    });

    it("all social links open in new tab", () => {
      render(<Footer />);
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
      });
    });

    it("all social links have security attributes", () => {
      render(<Footer />);
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });

  describe("Accessibility", () => {
    it("Instagram link has proper aria-label", () => {
      render(<Footer />);
      const link = screen.getByLabelText(/Visit UmerFilms on Instagram/i);
      expect(link).toBeInTheDocument();
    });

    it("YouTube link has proper aria-label", () => {
      render(<Footer />);
      const link = screen.getByLabelText(/Visit UmerFilms on YouTube/i);
      expect(link).toBeInTheDocument();
    });

    it("TikTok link has proper aria-label", () => {
      render(<Footer />);
      const link = screen.getByLabelText(/Visit UmerFilms on TikTok/i);
      expect(link).toBeInTheDocument();
    });

    it("social links are keyboard focusable", () => {
      render(<Footer />);
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).not.toHaveAttribute("tabindex", "-1");
      });
    });

    it("footer has navigation landmark with label", () => {
      render(<Footer />);
      const nav = screen.getByRole("navigation", {
        name: /social media links/i,
      });
      expect(nav).toBeInTheDocument();
    });
  });

  describe("Structure", () => {
    it("renders semantic footer element", () => {
      render(<Footer />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
    });

    it("social links have correct URLs", () => {
      render(<Footer />);
      const instagramLink = screen.getByLabelText(/Visit UmerFilms on Instagram/i);
      const youtubeLink = screen.getByLabelText(/Visit UmerFilms on YouTube/i);
      const tiktokLink = screen.getByLabelText(/Visit UmerFilms on TikTok/i);

      expect(instagramLink).toHaveAttribute(
        "href",
        "https://instagram.com/umerfilms"
      );
      expect(youtubeLink).toHaveAttribute(
        "href",
        "https://youtube.com/@umerfilms"
      );
      expect(tiktokLink).toHaveAttribute(
        "href",
        "https://tiktok.com/@umerfilms"
      );
    });
  });
});
