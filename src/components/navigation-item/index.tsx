import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { ListItemButton, Stack, Typography } from "@mui/material";

type Props = {
  name: string;
  icon?: string;
  onClick?: () => void;
};

const NavigationItem = ({ icon, name, onClick }: Props) => {
  return (
    <ListItemButton onClick={onClick}>
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
        width={"100%"}
      >
        <Stack alignItems={"center"} direction={"row"} spacing={1}>
          {icon && <img width={21} src={icon} />}
          <Typography>{name}</Typography>
        </Stack>
        <ArrowForwardIosOutlinedIcon color="secondary" />
      </Stack>
    </ListItemButton>
  );
};

export default NavigationItem;
