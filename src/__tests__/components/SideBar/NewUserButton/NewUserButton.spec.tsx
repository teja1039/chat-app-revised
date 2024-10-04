import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewUserButton from "../../../../components/SideBar/NewUserButton/NewUserButton";

describe("NewUser Button", () => {
  const handleClick = jest.fn();
  render(<NewUserButton setNewUserModal={handleClick} />);

  it("calls handleClick function when clicked", async () => {
    await userEvent.click(screen.getByRole("button", { name: /new user/i }));
    expect(handleClick).toBeCalled();
  });
});
