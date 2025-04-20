"use client";
import { getCurrentUser } from "@/services/Auth/authServices";
import { IUser } from "@/types";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isShop: boolean;
  setIsShop: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShop, setIsShop] = useState(false);

  const handleUser = async () => {
    const user = await getCurrentUser();
    console.log(user);
    setUser(user);
    setIsLoading(false);
    // setIsLoading(true);
    // try {
    //   const userInfo = await getCurrentUser();
    //   setUser(userInfo);
    // } finally {
    //   setIsLoading(false); // Always clear loading AFTER
    // }
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, isShop, setIsShop }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context == undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
