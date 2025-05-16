import React from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"; // Or AdapterDateFns if preferred
import moment, { Moment } from "moment";

interface DateTimePickerCompProps {
  value: Date | null | string; // Or Moment object if using AdapterMoment
  onChange: (date: Moment | null | undefined) => void; // Or Moment object
  label?: string;
  [key: string]: unknown; // Allow other props
}

const DateTimePickerComp: React.FC<DateTimePickerCompProps> = ({ value, onChange, label, ...rest }) => {
  const momentDate = moment(value);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        {...rest}
        label={label}
        value={momentDate}
        onChange={onChange}
        ampm={false} // This prop is still available in @mui/x-date-pickers
        // autoOk is not a prop in @mui/x-date-pickers, selection usually closes picker
        // fullWidth is a common TextField prop, ensure it's passed via ...rest or added if needed
        // sx={{ width: '100%' }} // if fullWidth is not directly supported or passed via rest
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerComp;
