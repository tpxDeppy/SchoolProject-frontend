import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClassList from "@/pages/classList";

//mocking the Link functionality
jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({ children, href }) => <a href={href}>{children}</a>,
  };
});

describe("ClassList", () => {
  test("should display contents of EmptyContent component if there is no data", () => {
    const classes = [];
    render(<ClassList classes={classes} />);

    const emptyContentText = screen.getByText(/can't see anything/i);
    const startAddingLink = screen.getByRole("link", {
      name: /start adding classes/i,
    });

    expect(emptyContentText).toBeInTheDocument();
    expect(startAddingLink).toBeInTheDocument();
  });

  test("should display a table of class data", () => {
    const classes = [
      {
        classID: "class1",
        className: "Class A",
        classDescription: "This is Class A",
      },
      {
        classID: "class2",
        className: "Class B",
        classDescription: "This is Class B",
      },
    ];
    render(<ClassList classes={classes} />);

    const table = screen.getByRole("table");
    const rows = within(screen.getByTestId("classes")).getAllByRole("row");
    const cells = screen.getAllByRole("cell");
    const editLinks = screen.getAllByRole("link");

    expect(table).toBeInTheDocument();
    expect(rows).toHaveLength(2);
    expect(cells).toHaveLength(8);
    expect(editLinks).toHaveLength(2);
    expect(editLinks[0]).toHaveAttribute(
      "href",
      `/classList/[${classes[0].classID}]`
    );
    expect(editLinks[1]).toHaveAttribute(
      "href",
      `/classList/[${classes[1].classID}]`
    );
  });
});
