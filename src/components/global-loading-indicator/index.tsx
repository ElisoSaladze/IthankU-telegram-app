import { LinearProgress } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

export const GlobalLoadingIndicator = () => {
  const queries = useIsFetching();
  const mutations = useIsMutating();

  if (queries === 0 && mutations === 0) {
    return null;
  }

  return <LinearProgress color="success" sx={{ position: 'absolute', top: 0, width: '100%', zIndex: 100 }} />;
};
