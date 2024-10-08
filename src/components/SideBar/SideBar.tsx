import { useCallback, useState } from "react";
import UserList from "./UserList/UserList";
import { InputModal } from "../Common/Modal/Modal";
import { v4 as uuidv4 } from "uuid";
import SideBarHeader from "./SideBarHeader/SideBarHeader";
import NewUserButton from "./NewUserButton/NewUserButton";
import { useContactListDipatch } from "../ContextProviders/ContactListProvider/ContactListProvider";

interface SideBarProps {
  isCompact: boolean;
  setIsCompact: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({ isCompact, setIsCompact }) => {
  const contactListDispatch = useContactListDipatch();
  const [newUserModal, setNewUserModal] = useState(false);

  const handleNewUser: (userName: string) => void = useCallback((userName) => {
    if (!userName) return;

    contactListDispatch({
      type: "add_contact",
      userId: userName + "_" + uuidv4(),
      userName: userName,
    });

    setNewUserModal(false);
  }, []);

  return (
    <div className="sidebar" data-testid = "sidebar">
      <SideBarHeader setIsCompact={setIsCompact} />
      <NewUserButton setNewUserModal={setNewUserModal} />
      <UserList isCompact={isCompact} />
      {newUserModal && <InputModal
        inputPlaceholder="Enter User name here..."
        onSave={handleNewUser}
        onCancel={() => setNewUserModal(false)}
      />}
    </div>
  );
};

export default SideBar;
