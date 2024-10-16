import { screen, render } from "@testing-library/react";
import SideBarHeader from "../../../../components/SideBar/SideBarHeader/SideBarHeader";
import userEvent from "@testing-library/user-event";

describe("SideBarHeader", () => {
  const setIsCompact = jest.fn();
  beforeEach(() => {
    render(<SideBarHeader setIsCompact={setIsCompact} />);
  });

  it("containes Compact Button", () => {
    const CompactButton = screen.getByRole("button", { name: /compact/i });
    expect(CompactButton).toBeInTheDocument();
  });

  it("container user profile", () => {
    const UserProfile = screen.getByTestId("user-profile");
    expect(UserProfile).toBeInTheDocument();
  });

  it(" calls setIsCompact when compact button is clicked", async () => {
    const CompactButton = screen.getByRole("button", { name: /compact/i });
    await userEvent.click(CompactButton);

    expect(setIsCompact).toBeCalled();
  });
});
