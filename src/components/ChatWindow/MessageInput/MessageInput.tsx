import { useState, useRef, memo } from "react";
import { Message } from "../../Common/types/types";
import { getCurrentTime } from "../../Common/util";
import { v4 as uuidv4 } from "uuid";
import { useMessageListDispatch } from "../MessageList/MessageListProvider";

interface MessageInputProps {
  scrollToBottom: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  scrollToBottom,
}) => {
  const [message, setMessage] = useState("");
  const inputMessageRef = useRef<HTMLTextAreaElement>(null);

  const messageListDispatch = useMessageListDispatch();

  const handleClick = () => {
    if (!message) return;
    const newMessage: Message = {
      id: uuidv4(),
      content: message,
      sentTime: getCurrentTime(),
    };
    messageListDispatch({
      type: 'add_message',
      newMessage: newMessage
    });
    scrollToBottom();
    setMessage("");
  };

  return (
    <div className="message-input-container">
      <textarea
        ref={inputMessageRef}
        className="message-input"
        id="message-input"
        rows={1}
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="message-send-button send-button"
        onClick={handleClick}
      >
        Send
      </button>
    </div>
  );
};

export default memo(MessageInput);
