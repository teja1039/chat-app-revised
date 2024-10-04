import UserProfile from "../../Common/UserProfile/UserProfile";
import { User } from "../../Common/types/types";
import { memo } from "react";

interface ChatWindowHeaderProps {
    user : User;
}

const ChatWindowHeader: React.FC<ChatWindowHeaderProps> = ({user}) => {
  return (
    <div className="chat-window-header" data-testid = "chat-window-header">
      <UserProfile user={user} />
    </div>
  );
};

export default memo(ChatWindowHeader);
