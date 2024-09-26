import constate from 'constate';
import { useForm } from 'react-hook-form';
import { Shade } from '~/api/shades';
import { Visibility } from '~/constants/enums';

export type CreateSpaceFormValues = {
  name: string;
  description: string;
  shade?: Shade;
  privacy: Visibility;
  image?: File;
  cover?: File;
  tags: {
    value: string;
  }[];
};

const defaultValues: CreateSpaceFormValues = {
  name: '',
  description: '',
  tags: [],
  privacy: Visibility.Public,
};

const useCreateSpace = () => {
  const { handleSubmit, setValue, control, watch } = useForm({
    defaultValues: defaultValues,
  });

  return { handleSubmit, setValue, control, watch } as const;
};
export const [CreateSpaceProvider, useCreateSpaceContext] = constate(useCreateSpace);
