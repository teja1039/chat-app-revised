import { memo } from "react";

interface NewUserButtonProps {
  setNewUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewUserButton: React.FC<NewUserButtonProps> = ({ setNewUserModal }) => {
  return (
    <button
      className="new-user-button"
      onClick={() => setNewUserModal(true)}
    >
      New User
    </button>
  );
};

export default memo(NewUserButton);
