import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  test("should display a paragraph that contains the current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();

    const footer = screen.getByRole("contentinfo");
    const paragraph = screen.getByText(/copyright/i);
    const paragraphWithYear = screen.getByText("Copyright © " + currentYear);

    expect(footer).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(paragraphWithYear).toBeInTheDocument();
  });
});
