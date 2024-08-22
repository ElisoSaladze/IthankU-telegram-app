import { Avatar, ListItemButton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "src/api/listing";
import Loader from "src/components/loader";
import ShadeComponent from "src/components/shade-component";

const UsersList = () => {
  const searchParams = new URLSearchParams(location.search);

  const radius = searchParams.get("radius") || undefined;
  const shade = searchParams.get("shade") || undefined;
  const hashtag = searchParams.get("hashtag") || undefined;


  const { isFetching, isLoading, data  } = useQuery({
    queryKey: ["listing", radius, shade, hashtag],
    queryFn: async () => getUsers({ radius, shade, hashtag }),
  });

  const formatNumber = (num: number) => {
    return parseFloat(num.toFixed(2)).toString();
  };

  if (isFetching || isLoading) return <Loader />;
  return (
    <Stack paddingBottom={10} marginY={1} gap={1}>
      {data?.users.map((user) => {
        const userShade = shade || user.topShades?.[0]?.shade || "General";
        const userPoints = shade ? user.shadePoint : user.generalRating;

        return (
          <ListItemButton key={user._id} sx={{ width: "100%", borderRadius: 5 }}>
            <Stack
              sx={{ width: "100%" }}
              borderRadius={5}
              p={1.5}
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              boxShadow="0px 0px 8.2px -1px #00000026"
            >
              <Stack gap={2} alignItems="center" direction="row">
                <Avatar
                  sx={{ width: 70, height: 70, borderRadius: "50%" }}
                  src={user.picture || ""}
                />
                <Stack>
                  <Typography fontSize={18} fontWeight={600}>
                    {user.name}
                  </Typography>
                    <ShadeComponent name={userShade} color={"someColor"} />
                  <Typography fontSize={14} color="gray">
                    Hashtag: #{user.topHashtags?.[0]?.hashtag}
                  </Typography>
                </Stack>
              </Stack>
              <Typography fontSize={20} fontWeight={700} color="black">
                {formatNumber(userPoints || 0)}
              </Typography>
            </Stack>
          </ListItemButton>
        );
      })}
    </Stack>
  );
};

export default UsersList;
