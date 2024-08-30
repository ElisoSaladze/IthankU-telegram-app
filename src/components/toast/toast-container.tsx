import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { GlobalStyles, useTheme } from "@mui/material";
import { ToastContainer as ReactToastifyContainer } from "react-toastify";

export const ToastContainer = () => {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          ".Toastify__toast-body": {
            alignItems: "self-start",
          },

          ".Toastify__toast": {
            "&::after": {
              content: '""',
              position: "absolute",
              top: 6,
              left: 4,
              bottom: 6,
              width: "4px",
              borderRadius: "12px",
            },
          },

          ".Toastify__toast--info": {
            "&::after": {
              background: theme.palette.info.main,
            },
          },

          ".Toastify__toast--success": {
            "&::after": {
              background: theme.palette.success.main,
            },
          },

          ".Toastify__toast--warning": {
            "&::after": {
              background: theme.palette.warning.main,
            },
          },

          ".Toastify__toast--error": {
            background: theme.palette.error.light,

            "&::after": {
              background: theme.palette.error.main,
            },
          },
        }}
      />
      <ReactToastifyContainer
        autoClose={3000}
        position="bottom-right"
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        icon={({ type }) =>
          type === "success" ? (
            <TaskAltIcon sx={{ color: "background.paper", fontSize: "22px" }} />
          ) : (
            <ErrorOutlineIcon
              sx={{ color: "background.paper", fontSize: "22px" }}
            />
          )
        }
        closeButton={false}
      />
    </>
  );
};
