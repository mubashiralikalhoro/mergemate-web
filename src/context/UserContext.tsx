import { useState, ReactNode, createContext, useContext } from "react";

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
}>({
  user: null,
  setUser: () => {},
});

export default UserContext;

export const useUserContext = () => {
  return useContext(UserContext);
};
