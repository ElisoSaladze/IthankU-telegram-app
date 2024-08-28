import constate from 'constate';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const clear = useCallback(() => {
    reset(defaultValues);
    setSelectedShade(null);
  }, [reset]);

  useEffect(() => {
    if (location.pathname !== paths.usersList || location.pathname !== paths.map) {
      clear();
    }
  }, [clear, location.pathname]);

  return { setValue, control, watch, getValues, selectedShade, setSelectedShade, clear } as const;
};

export const [FilterUsersProvider, useFilterUsersContext] = constate(useFilterUsers);
