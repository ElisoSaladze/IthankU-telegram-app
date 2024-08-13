import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Button, Fab, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
const AppreciateComponent = ({ show, setShow }: Props) => {
  const navigate = useNavigate();
  const [appreciate, setAppreciate] = useState(false);
  const [getApprectiation, setGetApprectiation] = useState(false);
  return show ? (
    <Stack
      p={2}
      width={"100%"}
      position={"fixed"}
      justifyContent={"space-between"}
      alignItems={"center"}
      direction={"row"}
      sx={{
        zIndex: 100,
        bottom: 30,
        height: 80,
      }}
    >
      {appreciate && (
        <Button
          onClick={() => navigate("/scan-qr-code")}
          color="info"
          sx={{
            alignSelf: "flex-start",
            fontSize: 12,
            minWidth: 130,
          }}
          variant="contained"
        >
          Qr Code
        </Button>
      )}
      {getApprectiation && (
        <Button
          color="info"
          sx={{
            alignSelf: "flex-start",
            fontSize: 12,
            minWidth: 130,
          }}
          variant="contained"
        >
          Qr Code
        </Button>
      )}
      {!appreciate && !getApprectiation && (
        <Button
          sx={{
            alignSelf: "flex-start",
            fontSize: 12,
            minWidth: 130,
          }}
          variant="contained"
          onClick={() => setAppreciate(true)}
        >
          Appreciate
        </Button>
      )}
      <Box
        sx={{
          position: "relative",
          padding: 1.2,
          zIndex: 100,
          borderRadius: "50%",
        }}
      >
        <Fab
          onClick={() => {
            setShow(false);
            setAppreciate(false);
            setGetApprectiation(false);
          }}
        >
          <CloseOutlinedIcon />
        </Fab>
      </Box>
      {appreciate && (
        <Button
          color="info"
          sx={{
            alignSelf: "flex-start",
            fontSize: 12,
            minWidth: 130,
          }}
          variant="contained"
        >
          Phone Number
        </Button>
      )}
      {getApprectiation && (
        <Button
          color="info"
          sx={{
            alignSelf: "flex-start",
            fontSize: 12,
            minWidth: 130,
          }}
          variant="contained"
        >
          Advanced Qr Code
        </Button>
      )}
      {!appreciate && !getApprectiation && (
        <Button
          sx={{
            alignSelf: "flex-start",
            fontSize: 12,
            minWidth: 130,
          }}
          variant="contained"
          onClick={() => setGetApprectiation(true)}
        >
          Get Appreciation
        </Button>
      )}
    </Stack>
  ) : (
    <></>
  );
};

export default AppreciateComponent;
