import AddIcon from "@mui/icons-material/Add";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { getGroups } from "src/api/group";
import Loader from "src/components/loader";
import GroupItem from "src/components/group-item";
import { Group } from "src/api/group/types";

const JoinGroupPage = () => {
  const navigate = useNavigate();
  const { data, isFetching } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => getGroups(),
  });

  if (isFetching) return <Loader />;
  return (
    <Stack
      spacing={2}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={2}
    >
      <Stack alignItems={"center"}>
        <Button
          onClick={() => navigate("/home")}
          sx={{ alignSelf: "end" }}
          color="secondary"
        >
          skip
        </Button>
        <Typography fontSize={24} fontWeight={600}>
          Join group
        </Typography>
        <Typography textAlign={"center"}>
          Connect with others and explore shared interests.
        </Typography>
        <Stack
          height={`calc(100vh - 250px)`}
          gap={1}
          flexGrow={1}
          width={"100%"}
          overflow="auto"
        >
          {data?.data.map((group: Group) => (
            <>
              <GroupItem group={group} />
              <Divider />
            </>
          ))}
        </Stack>
      </Stack>
      <Button
        endIcon={<AddIcon fontSize="large" />}
        variant="contained"
        color={"primary"}
        fullWidth
      >
        Create
      </Button>
    </Stack>
  );
};

export default JoinGroupPage;
