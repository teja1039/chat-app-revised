import { User } from "../../Common/types/types";
import { useCallback, useState } from "react";
import Modal, { ModalType } from "../../Common/Modal/Modal";
import { DEFAULT_USER } from "../../Common/constants";
import { setMessageListToLocalStorage } from "../../Common/localStorageFunctions";
import UserCard from "./UserCard/UserCard";
import {
  useContactList,
  useContactListDipatch,
} from "../../MainContainer/ContactListProvider";
import {
  useCurrentUser,
  useCurrentUserSetState,
} from "../../MainContainer/CurrentUserProvider";

interface UserListProps {
  isCompact: boolean;
}

const UserList: (userListPros: UserListProps) => JSX.Element = ({
  isCompact,
}) => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useCurrentUserSetState();
  const contactList = useContactList();
  const contactListDispatch = useContactListDipatch();
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleDeleteUser: (id: string) => void = useCallback((id) => {
    setSelectedUserId(id);
    setDeleteUserModal(true);
  }, []);

  const handleDeleteUserModal = useCallback(() => {
    contactListDispatch({
      type: "delete_contact",
      id: selectedUserId,
    });
    if (selectedUserId === currentUser.id) setCurrentUser(DEFAULT_USER);
    setMessageListToLocalStorage(selectedUserId, []);
    setDeleteUserModal(false);
  }, [selectedUserId, currentUser.id]);

  return (
    <div className="user-list">
      {contactList.map((contact) => {
        return (
          <UserCard
            user={contact}
            key={contact.id}
            isCurrentContact={currentUser.id === contact.id}
            isCompact={isCompact}
            setCurrentContact={setCurrentUser}
            handleDeleteUser={handleDeleteUser}
          />
        );
      })}

      {deleteUserModal && (
        <Modal
          type={ModalType.DeleteModal}
          onSave={handleDeleteUserModal}
          onCancel={setDeleteUserModal}
        />
      )}
    </div>
  );
};

export default UserList;
