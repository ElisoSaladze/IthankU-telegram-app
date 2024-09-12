import constate from 'constate';
import { useForm } from 'react-hook-form';
import { Shade } from '~/api/shades';
import { Visibility } from '~/constants/enums';

export type CreateGroupFormValues = {
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

const defaultValues: CreateGroupFormValues = {
  name: '',
  description: '',
  tags: [],
  privacy: Visibility.Public,
};

const useCreateGroup = () => {
  const { handleSubmit, setValue, control, watch } = useForm({
    defaultValues: defaultValues,
  });

  return { handleSubmit, setValue, control, watch } as const;
};
export const [CreateGroupProvider, useCreateGroupContext] = constate(useCreateGroup);
