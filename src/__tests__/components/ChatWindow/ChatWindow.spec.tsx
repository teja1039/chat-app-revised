import { screen, render } from "@testing-library/react";
import ChatWindow from "../../../components/ChatWindow/ChatWindow";
import { ContactListProvider } from "../../../components/ContextProviders/ContactListProvider/ContactListProvider";
import { CurrentUserProvider } from "../../../components/ContextProviders/CurrentUserProvider";
import { Suspense } from "react";
import userEvent from "@testing-library/user-event";
import { v4 as uuidv4 } from "uuid";

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

  it("renders MessageList", async () => {
    const MessageList = await screen.findByTestId("message-list");
    expect(MessageList).toBeInTheDocument();
  });

  it("render input message component", async () => {
    const InputMessageElem = await screen.findByPlaceholderText(/message/i);
    expect(InputMessageElem).toBeInTheDocument();
  });

  it("adds message to MessageList when sent", async () => {
    const InputMessageElem = await screen.findByPlaceholderText(/message/i);
    const SendButton = await screen.findByRole("button", {name:/send/i})
    const newMessage = "New Message - " + uuidv4();

    await userEvent.type(InputMessageElem, newMessage);
    await userEvent.click(SendButton);

    const newMessageElem = await screen.findByText(newMessage);

    expect(newMessageElem).toBeInTheDocument();
  });
});
