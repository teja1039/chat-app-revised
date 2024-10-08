import { useState } from "react";
import { ConfirmationModal, InputModal } from "../../Common/Modal/Modal";
import { getCurrentTime } from "../../Common/util";
import MessageItem from "./MessageItem/MessageItem";
import {
  useMessageList,
  useMessageListDispatch,
} from "../../ContextProviders/MessageListProvider/MessageListProvider";

interface MessageListProps {
  isCompact: boolean;
  messageListRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
  isCompact,
  messageListRef,
}) => {
  const [deleteMessageModal, setDeleteMessageModal] = useState(false);
  const [editMessageModal, setEditMessageModal] = useState(false);
  const [selectedMessageIndex, setSeletedMessageIndex] = useState<number>(-1);
  const messageListDispatch = useMessageListDispatch();
  const messageList = useMessageList();

  const handleClick = (action: { type: string; index: number }) => {
    setSeletedMessageIndex(action.index);
    switch (action.type) {
      case "delete_message": {
        setDeleteMessageModal(true);
        return;
      }

      case "edit_message": {
        setEditMessageModal(true);
        return;
      }

      default: {
        console.log("No action " + action.type);
      }
    }
  };

  const handleRemoveMessageModal = () => {
    messageListDispatch({
      type: "delete_message",
      messageId: messageList[selectedMessageIndex].id,
    });
    setDeleteMessageModal(false);
  };

  // Can be optimized to remove messageList dependency
  const handleEditMessageModal: (newMessageContent?: string) => void = (
    newMessageContent
  ) => {
    setEditMessageModal(false);
    if (!newMessageContent || newMessageContent === messageList[selectedMessageIndex].content) return;

    messageListDispatch({
      type: "edit_message",
      editedMessage: {
        ...messageList[selectedMessageIndex],
        content: newMessageContent ?? "",
        sentTime: "Edited " + getCurrentTime(),
      },
    });
  };

  return (
    <>
      <div
        data-testid = "message-list"
        className="message-list"
        ref={messageListRef}
      >
        {messageList.map((message, index) => (
          <MessageItem
            message={message}
            key={message.id}
            index={index}
            isCompact={isCompact}
            handleClick={handleClick}
          />
        ))}
      </div>

      {deleteMessageModal && (
        <ConfirmationModal
          onConfirm={handleRemoveMessageModal}
          onCancel={() => setDeleteMessageModal(false)}
        />
      )}

      {editMessageModal && (
        <InputModal
          inputDefaultValue={messageList[selectedMessageIndex]?.content}
          onSave={handleEditMessageModal}
          onCancel={() => setEditMessageModal(false)}
        />
      )}
    </>
  );
};

export default MessageList;
