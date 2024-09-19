import { useReducer, createContext, ReactNode, useContext, useEffect } from "react";
import { Contact, ContactList } from "../Common/types/types";
import {
  getContactListFromLocalStorage,
  setContactListToLocalStorage,
} from "../Common/localStorageFunctions";
import React from "react";

export const ContactListContext = createContext<ContactList>([]);

export const ContactListDispatchContext = createContext<
  React.Dispatch<ContactListAction>
>(() => {
  console.warn("Dispatch function not provided");
});

interface ContactListProviderProps {
  children: ReactNode;
}
export const ContactListProvider: React.FC<ContactListProviderProps> = ({
  children,
}) => {

  const [contactList, dispatch] = useReducer(
    contactListReducer,
    getContactListFromLocalStorage()
  );

  useEffect(() => {
    setContactListToLocalStorage(contactList);
  },[contactList])

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

interface ContactListAction {
  type: string;
  id: string;
  name?: string;
}
interface ContactListReducer {
  (contactList: ContactList, action: ContactListAction): ContactList;
}
const contactListReducer: ContactListReducer = (contactList, action) => {
  switch (action.type) {
    case "add_contact": {
      return [
        ...contactList,
        {
          id: action.id,
          name: action.name ?? "No User Name Given",
          profileImg:
            "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
        },
      ];
    }

    case "delete_contact": {
      return [...contactList].filter((contact) => contact.id !== action.id);
    }

    default: {
      throw Error("Unkown action: " + action.type);
    }
  }
};
