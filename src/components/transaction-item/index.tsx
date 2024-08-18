import {
  Avatar,
  Chip,
  IconButton,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { Transaction } from "src/api/transaction/types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

type Props = {
  transaction: Transaction;
};

const TransactionItem = ({ transaction }: Props) => {
  const navigate = useNavigate();
  return (
    <ListItemButton
      onClick={() => navigate(`/transactions/${transaction._id}`)}
      sx={{
        width: "100%",
        borderRadius: 5,
        padding: 1,
        boxShadow: "0px 0px 8.2px -1px #00000026",
      }}
    >
      <Stack
        sx={{ width: "100%" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Stack gap={1} alignItems={"center"} direction={"row"}>
          <Avatar
            sx={{ height: 66, width: 66 }}
            src={transaction.sender?.picture}
          />
          <Stack>
            <Typography>{transaction.sender?.name}</Typography>
            <Typography fontSize={14}>
              Area:{" "}
              <Chip
                sx={{ padding: 0, height: "auto" }}
                label={transaction.shade}
                variant="outlined"
              />
            </Typography>
            <Typography fontSize={14}>
              hashtag:{" "}
              <Chip
                sx={{ padding: 0, height: "auto" }}
                label={transaction.hashtag}
                variant="outlined"
              />
            </Typography>
          </Stack>
        </Stack>
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </ListItemButton>
  );
};

export default TransactionItem;
