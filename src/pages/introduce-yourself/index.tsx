import { Button, Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { paths } from "src/app/routes";
import { ControlledTextArea } from "src/components/form/controlled/controlled-text-area";
import { ControlledTextField } from "src/components/form/controlled/controlled-text-field";
import PfpComponent from "src/components/pfp-component";
import { useAuthContext } from "src/providers/auth";

const IntroduceYourself = () => {
  const { control, setValue, watch } = useAuthContext();
  const navigate = useNavigate();

  const picture = watch("picture");

  return (
    <Stack
      height="100vh"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
    >
      <Button
        onClick={() => navigate(paths.interests)}
        sx={{ alignSelf: "end" }}
        color="secondary"
      >
        skip
      </Button>
      <Stack alignItems="center" width={1}>
        <Typography fontSize={24} fontWeight={600}>
          Introduce Yourself
        </Typography>
        <Typography textAlign="center">
          Share a bit about who you are and what you love.
        </Typography>
        <PfpComponent
          isEditable
          imageUrl={picture !== "" ? picture : undefined}
          onChange={(newImageUrl) =>
            setValue("picture", URL.createObjectURL(newImageUrl))
          }
        />
      </Stack>
      <Stack width={1}>
        <Typography fontWeight={600} sx={{ alignSelf: "start" }}>
          Username
        </Typography>
        <ControlledTextField
          fullWidth
          control={control}
          name="name"
          placeholder="Enter your userName"
        />
      </Stack>
      <Stack width={1}>
        <Typography fontWeight={600} sx={{ alignSelf: "start" }}>
          About You
        </Typography>
        <ControlledTextArea
          fullWidth
          multiline
          rows={5}
          control={control}
          name="bio"
          placeholder="Tell others about yourself..."
        />
      </Stack>

      <Button
        size="large"
        onClick={() => navigate(paths.interests)}
        variant="contained"
        color="primary"
        fullWidth
      >
        Continue
      </Button>
    </Stack>
  );
};

export default IntroduceYourself;
