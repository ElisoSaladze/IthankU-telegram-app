import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import {
  createSearchParams,
  generatePath,
  Params,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getUser } from "src/api/listing";
import { paths } from "src/app/routes";
import { IconLocation } from "src/assets/icons";
import BackButtonAppBar from "src/components/appbar";
import { ChipComponent } from "src/components/chip-component";
import Loader from "src/components/loader";

import PfpComponent from "src/components/pfp-component";
import { useAuthContext } from "src/providers/auth";
import { match, P } from "ts-pattern";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { userData } = useAuthContext();
  const { userId } = useParams<Params>();
  const isCurrent = userData.data?.user._id === userId;

  const $user = useQuery({
    queryKey: ["postDetails", userId],
    queryFn: () => getUser(userId!),
  });

  return (
    <>
      {match($user)
        .with({ isLoading: true }, () => {
          return <Loader />;
        })
        .with({ isError: true }, () => {
          return <Typography>Failed to get user details</Typography>;
        })
        .with({ isSuccess: true, data: P.select() }, ({ user }) => {
          return (
            <Stack gap={1} mx={3} mt={3}>
              <BackButtonAppBar pageName="Profile" />
              <Stack
                borderRadius={5}
                bgcolor="info.main"
                p={2}
                gap={1}
                position="relative"
              >
                {user.location && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 4,
                    }}
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                      const coordinates = user.location?.coordinates!;

                      navigate({
                        pathname: generatePath(paths.userLocation, {
                          userId,
                        }),
                        search: createSearchParams({
                          lat: coordinates[0].toString(),
                          lng: coordinates[1].toString(),
                        }).toString(),
                      });
                    }}
                  >
                    <IconLocation sx={{ fontSize: 40 }} />
                  </IconButton>
                )}

                <Stack gap={1} direction="row" alignItems="center">
                  <PfpComponent
                    showEditIcon={false}
                    size={[80, 80]}
                    imageUrl={user.picture}
                    isEditable={true}
                  />
                  <Stack>
                    <Typography fontSize={20} fontWeight={700} color="white">
                      {user.name}
                    </Typography>
                    <Typography fontSize={14} color={"white"}>
                      {user.email}
                    </Typography>
                    <Stack direction={"row"}>
                      {user.linkedAccounts.map((acc) => acc.type)}
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
                    sx={{ mt: 2 }}
                  >
                    Appreciate
                  </Button>
                )}
              </Stack>
              <Stack direction="row" alignItems="center" gap={2} mt={1}>
                {isCurrent && (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    width="50%"
                    border={3}
                    borderColor="#0058A9"
                    borderRadius={3}
                    p={0.5}
                  >
                    <Typography fontSize={36} fontWeight={600} color="#0058A9">
                      {user.physicalPoints}
                    </Typography>
                    <Typography fontSize={14} fontWeight={500} color="#0058A9">
                      My wallet
                    </Typography>
                  </Stack>
                )}

                <Stack
                  alignItems="center"
                  justifyContent="center"
                  width="50%"
                  border={3}
                  borderColor="#0058A9"
                  bgcolor="#0058A9"
                  borderRadius={3}
                  p={0.5}
                >
                  <Typography fontSize={36} fontWeight={600} color="white">
                    {user.generalRating}
                  </Typography>
                  <Typography fontSize={14} fontWeight={500} color="white">
                    General score
                  </Typography>
                </Stack>
              </Stack>

              {!isCurrent && user.bio.length > 0 && (
                <Stack mt={1} gap={0.5}>
                  <Typography fontSize={14} color="#9C9C9C" fontWeight={500}>
                    About me
                  </Typography>
                  <Typography fontSize={14} color="info.main">
                    {user.bio}
                  </Typography>
                </Stack>
              )}

              {user.topHashtags.length === 0 &&
              user.topHashtags.length === 0 ? (
                <Typography
                  fontSize={20}
                  color="#8B8B8B"
                  mt={5}
                  textAlign="center"
                >
                  No area and hashtag found to be displayed.
                </Typography>
              ) : (
                <>
                  {user.topShades.length > 0 && (
                    <>
                      <Typography
                        fontSize={14}
                        color="#9C9C9C"
                        fontWeight={500}
                        mt={1}
                      >
                        Areas
                      </Typography>
                      <Stack flexWrap="wrap" gap={1} direction="row">
                        {user.topShades.map((shade) => (
                          <ChipComponent
                            key={shade._id}
                            color={shade.shadeInfo.color}
                          >
                            <Typography
                              fontSize={16}
                              fontWeight={500}
                              color={shade.shadeInfo.color}
                            >
                              {`${shade.shade} ${shade.points}`}
                            </Typography>
                          </ChipComponent>
                        ))}
                      </Stack>
                    </>
                  )}

                  {user.topHashtags.length > 0 && (
                    <>
                      <Typography
                        fontSize={14}
                        color="#9C9C9C"
                        fontWeight={500}
                        mt={1}
                      >
                        Hashtags
                      </Typography>
                      <Stack flexWrap="wrap" gap={1} direction="row">
                        {user.topHashtags.map(
                          (hashtag, i) =>
                            hashtag.hashtag && (
                              <ChipComponent
                                key={hashtag.hashtag + i + hashtag.count}
                              >
                                <Typography
                                  fontSize={16}
                                  fontWeight={500}
                                  color="info.main"
                                >
                                  #{hashtag.hashtag}
                                </Typography>
                              </ChipComponent>
                            )
                        )}
                      </Stack>
                    </>
                  )}
                </>
              )}
            </Stack>
          );
        })
        .run()}
    </>
  );
};

export default UserDetailsPage;
