import { useCallback, useRef, useState } from "react";
import { Message } from "../../Common/types/types";
import Modal, { ModalType } from "../../Common/Modal/Modal";
import { getCurrentTime } from "../../Common/util";
import MessageItem from "./MessageItem/MessageItem";

interface MessageListProps {
  isCompact: boolean;
  messageList: Message[];
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
  messageListRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
  isCompact,
  messageList,
  setMessageList,
  messageListRef,
}) => {
  const [deleteMessageModal, setDeleteMessageModal] = useState(false);
  const [editMessageModal, setEditMessageModal] = useState(false);
  const [selectedMessageIndex, setSeletedMessageIndex] = useState<number>(-1);

  const handleRemoveMessage = useCallback((index: number) => {
    setSeletedMessageIndex(index);
    setDeleteMessageModal(true);
  }, []);

  const handleEditMessage = useCallback((index: number) => {
    setSeletedMessageIndex(index);
    setEditMessageModal(true);
  }, []);

  const handleRemoveMessageModal = useCallback(() => {
    setMessageList((prevMessageList) =>
      [...prevMessageList].filter((_, i) => i !== selectedMessageIndex)
    );
    setDeleteMessageModal(false);
  },[selectedMessageIndex]);

  // Can be optimized to remove messageList dependency
  const handleEditMessageModal: (newMessageContent?: string) => void = useCallback((
    newMessageContent
  ) => {
    setEditMessageModal(false);
    if (newMessageContent === messageList[selectedMessageIndex].content) return;
    const newMessageList = [...messageList];
    newMessageList[selectedMessageIndex] = {
      ...newMessageList[selectedMessageIndex],
      content: newMessageContent ?? "",
      sentTime: "Edited " + getCurrentTime(),
    };
    setMessageList(newMessageList);
  },[messageList, selectedMessageIndex]);

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
            handleRemoveMessage={handleRemoveMessage}
            handleEditMessage={handleEditMessage}
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
