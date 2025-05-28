import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface TextFieldCustomProps extends Omit<TextFieldProps, 'onChange'> {
  value: string | number | undefined;
  onChange: (values: { floatValue: number | undefined }) => void;
}

const TextFieldCustom: React.FC<TextFieldCustomProps> = ({ 
  value, 
  onChange, 
  ...rest 
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    
    const filteredValue = inputValue.replace(/[^\d.]/g, '');
    
    const floatValue = filteredValue ? parseFloat(filteredValue) : undefined;
    
    onChange({ floatValue });
  };

  return (
    <TextField
      {...rest}
      fullWidth
      value={value === undefined ? '' : value}
      onChange={handleChange}
      inputProps={{
        ...rest.inputProps,
        inputMode: 'numeric',
        pattern: '[0-9]*'
      }}
    />
  );
};

export default TextFieldCustom;