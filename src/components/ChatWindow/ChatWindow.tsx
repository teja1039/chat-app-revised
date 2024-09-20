import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";
import { User, Message } from "../Common/types/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_CONTACT } from "../Common/constants";
import ChatWindowHeader from "./ChatWindowHeader/ChatWindowHeader";
import { useConversation, useConversationDispatch } from "../MainContainer/ConversationProvider";

interface ChatWindowProps {
  isCompact: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isCompact,
}) => {
  const messageListRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, []);

  const conversation = useConversation();
  const conversationDispatch = useConversationDispatch();
  const handleSendMessage = (newMessage: Message) => {
    conversationDispatch({
      type: 'add_message',
      newMessage: newMessage
    })
  }

  if (!conversation || conversation?.withUser === DEFAULT_CONTACT) return <></>;

  return (
    <div className="chat-window">
      <ChatWindowHeader user={conversation.withUser} />
      <MessageList
        isCompact={isCompact}
        messageList={conversation.messages}
        messageListRef={messageListRef}
      />
      <MessageInput
        handleSendMessage={handleSendMessage}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
};

export default ChatWindow;
