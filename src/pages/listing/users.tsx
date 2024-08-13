import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "src/api/listing";
import Loader from "src/components/loader";

const UsersList = () => {
  const { isFetching, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => getUsers(),
  });

  if (isFetching || isLoading) return <Loader />;
  return (
    <Stack marginY={1} gap={1}>
      {/* {data?.users.map(user => (
        <ListItemButton key={user._id} sx={{ width: '100%', borderRadius: 5 }}>
          <Stack
            sx={{ width: '100%' }}
            borderRadius={5}
            p={1}
            alignItems={'center'}
            justifyContent={'space-between'}
            direction={'row'}
            boxShadow={'0px 0px 8.2px -1px #00000026'}
          >
            <Stack gap={1} alignItems={'center'} direction={'row'}>
              <Avatar
                sx={{ width: 70, height: 70, borderRadius: 4 }}
                variant="rounded"
                src={user.picture || defaultImageUrl}
              />
              <Stack gap={0.5}>
                <Typography fontSize={15} fontWeight={600}>
                  {user.name}
                </Typography>
                <ShadeComponent color="green" name={user.topShades![0].shade} />
                <Stack direction={'row'}>
                  {user.?.map((tag, i) => (
                    <TagItem key={i} tag={tag} />
                  ))}
                </Stack>
              </Stack>
            </Stack>
            <Avatar sx={{ bgcolor: 'black' }}>
              <Typography color="white">{user.generalRating}</Typography>
            </Avatar>
          </Stack>
        </ListItemButton>
      ))} */}
    </Stack>
  );
};

export default UsersList;
