import { createContext, useContext, useState, PropsWithChildren } from "react";
import { UserData } from "../interfaces/interfaces";

interface UserContextType {
  userData: UserData;
  setUserData: (userData: UserData) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    username: "",
    show_stash_id: "",
    user_id: "",
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
