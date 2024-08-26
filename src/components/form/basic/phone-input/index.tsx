import 'react-international-phone/style.css';
import {
  BaseTextFieldProps,
  FormControlProps,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { CountryIso2, defaultCountries, FlagImage, parseCountry, usePhoneInput } from 'react-international-phone';
import { FormControl } from '../../form-control';

export type MUIPhoneProps = Omit<FormControlProps, 'children'> &
  BaseTextFieldProps & {
    value: string;
    defaultCountry: string;
    onChange: (phone: string) => void;
  };

export const MuiPhone: React.FC<MUIPhoneProps> = ({
  value,
  onChange,
  label,
  error,
  helperText,
  required,
  defaultCountry,
  ...restProps
}) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: defaultCountry,
    value,
    countries: defaultCountries,
    onChange: (data) => {
      onChange(data.phone);
    },
  });

  return (
    <FormControl error={error} fullWidth={restProps.fullWidth} helperText={helperText} disabled={restProps.disabled}>
      <TextField
        size="small"
        required={required}
        label={label}
        variant={restProps.variant}
        placeholder={restProps.placeholder}
        value={inputValue}
        onChange={handlePhoneValueChange}
        type="tel"
        inputRef={inputRef}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ marginRight: '2px', marginLeft: '-8px' }}>
              <Select
                MenuProps={{
                  PaperProps: {
                    style: {
                      border: 'none', // Remove border from the dropdown
                    },
                  },
                  style: {
                    height: '300px',
                    width: '360px',
                    top: '10px',
                    left: '-34px',
                    border: 'none',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                }}
                sx={{
                  width: 'max-content',
                  fieldset: {
                    display: 'none',
                  },
                  '&.Mui-focused:has(div[aria-expanded="false"])': {
                    fieldset: {
                      display: 'block',
                    },
                  },
                  '.MuiSelect-select': {
                    padding: '8px',
                    paddingRight: '24px !important',
                  },
                  svg: {
                    right: 0,
                  },
                }}
                value={country.iso2}
                onChange={(e) => setCountry(e.target.value as CountryIso2)}
                renderValue={(value) => <FlagImage iso2={value} style={{ display: 'flex' }} />}
              >
                {defaultCountries.map((c) => {
                  const country = parseCountry(c);
                  return (
                    <MenuItem key={country.iso2} value={country.iso2}>
                      <FlagImage iso2={country.iso2} style={{ marginRight: '8px' }} />
                      <Typography marginRight="8px">{country.name}</Typography>
                      <Typography color="gray">+{country.dialCode}</Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </InputAdornment>
          ),
        }}
        {...restProps}
      />
    </FormControl>
  );
};
