import { memo } from "react";
import { User } from "../types/types";
import UserImg from "./UserImg/UserImg";
import UserDetails from "./UserDetails/UserDetails";

interface UserProfileProps {
  user: User;
  diplayLastMessage?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, diplayLastMessage }) => {
  return (
    <div
      className="user-profile"
      data-testid = "user-profile"
    >
      <UserImg imgUrl={user.profileImg} />
      <UserDetails user={user} diplayLastMessage={diplayLastMessage}/>
    </div>
  );
};

export default memo(UserProfile);
