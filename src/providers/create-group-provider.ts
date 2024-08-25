import constate from 'constate';
import { useForm } from 'react-hook-form';
import { Visibility } from '~/constants/enums';

export type CreateGroupRequest = {
  name: string;
  description: string;
  shade: string;
  privacy: 'Public' | 'Private';
  image?: File;
  cover?: File;
  currentTag: string;
  shadeColor: string;
  tags: {
    value: string;
  }[];
};
const defaultValues: CreateGroupRequest = {
  name: '',
  description: '',
  tags: [],
  shade: '',
  shadeColor: '',
  privacy: Visibility.Public,
  currentTag: '#',
};
const useCreateGroup = () => {
  const { handleSubmit, setValue, control, watch } = useForm({
    defaultValues: defaultValues,
  });

  const formValues = watch();

  // Add form validation logic here
  const isFormValid = () => {
    return formValues.name.trim() !== '' && formValues.description.trim() !== '';
  };

  return { handleSubmit, setValue, control, watch, isFormValid } as const;
};
export const [CreateGroupProvider, useCreateGroupContext] = constate(useCreateGroup);
