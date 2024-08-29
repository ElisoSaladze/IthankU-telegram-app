import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export const ToastContent = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Box>
      <Typography variant="body1" mb={1} fontWeight={600}>
        {title}
      </Typography>

      {children}
    </Box>
  );
};
