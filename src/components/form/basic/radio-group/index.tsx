import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {
  FormControlLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material';
import { FormControl, FormControlProps } from 'src/components/form/form-control';
import { forwardRef, ReactNode } from 'react';
import { Dispatch, SetStateAction } from 'react';
export type RadioOption<T> = {
  label: ReactNode;
  value: T;
};

export type RadioGroupProps<T extends string> = Omit<FormControlProps, 'children'> &
  Omit<MuiRadioGroupProps, 'value' | 'onChange' | 'label'> & {
    value?: T | Array<T>;
    options: Array<RadioOption<T>>;
    onChange?: Dispatch<SetStateAction<T | Array<T>>>;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps<any>>(
  ({ label, error, helperText, required, onChange, name, value, options }, ref) => {
    const controlledValue = value;
    return (
      <FormControl
        ref={ref}
        htmlFor={label}
        label={label}
        error={error}
        helperText={helperText}
        required={required}
        fullWidth
      >
        <MuiRadioGroup
          sx={{ width: '100%' }}
          name={name}
          value={controlledValue}
          onChange={(event) => onChange?.(event.target.value)}
        >
          {options.map((option) => {
            const isChecked = option.value === controlledValue;
            return (
              <FormControlLabel
                sx={{
                  marginBottom: 1,
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginRight: 0,
                  marginLeft: 0,
                }}
                labelPlacement="start"
                checked={isChecked}
                key={option.value}
                value={option.value}
                label={option.label}
                control={
                  <Radio
                    checked={isChecked}
                    icon={<RadioButtonUncheckedIcon color="info" />}
                    checkedIcon={<RadioButtonCheckedIcon color="info" />}
                  />
                }
              />
            );
          })}
        </MuiRadioGroup>
      </FormControl>
    );
  },
);
