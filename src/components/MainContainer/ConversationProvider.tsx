import {
  useReducer,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Conversation, Message, User } from "../Common/types/types";
import {
  getMessageListFromLocalStorage,
  setMessageListToLocalStorage,
} from "../Common/localStorageFunctions";

const ConversationContext = createContext<Conversation | null>(null);
const ConversationDispatchContext = createContext<
  React.Dispatch<ConversationAction>
>(() => {
  console.warn(
    "No dipatch function is provided for ConversationDispatchContext"
  );
});

interface ConversationProviderProps {
  children: ReactNode;
  user: User;
}
export const ConversationProvider: React.FC<ConversationProviderProps> = ({
  children,
  user,
}) => {
  const [messageList, dispatch] = useReducer(
    conversationReducer,
    getMessageListFromLocalStorage(user.id)
  );

  useEffect(() => {
    dispatch({
      type: "sync",
      userId: user.id,
    });
  }, [user]);

  useEffect(() => {
    setMessageListToLocalStorage(user.id,messageList);
    console.log("updated message list of " + user.id);
  },[messageList]);
  
  return (
    <ConversationContext.Provider
      value={{ withUser: user, messages: messageList }}
    >
      <ConversationDispatchContext.Provider value={dispatch}>
        {children}
      </ConversationDispatchContext.Provider>
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  return useContext(ConversationContext);
};

export const useConversationDispatch = () => {
  return useContext(ConversationDispatchContext);
};

interface ConversationAction {
  type: string;
  userId?: string;
  newMessage?: Message;
}
interface ConversationReducer {
  (messageList: Message[], action: ConversationAction): Message[];
}
export const conversationReducer: ConversationReducer = (
  messageList,
  action
) => {
  switch (action.type) {
    case "sync": {
      return getMessageListFromLocalStorage(action?.userId ?? "");
    }

    case "add_message": {
      return action.newMessage
        ? [...messageList, action.newMessage]
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
