import React from "react";
import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

interface TextFieldFormatProps {
  onChange: (values: { value: string; floatValue?: number }) => void;
  [key: string]: unknown; // To allow additional props
}

const TextFieldFormat: React.FC<TextFieldFormatProps> = ({ onChange, ...rest }) => (
  <NumericFormat
    customInput={TextField}
    fullWidth
    onValueChange={onChange}
    {...rest}
  />
);

export default TextFieldFormat;
