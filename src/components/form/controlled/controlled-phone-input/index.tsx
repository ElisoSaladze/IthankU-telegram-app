import {
  useController,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import { isRequired } from "src/components/form/validations";
import { MuiPhone, MUIPhoneProps } from "../../basic/phone-input";

export type ControlledTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<MUIPhoneProps, "value" | "onChange" | "name"> &
  UseControllerProps<TFieldValues, TName> & {
    disableAutofill?: boolean;
    onChange?: (value: string) => void;
    defaultCountry: string;
  };

export const ControlledPhoneInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  rules,
  onChange,
  ...otherProps
}: ControlledTextFieldProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(otherProps.required),
    },
  });

  const handlePhoneChange = (phone: string) => {
    field.onChange(phone);
    if (onChange) onChange(phone);
  };

  return (
    <MuiPhone
      {...otherProps}
      value={field.value}
      onChange={(e) => handlePhoneChange(e as string)}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message || otherProps.helperText}
    />
  );
};
