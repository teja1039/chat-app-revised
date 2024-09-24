import {
  useReducer,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { Message, ContactList } from "../../Common/types/types";
import {
  getContactListFromLocalStorage,
  setContactListToLocalStorage,
} from "../../Common/localStorageFunctions";
import React from "react";
import {
  ContactListDispatch,
  ContactListProviderProps,
  ContactListReducer,
} from "./types";

export const ContactListContext = createContext<ContactList>([]);
export const ContactListDispatchContext = createContext<ContactListDispatch>(
  () => console.warn("Dispatch function not provided")
);

export const ContactListProvider: React.FC<ContactListProviderProps> = ({
  children,
}) => {
  const [contactList, dispatch] = useReducer(
    contactListReducer,
    getContactListFromLocalStorage()
  );

  useEffect(() => {
    setContactListToLocalStorage(contactList);
  }, [contactList]);

  return (
    <ContactListContext.Provider value={contactList}>
      <ContactListDispatchContext.Provider value={dispatch}>
        {children}
      </ContactListDispatchContext.Provider>
    </ContactListContext.Provider>
  );
};

export const useContactList = () => {
  return useContext(ContactListContext);
};

export const useContactListDipatch = () => {
  return useContext(ContactListDispatchContext);
};

const contactListReducer: ContactListReducer = (contactList, action) => {
  switch (action.type) {
    case "add_contact": {
      return [
        ...contactList,
        {
          id: action.userId,
          name: action.userName,
          profileImg:
            "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
        },
      ];
    }

    case "delete_contact": {
      return [...contactList].filter((contact) => contact.id !== action.userId);
    }

    case "change_last_message": {
      return [...contactList].map((contact) =>
        contact.id === action.userId
          ? { ...contact, lastMessage: action.lastMessage }
          : contact
      );
    }
  }
};
