"use client"
import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function DatePickerCustom (props){
  const {
    inputRef,
    helperText,
    name,
    error,
    value,
    onChange,
    label,
    format,
    views,
    ...other
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        fullWidth
        name={name}
        inputRef={inputRef}
        value={value}
        onChange={onChange}
        label={label}
        views={views}
        format={format}
        slotProps={{
          textField: {
            error: error,
            helperText: helperText,
          },
        }}
        {...other}
      />
    </LocalizationProvider>
  );
};

