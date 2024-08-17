import {
  ListItemButton,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
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
  return (
    <ListItemButton
      sx={sx}
      onClick={() => navigator.clipboard.writeText(content)}
    >
      <Stack
        width={"100%"}
        flexWrap={"wrap"}
        direction={"row"}
        justifyContent={"space-between"}
      >
        {title.length > 0 && <Typography fontSize={14}>{title}</Typography>}
        <Typography color={contentColor} fontSize={14}>
          {content}
        </Typography>
      </Stack>
    </ListItemButton>
  );
};

export default CopyableItem;
