import { Button } from "@mui/material";

interface AuthButtonProps {
  text: string;
  btnColor:
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "info"
    | "warning"
    | string;
  onClick: () => void;
}

export default function AuthButton({
  text,
  btnColor,
  onClick,
}: AuthButtonProps) {
  return (
    <Button
      fullWidth
      variant="contained"
      color={btnColor}
      sx={{ marginTop: 2 }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
