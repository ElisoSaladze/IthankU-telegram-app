import {
  ListItemButton,
  Snackbar,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { useState } from "react";
type Props = {
  title: string;
  content: string;
  sx?: SxProps<Theme>;
  contentColor?: string;
};
const CopyableItem = ({
  title,
  content,
  sx,
  contentColor = "black",
}: Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  return (
    <>
      <ListItemButton
        sx={sx}
        onClick={() =>
          navigator.clipboard
            .writeText(content)
            .then(() => setSnackbarOpen(true))
        }
      >
        <Stack
          width="100%"
          flexWrap="wrap"
          direction="row"
          justifyContent="space-between"
        >
          {title.length > 0 && <Typography fontSize={14}>{title}</Typography>}
          <Typography color={contentColor} fontSize={14}>
            {content}
          </Typography>
        </Stack>
      </ListItemButton>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Text copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default CopyableItem;
