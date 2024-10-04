import UserProfile from "../../Common/UserProfile/UserProfile";
import { DEFAULT_USER } from "../../Common/constants";
import { memo } from "react";

interface SideBarHeaderProps {
  setIsCompact: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarHeader: React.FC<SideBarHeaderProps> = ({ setIsCompact }) => {
  return (
    <div className="sidebar-header-container">
      <div className="sidebar-header" data-testid = "sidebar-header">
        <UserProfile user={DEFAULT_USER} />
        <button
          className="compact-toggle-button"
          onClick={() => setIsCompact((isCompact) => !isCompact)}
        >
          Compact
        </button>
      </div>
    </div>
  );
};

export default memo(SideBarHeader);
