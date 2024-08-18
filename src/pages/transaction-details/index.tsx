import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Divider,
  ListItemButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams, Params, useNavigate } from "react-router-dom";
import { getTranasctionDetails } from "src/api/transaction";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CopyableItem from "src/components/copyable-item";
import Loader from "src/components/loader";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TransactionDetailsPage = () => {
  const { transactionId } = useParams<Params>();
  const navigate = useNavigate();
  const {
    data: transaction,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["transaction-details"],
    queryFn: () => getTranasctionDetails(transactionId!),
  });
  if (isLoading || isFetching) return <Loader />;
  return (
    <Stack height={"100vh"}>
      <AppBar
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "transparent",
        }}
      >
        <Toolbar>
          <ArrowBackIosIcon
            onClick={() => navigate(-1)}
            sx={{ color: "white" }}
          />
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
      >
        <svg
          width="414"
          height="314"
          viewBox="0 0 414 314"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H414V79.5C405.659 132.017 369.674 175.968 319.836 194.51L0 313.5V0Z"
            fill="#098616"
          />
        </svg>
      </Box>
      <Stack justifyContent={"center"} gap={1} marginTop={5} marginX={2}>
        <Typography color={"white"} textAlign={"center"}>
          {transaction?.data.shade}
        </Typography>
        <Typography color={"white"} textAlign={"center"}>
          {transaction?.data.hashtag}
        </Typography>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 5,
            boxShadow: "0px 0px 8.2px -1px #00000026",
          }}
        >
          <CopyableItem
            sx={{
              padding: 2,
              borderRadius: 5,
            }}
            title="Transaction ID"
            content={transaction!.data._id}
          />
        </Box>
        <Stack
          sx={{
            width: "100%",
            borderRadius: 5,
            padding: 2,
            boxShadow: "0px 0px 8.2px -1px #00000026",
            backgroundColor: "white",
          }}
        >
          <CopyableItem
            title="Date"
            content={new Date(transaction!.data.createdAt!).toLocaleString()}
          />
          <Divider />
          <ListItemButton
            onClick={() => navigate(`/more/${transaction!.data.sender!._id}`)}
          >
            <Stack
              width={"100%"}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Typography fontSize={14}>Sender</Typography>
              <Stack direction={"row"} alignItems={"center"}>
                <Typography fontSize={14}>
                  {transaction?.data.sender?.name}
                </Typography>
                <ArrowForwardIosIcon sx={{ height: "10px" }} />
              </Stack>
            </Stack>
          </ListItemButton>
          <Divider />
          <ListItemButton
            onClick={() => navigate(`/more/${transaction!.data.receiver!._id}`)}
          >
            <Stack
              width={"100%"}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Typography fontSize={14}>Receiver</Typography>
              <Stack direction={"row"} alignItems={"center"}>
                <Typography fontSize={14}>
                  {transaction?.data.receiver?.name}
                </Typography>
                <ArrowForwardIosIcon sx={{ height: "10px" }} />
              </Stack>
            </Stack>
          </ListItemButton>
          <Divider />
          <CopyableItem
            contentColor="primary"
            title="ITU"
            content={transaction!.data.itu.toString()}
          />
          <Divider />
          <CopyableItem
            contentColor="primary"
            title="USD"
            content={transaction!.data.amount!.toString()}
          />
        </Stack>
        {transaction!.data.comment.length > 0 && (
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Comment</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CopyableItem title="" content={transaction!.data.comment} />
            </AccordionDetails>
          </Accordion>
        )}
      </Stack>
    </Stack>
  );
};

export default TransactionDetailsPage;
