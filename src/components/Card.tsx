import { Card, CardContent, Typography } from "@mui/material";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function CardComponent({ title, children }: CardProps) {
  return (
    <Card sx={{ width: "80%", padding: 2, border: "none", boxShadow: "none" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
