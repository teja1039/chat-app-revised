import {
  useReducer,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Contact, Message, MessageList, User } from "../Common/types/types";
import {
  getMessageListFromLocalStorage,
  setMessageListToLocalStorage,
} from "../Common/localStorageFunctions";
import { DEFAULT_USER } from "../Common/constants";
import { useContactListDipatch } from "./ContactListProvider";
import { useCurrentUser } from "./CurrentUserProvider";

const MessageListContext = createContext<MessageList>([]);
const MessageListDispatchContext = createContext<
  React.Dispatch<MessageListAction>
>(() => console.warn("NO DISPATCH CONTEXT GIVEN"));

interface MessageListProviderProps {
  children: ReactNode;
}
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
      contactId: currentUser.id,
    });
  }, [currentUser.id]);

  useEffect(() => {
    contactListDispatch({
      type: "change_last_message",
      id: currentUser.id,
      lastMessage: messageList[messageList.length - 1],
    });
  }, [messageList[messageList.length-1]]);

  useEffect(() => {
    setMessageListToLocalStorage(currentUser.id, messageList);
  },[messageList]);

  return (
    <MessageListContext.Provider value={messageList}>
      <MessageListDispatchContext.Provider value={messageListDispatch}>
        {children}
      </MessageListDispatchContext.Provider>
    </MessageListContext.Provider>
  );
};

interface MessageListAction {
  type: string;
  contactId?: string;
  newMessage?: Message;
}
interface MessageListReducer {
  (messageList: MessageList, action: MessageListAction): MessageList;
}
const messageListReducer: MessageListReducer = (messageList, action) => {
  switch (action.type) {
    case "sync": {
      return action.contactId
        ? getMessageListFromLocalStorage(action.contactId)
        : messageList;
    }

    case "add_message": {
      return action.newMessage
        ? [...messageList, { ...action.newMessage }]
        : messageList;
    }

    case "delete_message": {
      return [...messageList].filter(
        (message) => message.id !== action.newMessage?.id
      );
    }

    case "edit_message": {
      return [...messageList].map((message) =>
        message.id === action.newMessage?.id ? action.newMessage : message
      );
    }

    default: {
      throw Error("Unkown action: " + action.type);
    }
  }
};

export const useMessageList = () => {
  return useContext(MessageListContext);
};

export const useMessageListDispatch = () => {
  return useContext(MessageListDispatchContext);
};
