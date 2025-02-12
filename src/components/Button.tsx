import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
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
  redirectTo?: string;
}

export default function ButtonComponent({
  text,
  btnColor,
  onClick,
  redirectTo,
}: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <Button
      fullWidth
      variant="contained"
      color={btnColor}
      sx={{ marginTop: 2 }}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}
