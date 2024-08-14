import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "src/api/post";
import Loader from "src/components/loader";
import PostItem from "src/components/post-item";
import { useAuthContext } from "src/providers/auth";
import { Post } from "src/api/post/types";

const HomePage = () => {
  const { userData } = useAuthContext();

  const posts = useQuery({
    refetchOnMount: true,
    queryKey: ["posts"],
    queryFn: async () => getPosts(),
  });

  if (userData.isFetching || userData.isLoading) return <Loader />;

  return (
    <Stack margin={2} gap={2} alignItems={"center"}>
      <Stack
        justifyContent={"space-between"}
        direction={"row"}
        alignItems={"center"}
      >
        <Stack>
          <Typography fontSize={30} fontWeight={600}>
            Hello, {userData.data?.user.name}!
          </Typography>
          <Typography fontSize={14} color={"secondary.dark"}>
            Transforming kindness into rewards? Discover how with{" "}
            <Typography component={"span"} color={"primary"}>
              ITHANKU!
            </Typography>
          </Typography>
        </Stack>
        <Avatar
          src={userData.data?.user.picture}
          sx={{ width: 65, height: 65 }}
        />
      </Stack>

      {posts.isFetching ? (
        <Stack gap={2} width="100%">
          {[...Array(3)].map((_, index) => (
            <Box key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={60}
                sx={{ mb: 2 }}
              />
              <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={194} />
            </Box>
          ))}
        </Stack>
      ) : (
        <Stack gap={2} width={"100%"} marginBottom={10}>
          {posts.data?.data.map((post: Post, index: number) => (
            <PostItem isDetails={false} key={index} post={post} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default HomePage;
