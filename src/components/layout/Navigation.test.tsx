import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Navigation } from "./Navigation";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
    className?: string;
  }) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

// Mock focus-trap-react to avoid tabbable node errors in tests
vi.mock("focus-trap-react", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Navigation", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Site Logo", () => {
    it('renders site name/logo "UmerFilms"', () => {
      render(<Navigation />);
      const logos = screen.getAllByText("UmerFilms");
      expect(logos.length).toBeGreaterThanOrEqual(1);
      expect(logos[0]).toBeInTheDocument();
    });

    it("logo links to home page", () => {
      render(<Navigation />);
      const logos = screen.getAllByText("UmerFilms");
      expect(logos[0].closest("a")).toHaveAttribute("href", "/");
    });
  });

  describe("Menu Toggle Button", () => {
    it("renders menu toggle button", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });
      expect(menuButton).toBeInTheDocument();
    });

    it("menu button displays 'MENU' text with purple dot", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });
      expect(menuButton).toHaveTextContent("Menu");
      expect(menuButton).toHaveTextContent("•");
    });

    it("menu button has correct aria attributes initially", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
      expect(menuButton).toHaveAttribute("aria-label", "Toggle navigation menu");
    });

    it("menu button is focusable", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });
      expect(menuButton).not.toHaveAttribute("tabindex", "-1");
    });
  });

  describe("Off-Canvas Menu", () => {
    it("opens off-canvas menu on button click", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      // Click to open
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute("aria-expanded", "true");

      // Menu dialog should appear
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("renders navigation links in off-canvas menu", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      // Open menu
      fireEvent.click(menuButton);

      // Check navigation links
      expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /work/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
    });

    it("navigation links have correct href attributes", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      // Open menu
      fireEvent.click(menuButton);

      expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
      expect(screen.getByRole("link", { name: /work/i })).toHaveAttribute("href", "/work");
      expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
      expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
    });

    it("closes menu when navigation link is clicked", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      // Open menu
      fireEvent.click(menuButton);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Click a link
      const homeLink = screen.getByRole("link", { name: /home/i });
      fireEvent.click(homeLink);

      // Menu should close
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });

    it("closes menu when close button is clicked", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      // Open menu
      fireEvent.click(menuButton);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Click close button
      const closeButton = screen.getByRole("button", { name: /close menu/i });
      fireEvent.click(closeButton);

      // Menu should close
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });

    it("closes menu on Escape key", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      // Open menu
      fireEvent.click(menuButton);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Press Escape
      fireEvent.keyDown(window, { key: "Escape" });

      // Menu should close
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });

    it("prevents body scroll when menu is open", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      // Open menu
      fireEvent.click(menuButton);
      expect(document.body.style.overflow).toBe("hidden");

      // Close menu (click close button)
      const closeButton = screen.getByRole("button", { name: /close menu/i });
      fireEvent.click(closeButton);
      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Accessibility", () => {
    it("all links are focusable when menu is open", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      // Open menu
      fireEvent.click(menuButton);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).not.toHaveAttribute("tabindex", "-1");
      });
    });

    it("off-canvas menu has proper dialog attributes", () => {
      render(<Navigation />);
      const menuButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      // Open menu
      fireEvent.click(menuButton);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
      expect(dialog).toHaveAttribute("aria-label", "Navigation menu");
    });
  });

  describe("Sticky Header", () => {
    it("header has fixed positioning classes", () => {
      render(<Navigation />);
      const header = screen.getByRole("banner");
      expect(header).toHaveClass("fixed", "top-0");
    });
  });
});
