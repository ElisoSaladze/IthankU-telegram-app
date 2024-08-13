import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import notificationsIcon from "src/assets/icons/notifications.svg";
import { useNavigate } from "react-router-dom";
type Props = {
  pageName: string;
};
const BackButtonAppBar = ({ pageName }: Props) => {
  const navigate = useNavigate();
  return (
    <AppBar
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
      }}
    >
      <Toolbar>
        <ArrowBackIosIcon
          onClick={() => navigate(-1)}
          sx={{ color: "secondary.dark" }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            fontWeight={500}
            variant="h6"
            component="div"
            sx={{ textAlign: "center", color: "black", fontSize: 20 }}
          >
            {pageName}
          </Typography>
        </Box>
        <IconButton>
          <img src={notificationsIcon} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default BackButtonAppBar;
