import { screen, render } from "@testing-library/react";
import ChatWindow from "../../../components/ChatWindow/ChatWindow";
import { ContactListProvider } from "../../../components/ContextProviders/ContactListProvider/ContactListProvider";
import { CurrentUserProvider } from "../../../components/ContextProviders/CurrentUserProvider";
import { Suspense } from "react";

describe("ChatWindow Component", () => {
  beforeEach(() => {
    render(
      <ContactListProvider>
        <CurrentUserProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <ChatWindow isCompact={false} />
          </Suspense>
        </CurrentUserProvider>
      </ContactListProvider>
    );
  });

  it("renders ChatWindowHeader", async () => {
    const ChatWindowHeader = await screen.findByTestId("chat-window-header");
    expect(ChatWindowHeader).toBeInTheDocument();
  });

  it("render input message component", async () => {
    const InputMessageElem = await screen.findByPlaceholderText(/message/i);
    expect(InputMessageElem).toBeInTheDocument();
  });
});
