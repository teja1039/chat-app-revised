import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";
import React, { useCallback, useRef } from "react";
import ChatWindowHeader from "./ChatWindowHeader/ChatWindowHeader";
import { MessageListProvider } from "../ContextProviders/MessageListProvider/MessageListProvider";
import { useCurrentUser } from "../ContextProviders/CurrentUserProvider";

interface ChatWindowProps {
  isCompact: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isCompact }) => {
  const messageListRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, []);

  const currentUser = useCurrentUser();

  return (
    <div className="chat-window">
      <MessageListProvider>
        <ChatWindowHeader user={currentUser} />
        <MessageList
          isCompact={isCompact}
          messageListRef={messageListRef}
        />
        <MessageInput scrollToBottom={scrollToBottom} />
      </MessageListProvider>
    </div>
  );
};

export default ChatWindow;
