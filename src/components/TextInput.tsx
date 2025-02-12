import { TextField } from "@mui/material";

interface TextInputProps {
  label: string;
  type?: string;
  value: string;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autocomplete: string;
}

export default function TextInput({
  label,
  type = "text",
  value,
  onChangeValue,
  autocomplete,
}: TextInputProps) {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      variant="outlined"
      margin="normal"
      value={value}
      onChange={onChangeValue}
      autoComplete={autocomplete}
    ></TextField>
  );
}
