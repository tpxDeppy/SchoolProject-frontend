import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import SchoolList from "@/pages/schoolList";

//mocking the Link functionality
jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({ children, href }) => <a href={href}>{children}</a>,
  };
});

describe("SchoolList", () => {
  test("should display contents of EmptyContent component if there is no data", () => {
    const schools = [];
    render(<SchoolList schools={schools} />);

    const emptyContentText = screen.getByText(/can't see anything/i);
    const startAddingLink = screen.getByRole("link", {
      name: /start adding schools/i,
    });

    expect(emptyContentText).toBeInTheDocument();
    expect(startAddingLink).toBeInTheDocument();
  });

  test("should display a table of school data", () => {
    const schools = [
      { schoolID: "school1", schoolName: "School A" },
      { schoolID: "school2", schoolName: "School B" },
    ];
    render(<SchoolList schools={schools} />);

    const table = screen.getByRole("table");
    const rows = within(screen.getByTestId("schools")).getAllByRole("row");
    const cells = screen.getAllByRole("cell");
    const editLinks = screen.getAllByRole("link");

    expect(table).toBeInTheDocument();
    expect(rows).toHaveLength(2);
    expect(cells).toHaveLength(6);
    expect(editLinks).toHaveLength(2);
    expect(editLinks[0]).toHaveAttribute(
      "href",
      `/schoolList/[${schools[0].schoolID}]`
    );
    expect(editLinks[1]).toHaveAttribute(
      "href",
      `/schoolList/[${schools[1].schoolID}]`
    );
  });
});
