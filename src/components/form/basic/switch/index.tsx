import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from "@mui/material";
import {
  FormControl,
  FormControlProps,
} from "src/components/form/form-control";
import { forwardRef } from "react";

export type SwitchProps = Omit<FormControlProps, "children"> & MuiSwitchProps;

export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  (
    { htmlFor, label, error, helperText, required, onChange, ...switchProps },
    ref
  ) => {
    return (
      <FormControl
        ref={ref}
        htmlFor={htmlFor}
        label={label}
        error={error}
        helperText={helperText}
        required={required}
      >
        <MuiSwitch
          {...switchProps}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newChecked = event.target.checked;
            onChange?.(event, newChecked);
          }}
        />
      </FormControl>
    );
  }
);
