import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageWrapper } from "./PageWrapper";

describe("PageWrapper", () => {
  it("renders children correctly", () => {
    render(<PageWrapper>Test content</PageWrapper>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies max-width constraint by default", () => {
    render(<PageWrapper>Content</PageWrapper>);
    const wrapper = screen.getByTestId("page-wrapper");
    expect(wrapper.className).toContain("max-w-7xl");
  });

  it("removes max-width when fullWidth is true", () => {
    render(<PageWrapper fullWidth>Full width content</PageWrapper>);
    const wrapper = screen.getByTestId("page-wrapper");
    expect(wrapper.className).not.toContain("max-w-7xl");
  });

  it("applies responsive padding classes", () => {
    render(<PageWrapper>Padded content</PageWrapper>);
    const wrapper = screen.getByTestId("page-wrapper");
    expect(wrapper.className).toContain("px-4");
    expect(wrapper.className).toContain("md:px-6");
    expect(wrapper.className).toContain("lg:px-8");
  });

  it("merges custom className", () => {
    render(<PageWrapper className="custom-class">Custom</PageWrapper>);
    const wrapper = screen.getByTestId("page-wrapper");
    expect(wrapper.className).toContain("custom-class");
  });
});
