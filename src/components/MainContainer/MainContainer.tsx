import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import ChatWindow from "../ChatWindow/ChatWindow";
import { DEFAULT_USER } from "../Common/constants";
import { ContactListProvider } from "./ContactListProvider";
import { MessageListProvider } from "./MessageListProvider";
import { CurrentUserProvider } from "./CurrentUserProvider";

const MainContainer: () => JSX.Element = () => {
  const [isCompact, setIsCompact] = useState(false);

  return (
    <ContactListProvider>
      <CurrentUserProvider>
        <div className="main-container">
          <SideBar
            isCompact={isCompact}
            setIsCompact={setIsCompact}
          />

          <ChatWindow isCompact={isCompact} />
        </div>
      </CurrentUserProvider>
    </ContactListProvider>
  );
};

export default MainContainer;
