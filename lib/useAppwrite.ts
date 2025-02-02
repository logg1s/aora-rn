import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

const useAppwrite = (fn: Function) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Models.Document[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const dataFetched = await fn();
      setData(dataFetched);
    } catch (error: any) {
      Alert.alert("Error", error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refreshData = () => fetchData();
  return { isLoading, data, refreshData };
};

export default useAppwrite;
