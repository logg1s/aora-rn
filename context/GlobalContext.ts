import { createContext, useContext } from "react";
import { Models } from "react-native-appwrite";
interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> | null;
  user: Models.Document | null;
  setUser: React.Dispatch<React.SetStateAction<Models.Document | null>> | null;
  isLoading: boolean;
}
export const GlobalContext = createContext<GlobalContextType>({
  isLoading: true,
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: null,
  setUser: null,
});
export const useGlobalContext = () =>
  useContext<GlobalContextType>(GlobalContext);
