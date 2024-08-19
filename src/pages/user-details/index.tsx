/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Chip, IconButton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { Params, useNavigate, useParams } from "react-router-dom";
import { getUser } from "src/api/listing";
import BackButtonAppBar from "src/components/appbar";
import Loader from "src/components/loader";

import PfpComponent from "src/components/pfp-component";
import { useAuthContext } from "src/providers/auth";
import whatsapp from "src/assets/icons/Whatsapp.svg";
// import telegram from "src/assets/icons/Telegram.svg";
const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { userData } = useAuthContext();
  const { userId } = useParams<Params>();
  const isCurrent = userData.data?.user._id === userId;

  const user = useQuery({
    queryKey: ["postDetails", userId],
    queryFn: () => getUser(userId!),
  });

  if (user.isLoading || user.isFetching) return <Loader />;

  return (
    <Stack marginTop={8} gap={1} marginX={2}>
      <BackButtonAppBar pageName={"Profile"} />
      <Stack borderRadius={5} bgcolor="#222222" p={1} gap={1}>
        <Stack gap={1} direction={"row"} alignItems={"center"}>
          <PfpComponent
            showEditIcon={false}
            size={[80, 80]}
            imageUrl={user.data?.user.picture}
            isEditable={true}
          />
          <Stack>
            <Typography fontSize={20} color={"white"}>
              {user.data?.user.name}
            </Typography>
            <Typography fontSize={14} color={"white"}>
              {user.data?.user.email}
            </Typography>
            <Stack direction={"row"}>
              {user.data?.user.linkedAccounts.map((acc: any) =>
                acc.type === "whatsapp" ? (
                  <IconButton onClick={() => window.open(acc.value)}>
                    <img width={30} src={whatsapp} />
                  </IconButton>
                ) : (
                  ""
                )
              )}
            </Stack>
          </Stack>
        </Stack>
        {!isCurrent && (
          <Button
            onClick={() => navigate(`/appreciate/${userId}`)}
            color="warning"
            size="large"
            variant="contained"
            fullWidth
          >
            Appreciate
          </Button>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        {isCurrent && (
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            flexGrow={1}
            flexBasis="0"
            border={1}
            borderRadius={3}
          >
            <Typography>{user.data?.user.physicalPoints}</Typography>
            <Typography>wallet</Typography>
          </Stack>
        )}
        <Stack
          borderRadius={3}
          alignItems={"center"}
          justifyContent={"center"}
          flexGrow={1}
          flexBasis="0"
          border={1}
        >
          <Typography>{user.data?.user.generalRating}</Typography>
          <Typography>General score</Typography>
        </Stack>
      </Stack>
      {!isCurrent && user.data!.user.bio.length > 0 && (
        <Stack>
          <Typography>About me</Typography>
          <Typography>{user.data!.user.bio}</Typography>
        </Stack>
      )}
      {user.data?.user.topShades.length! > 0 && (
        <>
          <Typography>Areas</Typography>
          <Stack flexWrap={"wrap"} gap={0.5} direction={"row"}>
            {user.data?.user.topShades.map((shade) => (
              <Chip
                key={shade._id}
                label={shade.shade}
                variant="outlined"
                deleteIcon={<Typography>shade.points.toString()</Typography>}
              />
            ))}
          </Stack>
        </>
      )}
      {user.data?.user.topHashtags.length! > 0 && (
        <>
          <Typography>Hashtags</Typography>
          <Stack flexWrap={"wrap"} gap={0.5} direction={"row"}>
            {user.data?.user.topHashtags.map(
              (hashtag, i) =>
                hashtag.hashtag && (
                  <Chip key={i} label={hashtag.hashtag} variant="outlined" />
                )
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default UserDetailsPage;
