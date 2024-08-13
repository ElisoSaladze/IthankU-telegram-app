import { Switch, SwitchProps } from "src/components/form/basic/switch";
import { isRequired } from "src/components/form/validations";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

export type ControlledRadioProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = SwitchProps & UseControllerProps<TFieldValues, TName>;

export const ControlledSwitch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  label,
  disabled,
  defaultChecked,
  helperText,
  required,
  rules,
  name,
}: ControlledRadioProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  });
  return (
    <Switch
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message || helperText}
      label={label}
      checked={field.value || false}
      onChange={field.onChange}
      disabled={disabled}
      defaultChecked={defaultChecked}
    />
  );
};
