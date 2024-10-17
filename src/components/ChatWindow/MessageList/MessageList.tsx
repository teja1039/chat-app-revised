import { useState } from "react";
import { ConfirmationModal, InputModal } from "../../Common/Modal/Modal";
import { getCurrentTime } from "../../Common/util";
import MessageItem from "./MessageItem/MessageItem";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_MESSAGE, GET_MESSAGES, UPDATE_MESSAGE } from "../../../graphQueries";
import { Message } from "../../Common/types/types";
import { useCurrentUser } from "../../ContextProviders/CurrentUserProvider";

interface MessageListProps {
  isCompact: boolean;
  messageListRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
  isCompact,
  messageListRef,
}) => {
  const currentUserId = useCurrentUser().id;
  const [deleteMessageModal, setDeleteMessageModal] = useState(false);
  const [editMessageModal, setEditMessageModal] = useState(false);
  const [selectedMessageIndex, setSeletedMessageIndex] = useState<number>(-1);

  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    refetchQueries: [{query: GET_MESSAGES, variables: {userId: currentUserId}}]
  });
  const [updateMessage] = useMutation(UPDATE_MESSAGE, {
    refetchQueries: [{query: GET_MESSAGES, variables: {userId: currentUserId}}]
  });
  const {loading, error, data} = useQuery(GET_MESSAGES, {
    variables: {
      userId: currentUserId
    }
  });

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
    deleteMessage({variables: {
      userId: currentUserId,
      messageId: messageList[selectedMessageIndex].id
    }})
    setDeleteMessageModal(false);
  };

  // Can be optimized to remove messageList dependency
  const handleEditMessageModal: (newMessageContent?: string) => void = (
    newMessageContent
  ) => {
    setEditMessageModal(false);
    if (!newMessageContent || newMessageContent === messageList[selectedMessageIndex].content) return;

    updateMessage({variables: {
      userId: currentUserId,
      messageId: messageList[selectedMessageIndex].id,
      content: newMessageContent,
    }})
  };


  if(currentUserId === "default-user") return <div className="message-list"></div>
  if(loading) return <div className="message-list">Loading...</div>
  if(error) return <div className="message-list">{error.message}</div>
  const messageList = data.getMessagesOfUser as Message[];

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
