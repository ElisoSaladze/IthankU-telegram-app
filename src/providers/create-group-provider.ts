import constate from 'constate';
import { useForm } from 'react-hook-form';
import { Visibility } from '~/constants/enums';

// TODO!
export type CreateGroupFormValues = {
  name: string;
  description: string;
  shade?: string;
  shadeId: string;
  privacy: Visibility;
  picture?: File;
  cover?: File;
  currentTag?: string;
  shadeColor?: string;
  tags: {
    value: string;
  }[];
};

const defaultValues: CreateGroupFormValues = {
  name: '',
  description: '',
  tags: [],
  shade: '',
  shadeColor: '',
  privacy: Visibility.Public,
  currentTag: '#',
  shadeId: '',
};

const useCreateGroup = () => {
  const { handleSubmit, setValue, control, watch } = useForm({
    defaultValues: defaultValues,
  });

  return { handleSubmit, setValue, control, watch } as const;
};
export const [CreateGroupProvider, useCreateGroupContext] = constate(useCreateGroup);
