import { ReactNode } from "react";
import { ContactList, Message } from "../../Common/types/types";

export type ContactListDispatch = React.Dispatch<ContactListAction>;

export interface ContactListProviderProps {
  children: ReactNode;
}

export type ContactListAction = AddContact | DeleteContact | ChangeLastMessage;

export interface ContactListReducer {
  (contactList: ContactList, action: ContactListAction): ContactList;
}

interface AddContact {
  type: "add_contact";
  userId: string;
  userName: string;
}
interface DeleteContact {
  type: "delete_contact";
  userId: string;
}
interface ChangeLastMessage {
  type: "change_last_message";
  userId: string;
  lastMessage: Message;
}
