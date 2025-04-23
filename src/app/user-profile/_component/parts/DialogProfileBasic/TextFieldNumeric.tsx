import React from "react";
import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function TextFieldNumeric ({ value, onChange, ...rest }){
  return (
    <NumericFormat
      customInput={TextField}
      fullWidth
      value={value}
      onValueChange={onChange}
      {...rest}
    />
  )
};

