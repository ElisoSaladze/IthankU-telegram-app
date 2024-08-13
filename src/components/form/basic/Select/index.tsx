import { ArrowDropDown } from "@mui/icons-material";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  useTheme,
} from "@mui/material";
import {
  FormControl,
  FormControlProps,
} from "src/components/form/form-control";
import { COLORS } from "src/constants/colors";
import { Dispatch, SetStateAction } from "react";

export type SelectOption = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export type SelectProps<T extends string> = Omit<FormControlProps, "children"> &
  Omit<MuiSelectProps, "value" | "onChange" | "label"> & {
    value?: T | Array<T>;
    options: Array<SelectOption>;
    onChange?: Dispatch<SetStateAction<T | Array<T>>>;
  };

export const Select = <T extends string>({
  placeholder,
  value,
  options,
  onChange,
  label,
  error,
  helperText,
  required,
  multiple,
  disabled,
  fullWidth,
}: SelectProps<T>) => {
  const theme = useTheme();

  const isAllSelected = Array.isArray(value) && value.length === options.length;

  return (
    <FormControl
      fullWidth={fullWidth}
      htmlFor={label}
      label={label}
      error={error}
      helperText={helperText}
      required={required}
    >
      <MuiSelect
        value={value}
        onChange={(event) => {
          const value: T | Array<T | "ALL"> | string = event.target.value;
          //TODO: Remove type assertion
          type Value = typeof value extends Array<T> ? Array<T> : T;

          if (Array.isArray(value) && value.includes("ALL")) {
            return isAllSelected
              ? onChange?.([])
              : onChange?.(options.map((option) => option.value));
          }
          onChange?.(event.target.value as Value);
        }}
        multiple={multiple}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        error={error}
        IconComponent={(props) => (
          <ArrowDropDown
            {...props}
            sx={{
              mr: "5px",
              "&.MuiSelect-icon": {
                color: "#DBDEE3",
                "&.Mui-disabled": {
                  color: ({ palette }) => palette.text.disabled,
                },
              },
            }}
          />
        )}
        sx={{
          border: " 1px #DBDEE3 solid",
          height: "38px",

          borderRadius: "6px",
          backgroundColor: COLORS.FieldsBg,
          "& .MuiInputBase-input": {
            color: value === "" ? "text.secondary" : undefined,
          },
        }}
        renderValue={(selected) => {
          const renderLabel = (item: T) =>
            options.find((option) => option.value === item)?.label;

          if (selected === "") {
            return placeholder;
          }

          if (multiple) {
            if (isAllSelected) {
              return "All";
            }
            return (selected as Array<T>) //TODO: Remove type assertion
              .map(renderLabel)
              .join(", ");
          }
          return renderLabel(selected as T);
        }}
        disabled={disabled}
      >
        {multiple && (
          <MenuItem value="ALL" divider>
            <Checkbox checked={isAllSelected} />
            <ListItemText primary="All" sx={{ pl: 1 }} />
          </MenuItem>
        )}
        {options.map(({ label, value: optionValue }) => {
          const isChecked = Array.isArray(value) && value.includes(optionValue);

          return (
            <MenuItem
              key={optionValue}
              value={optionValue}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.background.default,
                },
              }}
            >
              {multiple && <Checkbox checked={isChecked} />}
              <ListItemText primary={label} sx={{ pl: multiple ? 1 : 0 }} />
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
};
