import { useState, lazy, Suspense } from "react";
import SideBar from "../SideBar/SideBar";
import { CurrentUserProvider } from "../ContextProviders/CurrentUserProvider";

const MainContainer: () => JSX.Element = () => {
  const [isCompact, setIsCompact] = useState(false);

  return (
    <CurrentUserProvider>
      <div className="main-container">
        <SideBar
          isCompact={isCompact}
          setIsCompact={setIsCompact}
        />
        <Suspense fallback={<ChatWindowFallback />}>
          <ChatWindow isCompact={isCompact} />
        </Suspense>
      </div>
    </CurrentUserProvider>
  );
};

const ChatWindow = lazy(() => import("../ChatWindow/ChatWindow"));
const ChatWindowFallback = () => {
  return (
    <div
      style={{
        fontSize: 24,
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      Loading...
    </div>
  );
};
export default MainContainer;
