import { ReactNode } from "react";
import { Message, MessageList } from "../../Common/types/types";

export type MessageListDispatch = React.Dispatch<MessageListAction>;

export interface MessageListProviderProps {
  children: ReactNode;
}

export type MessageListAction =
  | AddMessage
  | DeleteMessage
  | EditMessage;

export interface MessageListReducer {
  (messageList: MessageList, action: MessageListAction): MessageList;
}

interface SyncWithLocalStorage {
  type: "sync";
  userId: string;
}
interface AddMessage {
  type: "add_message";
  newMessage: Message;
}
interface DeleteMessage {
  type: "delete_message";
  messageId: string;
}
interface EditMessage {
  type: "edit_message";
  editedMessage: Message;
}
