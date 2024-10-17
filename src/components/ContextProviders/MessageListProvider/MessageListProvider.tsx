import { useReducer, createContext, useContext, useEffect } from "react";
import { MessageList } from "../../Common/types/types";
import { useCurrentUser } from "../CurrentUserProvider";
import {GET_MESSAGES} from "../../../graphQueries"
import { useQuery } from "@apollo/client";
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
  const {loading, error, data} = useQuery(GET_MESSAGES);
  const [messageList, messageListDispatch] = useReducer(
    messageListReducer,
    data
  );

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
