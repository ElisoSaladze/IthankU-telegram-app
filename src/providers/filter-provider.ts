import constate from 'constate';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-use';

import { Shade } from '~/api/shades';
import { paths } from '~/app/routes';

const defaultValues = {
  area: '',
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
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    const isOnListingOrMap = location.pathname === `${paths.listing}&tab=users` || location.pathname === paths.map;
    console.log(location.pathname);
    // Check if the user is navigating away from listing or map
    const wasOnListingOrMap =
      prevPathname.current === paths.listing || prevPathname.current === paths.map;
    console.log(prevPathname.current);
    // Reset filters only when navigating away from both listing and map
    if (!isOnListingOrMap && wasOnListingOrMap) {
      clear();
    }

    // Update previous pathname
    prevPathname.current = location.pathname;
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
