import constate from 'constate';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-use';

import { Shade } from '~/api/shades';
import { paths } from '~/app/routes';

const defaultValues = {
  shadeId: '',
  hashtag: '',
  location: '',
  userLocation: {
    lat: 0,
    lng: 0,
  },
  distance: null as null | number,
};

const useFilterUsers = () => {
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
  const [refetchListing, setRefetchListing] = useState(false);

  const { control, getValues, watch, setValue, reset } = useForm({
    defaultValues: defaultValues,
  });

  const clear = useCallback(() => {
    reset(defaultValues);
    setSelectedShade(null);
  }, [reset]);
  const location = useLocation();

  useEffect(() => {
    const isOnListingOrMap = location.pathname === `${paths.listing}` || location.pathname === paths.map;
    if (!isOnListingOrMap) {
      clear();
    }
  }, [location.pathname, clear]);

  return {
    setValue,
    control,
    watch,
    getValues,
    selectedShade,
    setSelectedShade,
    clear,
    refetchListing,
    setRefetchListing,
  } as const;
};

export const [FilterUsersProvider, useFilterUsersContext] = constate(useFilterUsers);
