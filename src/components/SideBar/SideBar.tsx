import { useCallback, useState } from "react";
import UserList from "./UserList/UserList";
import { InputModal } from "../Common/Modal/Modal";
import { v4 as uuidv4 } from "uuid";
import SideBarHeader from "./SideBarHeader/SideBarHeader";
import NewUserButton from "./NewUserButton/NewUserButton";
import { ADD_CONTACT, GET_CONTACTS } from "../../graphQueries";
import { useMutation } from "@apollo/client";
import { ContactList } from "../Common/types/types";

interface SideBarProps {
  isCompact: boolean;
  setIsCompact: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({ isCompact, setIsCompact }) => {
  const [newUserModal, setNewUserModal] = useState(false);
  const [addContact] = useMutation(ADD_CONTACT, {
    refetchQueries: [{query: GET_CONTACTS}]
  });

  const handleNewUser: (userName: string) => void = useCallback(async (userName) => {
    if (!userName) return;

    await addContact({variables: {
      userId: userName + "_" + uuidv4(),
      name: userName
    }});

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
