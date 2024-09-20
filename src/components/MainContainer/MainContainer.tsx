import { useState } from "react";
import { Contact } from "../Common/types/types";
import SideBar from "../SideBar/SideBar";
import ChatWindow from "../ChatWindow/ChatWindow";
import { DEFAULT_CONTACT } from "../Common/constants";
import { ContactListProvider } from "./ContactListProvider";
import { ConversationProvider } from "./ConversationProvider";

const MainContainer: () => JSX.Element = () => {
  const [currentContact, setCurrentContact] =
    useState<Contact>(DEFAULT_CONTACT);
  const [isCompact, setIsCompact] = useState(false);

  return (
    <div className="main-container">
      <ContactListProvider>
        <SideBar
          currentContact={currentContact}
          setCurrentContact={setCurrentContact}
          isCompact={isCompact}
          setIsCompact={setIsCompact}
        />
      </ContactListProvider>
      <ConversationProvider
        user = {currentContact}
      >
        <ChatWindow isCompact={isCompact} />
      </ConversationProvider>
    </div>
  );
};

export default MainContainer;
