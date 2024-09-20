import { useCallback, useRef, useState } from "react";
import { Message } from "../../Common/types/types";
import Modal, { ModalType } from "../../Common/Modal/Modal";
import { getCurrentTime } from "../../Common/util";
import MessageItem from "./MessageItem/MessageItem";
import {
  useMessageList,
  useMessageListDispatch,
} from "./MessageListProvider";

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
      newMessage: messageList[selectedMessageIndex],
    });
    setDeleteMessageModal(false);
  };

  // Can be optimized to remove messageList dependency
  const handleEditMessageModal: (newMessageContent?: string) => void = (
    newMessageContent
  ) => {
    setEditMessageModal(false);
    if (newMessageContent === messageList[selectedMessageIndex].content) return;

    messageListDispatch({
      type: "edit_message",
      newMessage: {
        ...messageList[selectedMessageIndex],
        content: newMessageContent ?? "",
        sentTime: "Edited " + getCurrentTime(),
      },
    });
  };

  return (
    <>
      <div
        className="message-list"
        ref={messageListRef}
      >
        {messageList.map((message, index) => (
          <MessageItem
            message={message}
            index={index}
            isCompact={isCompact}
            handleClick={handleClick}
          />
        ))}
      </div>

      {deleteMessageModal && (
        <Modal
          type={ModalType.DeleteModal}
          onSave={handleRemoveMessageModal}
          onCancel={setDeleteMessageModal}
        />
      )}

      {editMessageModal && (
        <Modal
          type={ModalType.EditMessageModal}
          inputValue={messageList[selectedMessageIndex].content}
          onSave={handleEditMessageModal}
          onCancel={setEditMessageModal}
        />
      )}
    </>
  );
};

export default MessageList;
