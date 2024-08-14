import { Box, Button, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { Params, useLocation, useNavigate, useParams } from "react-router-dom";
import { appreciateUser, getAppreciateUser } from "src/api/appreciate/api";
import { AppreciateUserInput } from "src/api/appreciate/types";
import BackButtonAppBar from "src/components/appbar";
import AreaSelect from "src/components/appreciate-components/select-area";
import HashtagSelect from "src/components/appreciate-components/select-hashtag";
import { ControlledTextArea } from "src/components/form/controlled/controlled-text-area";

const AppreciatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { postAuthor } = location.state || {};
  console.log(postAuthor);
  const { appreciateId } = useParams<Params>();
  const { control, setValue, handleSubmit } = useForm<AppreciateUserInput>({
    defaultValues: {
      _id: postAuthor,
      postId: appreciateId,
    },
  });

  const { data: appreciateData } = useQuery({
    queryKey: ["appreciateData", appreciateId],
    queryFn: () => getAppreciateUser({ appreciateId: appreciateId as string }),
    enabled: !!appreciateId,
    onSuccess: (data) => {
      if (data?.data.area) setValue("shade", data.data.area);
      if (data?.data.hashtag) setValue("hashtag", data.data.hashtag);
    },
  });

  const mutation = useMutation(
    (data: AppreciateUserInput) => appreciateUser(data),
    {
      onSuccess: () => {
        navigate("/thank-you");
      },
      onError: (error) => {
        console.error("Failed to send appreciation", error);
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    return mutation.mutate(data);
  });

  return (
    <Stack marginTop={10}>
      <BackButtonAppBar pageName="" />
      <Stack gap={2} paddingX={2}>
        <AreaSelect
          defaultSelected={appreciateData?.data.area}
          onSelect={(shade) =>
            shade ? setValue("shade", shade._id) : setValue("shade", "")
          }
        />
        <HashtagSelect
          defaultSelected={appreciateData?.data.hashtag}
          onSelect={(hashtag) =>
            hashtag
              ? setValue("hashtag", hashtag.hashtag)
              : setValue("hashtag", "")
          }
        />
        <Box borderRadius={5} boxShadow={"0px 0px 8px -2px #00000040"} p={1.5}>
          <Stack marginBottom={1} alignItems={"center"} direction={"row"}>
            <Typography>Add comment</Typography>
            <Typography fontSize={10} color={"secondary"}>
              optional
            </Typography>
          </Stack>
          <ControlledTextArea
            fullWidth
            rows={6}
            multiline
            control={control}
            name="comment"
          />
        </Box>
        <Stack gap={2} direction={"row"}>
          <Button size="large" fullWidth variant="contained" color="secondary">
            Skip
          </Button>
          <Button onClick={onSubmit} size="large" fullWidth variant="contained">
            Next
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AppreciatePage;
