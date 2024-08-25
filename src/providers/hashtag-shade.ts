import { useQuery } from '@tanstack/react-query';
import constate from 'constate';
import { getShades } from 'src/api/shades/shades.api';
import { getHashtags } from '~/api/hashtag';
import { qk } from '~/api/query-keys';

const getLocalStorageData = <T>(key: string): T | null => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

const setLocalStorageData = (key: string, data: unknown): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const useFetchItems = () => {
  const shadesQuery = useQuery({
    queryKey: ['shades'],
    queryFn: getShades,
    initialData: getLocalStorageData('shades'),
    onSuccess: (data) => setLocalStorageData('shades', data),
  });

  const hashtagsQuery = useQuery({
    queryKey: qk.hashtags.toKey(),
    queryFn: getHashtags,
    initialData: getLocalStorageData('hashtags'),
    onSuccess: (data) => setLocalStorageData('hashtags', data),
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

export const [FetchItemsProvider, useFetchItemsContext] = constate(useFetchItems);
