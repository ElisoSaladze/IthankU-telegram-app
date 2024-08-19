import { Avatar, ListItemButton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "src/api/listing";
import Loader from "src/components/loader";
import ShadeComponent from "src/components/shade-component";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const UsersList = () => {
  const { isFetching, isLoading, data } = useQuery({
    queryKey: ["listing-users"],
    queryFn: async () => getUsers(),
  });

  if (isFetching || isLoading) return <Loader />;
  return (
    <Stack paddingBottom={10} marginY={1} gap={1}>
      {data!.users.map((user) => (
        <ListItemButton
          key={user._id}
          sx={{
            width: "100%",
            borderRadius: 5,
            boxShadow: "0px 0px 8.2px -1px #00000026",
          }}
        >
          <Stack
            sx={{ width: "100%" }}
            borderRadius={5}
            p={1}
            alignItems={"center"}
            justifyContent={"space-between"}
            direction={"row"}
          >
            <Stack gap={1} alignItems={"center"} direction={"row"}>
              <Avatar sx={{ width: 70, height: 70 }} src={user.picture} />
              <Stack gap={0.5}>
                <Typography fontSize={15} fontWeight={600}>
                  {user.name}
                </Typography>
                {user.topShades!.length > 0 && (
                  <ShadeComponent
                    color="green"
                    name={user.topShades![0].shade}
                  />
                )}

                {/* <Stack direction={'row'}>
                  {user.?.map((tag, i) => (
                    <TagItem key={i} tag={tag} />
                  ))}
                </Stack> */}
              </Stack>
            </Stack>
            <Stack alignItems={"center"} direction={"row"} gap={1}>
              <Typography>{Math.round(user.generalRating)}</Typography>
              <ArrowForwardIosIcon
                sx={{
                  color: "secondary.main",
                }}
              />
            </Stack>
          </Stack>
        </ListItemButton>
      ))}
    </Stack>
  );
};

export default UsersList;
