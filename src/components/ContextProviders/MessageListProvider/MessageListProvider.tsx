import { useReducer, createContext, useContext, useEffect } from "react";
import { MessageList } from "../../Common/types/types";
import {
  getMessageListFromLocalStorage,
  setMessageListToLocalStorage,
} from "../../Common/localStorageFunctions";
import { useContactListDipatch } from "../ContactListProvider/ContactListProvider";
import { useCurrentUser } from "../CurrentUserProvider";
import {
  MessageListDispatch,
  MessageListProviderProps,
  MessageListReducer,
} from "./types";

const MessageListContext = createContext<MessageList>([]);
const MessageListDispatchContext = createContext<MessageListDispatch>(() =>
  console.warn("NO DISPATCH CONTEXT GIVEN")
);

export const useMessageList = () => {
  return useContext(MessageListContext);
};

export const useMessageListDispatch = () => {
  return useContext(MessageListDispatchContext);
};

export const MessageListProvider: React.FC<MessageListProviderProps> = ({
  children,
}) => {
  const currentUser = useCurrentUser();
  const contactListDispatch = useContactListDipatch();
  const [messageList, messageListDispatch] = useReducer(
    messageListReducer,
    getMessageListFromLocalStorage(currentUser.id)
  );

  useEffect(() => {
    messageListDispatch({
      type: "sync",
      userId: currentUser.id,
    });
  }, [currentUser.id]);

  useEffect(() => {
    contactListDispatch({
      type: "change_last_message",
      userId: currentUser.id,
      lastMessage: messageList[messageList.length - 1],
    });
  }, [messageList[messageList.length - 1]]);

  useEffect(() => {
    setMessageListToLocalStorage(currentUser.id, messageList);
  }, [messageList]);

  return (
    <MessageListContext.Provider value={messageList}>
      <MessageListDispatchContext.Provider value={messageListDispatch}>
        {children}
      </MessageListDispatchContext.Provider>
    </MessageListContext.Provider>
  );
};

const messageListReducer: MessageListReducer = (messageList, action) => {
  switch (action.type) {
    case "sync": {
      return action.userId
        ? getMessageListFromLocalStorage(action.userId)
        : messageList;
    }

    case "add_message": {
      return [...messageList, { ...action.newMessage }];
    }

    case "delete_message": {
      return [...messageList].filter(
        (message) => message.id !== action.messageId
      );
    }

    case "edit_message": {
      return [...messageList].map((message) =>
        message.id === action.editedMessage.id ? action.editedMessage : message
      );
    }
  }
};
