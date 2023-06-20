import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import NavBar from "@/components/layout/NavBar";

//mocking ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

describe("NavBar", () => {
  test("should render header, navigation and button elements", () => {
    render(<NavBar />);

    const header = screen.getByRole("banner");
    const navElement = screen.getByRole("navigation");
    const menuButtons = within(screen.getByTestId("menu-buttons")).getAllByRole(
      "button"
    );
    const hamburgerIcon = screen.getByRole("button", {
      name: /open main menu/i,
    });

    expect(header).toBeInTheDocument();
    expect(navElement).toBeInTheDocument();
    expect(menuButtons).toHaveLength(3);
    expect(hamburgerIcon).toBeInTheDocument();
  });

  test("should render menu items correctly", () => {
    render(<NavBar />);

    const logoLink = screen.getByRole("link", { name: /school system/i });
    const peopleMenuButton = screen.getByRole("button", { name: /people/i });
    const schoolsMenuButton = screen.getByRole("button", { name: /schools/i });
    const classesMenuButton = screen.getByRole("button", { name: /classes/i });

    expect(logoLink).toBeInTheDocument();
    expect(peopleMenuButton).toBeInTheDocument();
    expect(schoolsMenuButton).toBeInTheDocument();
    expect(classesMenuButton).toBeInTheDocument();
  });

  test("should open the menu when the user clicks on the hamburger icon", async () => {
    render(<NavBar />);

    const hamburgerIcon = screen.getByRole("button", {
      name: /open main menu/i,
    });
    await userEvent.click(hamburgerIcon);

    const menu = screen.getByTestId("mobile-menu");

    expect(menu).toBeInTheDocument();
  });

  test("should close the menu when the user clicks on the x icon", async () => {
    render(<NavBar />);

    const hamburgerIcon = screen.getByRole("button", {
      name: /open main menu/i,
    });
    await userEvent.click(hamburgerIcon);

    const menu = screen.getByTestId("mobile-menu");

    const xIcon = screen.getByRole("button", {
      name: /close menu/i,
    });
    await userEvent.click(xIcon);

    expect(menu).not.toBeInTheDocument();
  });

  test("should show/hide dropdown menu when clicking on menu buttons", async () => {
    render(<NavBar />);

    const peopleMenuButton = screen.getByRole("button", { name: /people/i });
    const schoolsMenuButton = screen.getByRole("button", { name: /schools/i });
    const classesMenuButton = screen.getByRole("button", { name: /classes/i });

    //show
    await userEvent.click(peopleMenuButton);
    const peopleDropdown = screen.getByTestId("peopleDropdown");
    const searchPeople = screen.getByRole("menuitem", {
      name: /search people/i,
    });
    const addPerson = screen.getByRole("menuitem", {
      name: /add person/i,
    });
    expect(peopleDropdown).toBeInTheDocument();
    expect(searchPeople).toBeInTheDocument();
    expect(addPerson).toBeInTheDocument();

    //show
    await userEvent.click(schoolsMenuButton);
    const schoolsDropdown = screen.getByTestId("schoolsDropdown");
    const schoolList = screen.getByRole("menuitem", {
      name: /school list/i,
    });
    const addSchool = screen.getByRole("menuitem", {
      name: /add school/i,
    });
    expect(schoolsDropdown).toBeInTheDocument();
    expect(schoolList).toBeInTheDocument();
    expect(addSchool).toBeInTheDocument();

    //show
    await userEvent.click(classesMenuButton);
    const classesDropdown = screen.getByTestId("classesDropdown");
    const classList = screen.getByRole("menuitem", {
      name: /class list/i,
    });
    const addClass = screen.getByRole("menuitem", {
      name: /add class/i,
    });
    expect(classesDropdown).toBeInTheDocument();
    expect(classList).toBeInTheDocument();
    expect(addClass).toBeInTheDocument();

    //hide
    await userEvent.click(schoolsDropdown);
    expect(schoolsDropdown).not.toBeInTheDocument();

    //hide
    await userEvent.click(peopleMenuButton);
    expect(peopleDropdown).not.toBeInTheDocument();

    //hide
    await userEvent.click(classesDropdown);
    expect(classesDropdown).not.toBeInTheDocument();
  });

  test("should navigate to the Homepage when clicking on logo", async () => {
    delete window.location;
    window.location = {
      pathname: "/",
    };

    render(<NavBar />);

    const logoLink = screen.getByRole("link", { name: /school system/i });
    await userEvent.click(logoLink);
    expect(logoLink).toHaveAttribute("href", "/");
    expect(window.location.pathname).toBe("/");
  });

  test("should navigate to the correct page when clicking on Search People", async () => {
    delete window.location;
    window.location = {
      pathname: "/searchPeople",
    };

    render(<NavBar />);

    //revealing the people menu
    const peopleMenuButton = screen.getByRole("button", { name: /people/i });
    await userEvent.click(peopleMenuButton);

    const searchPeople = screen.getByRole("menuitem", {
      name: /search people/i,
    });
    await userEvent.click(searchPeople);

    expect(searchPeople).toHaveAttribute("href", "/searchPeople");
    expect(window.location.pathname).toBe("/searchPeople");
  });

  test("should navigate to the correct page when clicking on Add Person", async () => {
    delete window.location;
    window.location = {
      pathname: "/addPerson",
    };

    render(<NavBar />);

    //revealing the people menu
    const peopleMenuButton = screen.getByRole("button", { name: /people/i });
    await userEvent.click(peopleMenuButton);

    const addPerson = screen.getByRole("menuitem", {
      name: /add person/i,
    });
    await userEvent.click(addPerson);

    expect(addPerson).toHaveAttribute("href", "/addPerson");
    expect(window.location.pathname).toBe("/addPerson");
  });

  test("should navigate to the correct page when clicking on School List", async () => {
    delete window.location;
    window.location = {
      pathname: "/schoolList",
    };

    render(<NavBar />);

    //revealing the school menu
    const schoolsMenuButton = screen.getByRole("button", { name: /schools/i });
    await userEvent.click(schoolsMenuButton);

    const schoolList = screen.getByRole("menuitem", {
      name: /school list/i,
    });
    await userEvent.click(schoolList);

    expect(schoolList).toHaveAttribute("href", "/schoolList");
    expect(window.location.pathname).toBe("/schoolList");
  });

  test("should navigate to the correct page when clicking on Add School", async () => {
    delete window.location;
    window.location = {
      pathname: "/schoolList/addSchool",
    };

    render(<NavBar />);

    //revealing the school menu
    const schoolsMenuButton = screen.getByRole("button", {
      name: /schools/i,
    });
    await userEvent.click(schoolsMenuButton);

    const addSchool = screen.getByRole("menuitem", {
      name: /add school/i,
    });
    await userEvent.click(addSchool);

    expect(addSchool).toHaveAttribute("href", "/schoolList/addSchool");
    expect(window.location.pathname).toBe("/schoolList/addSchool");
  });

  test("should navigate to the correct page when clicking on Class List", async () => {
    delete window.location;
    window.location = {
      pathname: "/classList",
    };

    render(<NavBar />);

    //revealing the class menu
    const classesMenuButton = screen.getByRole("button", {
      name: /classes/i,
    });
    await userEvent.click(classesMenuButton);

    const classList = screen.getByRole("menuitem", {
      name: /class list/i,
    });
    await userEvent.click(classList);

    expect(classList).toHaveAttribute("href", "/classList");
    expect(window.location.pathname).toBe("/classList");
  });

  test("should navigate to the correct page when clicking on Add Class", async () => {
    delete window.location;
    window.location = {
      pathname: "/classList/addClass",
    };

    render(<NavBar />);

    //revealing the class menu
    const classesMenuButton = screen.getByRole("button", {
      name: /classes/i,
    });
    await userEvent.click(classesMenuButton);

    const addClass = screen.getByRole("menuitem", {
      name: /add class/i,
    });
    await userEvent.click(addClass);

    expect(addClass).toHaveAttribute("href", "/classList/addClass");
    expect(window.location.pathname).toBe("/classList/addClass");
  });
});
