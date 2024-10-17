import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";
import React, { useCallback, useRef } from "react";
import ChatWindowHeader from "./ChatWindowHeader/ChatWindowHeader";
import { useCurrentUser } from "../ContextProviders/CurrentUserProvider";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE, GET_MESSAGES } from "../../graphQueries";

interface ChatWindowProps {
  isCompact: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isCompact }) => {

  const currentUser = useCurrentUser();
  const messageListRef = useRef<HTMLDivElement>(null);
  const [addMessage] = useMutation(ADD_MESSAGE, {
    refetchQueries: [{query: GET_MESSAGES, variables: {userId: currentUser.id}}]
  });

  const scrollToBottom = useCallback(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="chat-window">
        <ChatWindowHeader user={currentUser} />
        <MessageList
          isCompact={isCompact}
          messageListRef={messageListRef}
        />
        <MessageInput scrollToBottom={scrollToBottom} addMessage={addMessage}/>
    </div>
  );
};

export default ChatWindow;
