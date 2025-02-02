import { useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { getCurrentUser } from "../lib/appwrite";
import { Models } from "react-native-appwrite";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const user = await getCurrentUser();
        if (user) {
          setUser(user);
          setIsLoggedIn(true);
        }
      } catch (err: any){
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;