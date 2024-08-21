import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  color?: string;
};

export const ChipComponent = ({ children, color }: Props) => {
  return (
    <Box
      sx={{
        p: 0.25,
        px: 1,
        border: 2,
        borderColor: color ?? "info.main",
        borderRadius: 4,
      }}
    >
      {children}
    </Box>
  );
};
