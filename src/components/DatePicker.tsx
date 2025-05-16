import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";

interface DatePickerCustomProps {
  helperText?: string;
  name?: string;
  error?: boolean;
  value: string | Date | null;
  onChange: (date: Moment | null) => void;
  label?: string;
  format?: string;
  views?: Array<"year" | "month" | "day">;
  [key: string]: unknown; // Allow additional props
}

const DatePickerCustom: React.FC<DatePickerCustomProps> = (props) => {
  const {
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

  const momentDate = moment(value)

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        name={name}
        value={momentDate}
        onChange={onChange}
        label={label}
        views={views}
        format={format}
        error={error}
        helperText={helperText}
        {...other}
      />
    </LocalizationProvider>
  );
};

export default DatePickerCustom;
