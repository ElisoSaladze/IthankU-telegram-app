import { useQuery } from "@tanstack/react-query";
import constate from "constate";
import { getHashtags } from "src/api/hashtag/api";
import { getShades } from "src/api/shade";

const getLocalStorageData = <T>(key: string): T | null => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

const setLocalStorageData = (key: string, data: unknown): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const useFetchItems = () => {
  const shadesQuery = useQuery({
    queryKey: ["shades"],
    queryFn: getShades,
    initialData: getLocalStorageData("shades"),
    onSuccess: (data) => setLocalStorageData("shades", data),
  });

  const hashtagsQuery = useQuery({
    queryKey: ["hashtags"],
    queryFn: getHashtags,
    initialData: getLocalStorageData("hashtags"),
    onSuccess: (data) => setLocalStorageData("hashtags", data),
  });

  return {
    shades: shadesQuery.data,
    shadesLoading: shadesQuery.isLoading,
    shadesError: shadesQuery.isError,
    hashtags: hashtagsQuery.data,
    hashtagsLoading: hashtagsQuery.isLoading,
    hashtagsError: hashtagsQuery.isError,
  } as const;
};

export const [FetchItemsProvider, useFetchItemsContext] =
  constate(useFetchItems);
