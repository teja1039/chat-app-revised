import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";
import { User, Message } from "../Common/types/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_USER } from "../Common/constants";
import ChatWindowHeader from "./ChatWindowHeader/ChatWindowHeader";

interface ChatWindowProps {
  user: User;
  isCompact: boolean;
  messageList: Message[];
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  user,
  isCompact,
  messageList,
  setMessageList,
}) => {
  const messageListRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = useCallback((newMessage: Message) => {
    setMessageList((prevMessageList) => [...prevMessageList, newMessage]);
  }, []);

  if (user === DEFAULT_USER) return <></>;

  return (
    <div className="chat-window">
      <ChatWindowHeader user={user} />
      <MessageList
        isCompact={isCompact}
        messageList={messageList}
        setMessageList={setMessageList}
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
