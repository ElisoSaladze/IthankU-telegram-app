import { Select, SelectProps } from 'src/components/form/basic/Select';
import { isRequired } from 'src/components/form/validations';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

export type ControlledTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  T extends string = string,
> = SelectProps<T> &
  UseControllerProps<TFieldValues, TName> & {
    disableError?: boolean;
  };

/**
 * Type definition for the props accepted by the ControlledSelect component.
 * It extends SelectProps and UseControllerProps from 'react-hook-form'.
 *
 * @typedef {Object} ControlledTextFieldProps
 * @property {string} [label] - The label for the select field.
 * @property {boolean} [required] - Indicates if the select field is required.
 * @property {boolean} [disabled] - Indicates if the select field is disabled.
 * @property {SelectOption[]} [options] - The options for the select field.
 */

/**
 * ControlledSelect component renders a select field with a label and validation.
 * It uses the Select component from 'components/form/basic/Select' and integrates with react-hook-form for form state management.
 *
 * @component
 * @param {ControlledTextFieldProps} props - The props for the ControlledSelect component.
 * @param {string} [props.label] - The label for the select field.
 * @param {boolean} [props.required] - Indicates if the select field is required.
 * @param {boolean} [props.disabled] - Indicates if the select field is disabled.
 * @param {SelectOption[]} [props.options] - The options for the select field.
 * @param {FieldPath<TFieldValues>} props.name - The name of the select field.
 * @param {import('react-hook-form').Control<TFieldValues>} props.control - The control object from react-hook-form.
 * @param {import('react-hook-form').RegisterOptions} [props.rules] - Validation rules for the select field.
 * @returns {JSX.Element} The rendered ControlledSelect component.
 */
export const ControlledSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  T extends string = string,
>({
  name,
  control,
  label,
  disabled,
  required,
  rules,
  fullWidth,
  helperText,
  options,
  disableError,
  ...props
}: ControlledTextFieldProps<TFieldValues, TName, T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  });

  return (
    <Select
      ref={field.ref}
      value={field.value}
      onChange={field.onChange}
      label={label}
      {...(!disableError && {
        error: Boolean(fieldState.error),
        helperText: fieldState.error?.message || helperText,
      })}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      options={options}
      sx={props.sx}
    />
  );
};
