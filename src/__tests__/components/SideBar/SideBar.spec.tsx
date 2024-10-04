import { render, screen } from "@testing-library/react";
import SideBar from "../../../components/SideBar/SideBar";
import userEvent from "@testing-library/user-event";
import { ContactListProvider } from "../../../components/ContextProviders/ContactListProvider/ContactListProvider";

describe("SideBar Component", () => {
  const setIsCompact = jest.fn();
  beforeEach(() =>
    render(
      <SideBar
        isCompact={false}
        setIsCompact={setIsCompact}
      />
    )
  );

  it("renders SideBarHeader", () => {
    const headerElement = screen.getByTestId("sidebar-header");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders NewUserButton", () => {
    const newUserButton = screen.getByRole("button", { name: /new user/i });
    expect(newUserButton).toBeInTheDocument();
  });

  it("renders UserList", () => {
    const userList = screen.getByTestId("user-list");
    expect(userList).toBeInTheDocument();
  });

  it("opens NewUserModal when NewUserButton is clicked", async () => {
    const newUserButton = screen.getByRole("button", { name: /new user/i });

    await userEvent.click(newUserButton);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });
});

describe("SideBar when NewUserButton is clicked", () => {
  beforeEach(async () => {
    render(
      <ContactListProvider>
        <SideBar
          isCompact={false}
          setIsCompact={jest.fn()}
        />
      </ContactListProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: /new user/i }));
  });

  it("displays NewUserModal", () => {
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("adds user to UserList when Save is clicked with non-empty username", async () => {
    const userName = "NewUser";
    const userNameInputElem = screen.getByLabelText(/input/i);
    await userEvent.type(userNameInputElem, userName);
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText(userName)).toBeInTheDocument();
  });

  it("reamains same when Save is clicked with empty username", async () => {
    await userEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
  
  it("closes when Save is clicked with non-empty username", async () => {
    const userNameInputModal = screen.getByTestId("modal");
    const userName = "NewUser";
    const userNameInputElem = screen.getByLabelText(/input/i);
    await userEvent.type(userNameInputElem, userName);
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(userNameInputModal).not.toBeInTheDocument();
  });

  it("closes when Cancel is clicked", async () => {
    const userNameInputModal = screen.getByTestId("modal");
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(userNameInputModal).not.toBeInTheDocument();
  });
});
