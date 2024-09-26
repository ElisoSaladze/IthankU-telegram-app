import { RadioGroup, RadioGroupProps } from 'src/components/form/basic/radio-group';
import { isRequired } from 'src/components/form/validations';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

export type ControlledRadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  T extends string = string,
> = RadioGroupProps<T> & UseControllerProps<TFieldValues, TName>;

export const ControlledRadioGroup = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  disabled,
  required,
  rules,
  helperText,
  options,
}: ControlledRadioGroupProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  });

  return (
    <RadioGroup
      fullWidth
      ref={field.ref}
      value={field.value}
      onChange={field.onChange}
      helperText={fieldState.error?.message || helperText}
      label={label}
      required={required}
      disabled={disabled}
      options={options}
      error={Boolean(fieldState.error)}
    />
  );
};
