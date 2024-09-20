import { ReactNode, useContext, useReducer, useState } from "react";
import { DEFAULT_USER } from "../Common/constants";
import { createContext } from "react";
import { User } from "../Common/types/types";

export const CurrentUserContext = createContext(DEFAULT_USER);
export const CurrentUserSetStateContext = createContext<
  React.Dispatch<React.SetStateAction<User>>
>(() => console.warn("NO CONTEXT PROVIDED"));

interface CurrentUserProviderProps {
  children: ReactNode;
}
export const CurrentUserProvider: React.FC<
  CurrentUserProviderProps
> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(DEFAULT_USER);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserSetStateContext.Provider value={setCurrentUser}>
        {children}
      </CurrentUserSetStateContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};
export const useCurrentUserSetState = () => {
  return useContext(CurrentUserSetStateContext);
};
