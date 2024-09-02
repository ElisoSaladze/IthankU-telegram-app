import constate from 'constate';
import { useCallback, useEffect, useState } from 'react';
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
  distance: 1000,
};

const useFilterUsers = () => {
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);

  const { control, getValues, watch, setValue, reset } = useForm({
    defaultValues: defaultValues,
  });

  const clear = useCallback(() => {
    reset(defaultValues);
    setSelectedShade(null);
  }, [reset]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== `${paths.listing}&tab=users` && location.pathname !== paths.map) {
      clear();
    }
  }, [location.pathname, clear]);

  return { setValue, control, watch, getValues, selectedShade, setSelectedShade, clear } as const;
};

export const [FilterUsersProvider, useFilterUsersContext] = constate(useFilterUsers);
