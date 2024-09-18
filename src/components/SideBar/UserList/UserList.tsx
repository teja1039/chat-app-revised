import { User } from "../../Common/types/types";
import { useCallback, useState } from "react";
import Modal, { ModalType } from "../../Common/Modal/Modal";
import { DEFAULT_USER } from "../../Common/constants";
import { setMessageListToLocalStorage } from "../../Common/localStorageFunctions";
import UserCard from "./UserCard/UserCard";

interface UserListProps {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  userList: User[];
  setUserList: React.Dispatch<React.SetStateAction<User[]>>;
  isCompact: boolean;
}

const UserList: (userListPros: UserListProps) => JSX.Element = ({
  currentUser,
  setCurrentUser,
  userList,
  setUserList,
  isCompact,
}) => {
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleDeleteUser: (id: string) => void = useCallback((id) => {
    setSelectedUserId(id);
    setDeleteUserModal(true);
  }, []);

  const handleDeleteUserModal = useCallback(() => {
    setUserList((prevUserList) =>
      prevUserList.filter((user) => user.id !== selectedUserId)
    );
    if (selectedUserId === currentUser.id) setCurrentUser(DEFAULT_USER);
    setMessageListToLocalStorage(selectedUserId, []);
    setDeleteUserModal(false);
  }, [selectedUserId, currentUser]);

  return (
    <div className="user-list">
      {userList.map((user) => {
        return (
          <UserCard
            user={user}
            key={user.id}
            isCurrentUser = {currentUser.id === user.id}
            isCompact={isCompact}
            setCurrentUser={setCurrentUser}
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
