import { useCallback, useEffect } from 'react';
import { useBoolean } from './use-boolean';

export const useNetworkStatus = () => {
  //   const [isOnline, setOnline] = useState<boolean>(true);
  const isOnline = useBoolean(true);

  const updateNetworkStatus = useCallback(() => {
    // setOnline(navigator.onLine);
    isOnline.setValue(navigator.onLine);
  }, [isOnline]);

  //   sometimes, the load event does not trigger on some browsers, that is why manually calling updateNetworkStatus on initial mount
  useEffect(() => {
    updateNetworkStatus();
  }, [updateNetworkStatus]);

  useEffect(() => {
    window.addEventListener('load', updateNetworkStatus);
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      window.removeEventListener('load', updateNetworkStatus);
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator.onLine]);

  return { isOnline: isOnline.isTrue };
};
