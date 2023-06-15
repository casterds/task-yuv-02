import { useQuery } from "react-query"; 
import { FETCH_SIGNER_CACHE_KEY, fetchSigner } from "./api";
import { useGameData } from "../hooks/useGameData";

export const useQuerySigner = () => {
  const [, setGameData] = useGameData();
  return useQuery(
    FETCH_SIGNER_CACHE_KEY,
    async () => await fetchSigner(setGameData),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );
};
