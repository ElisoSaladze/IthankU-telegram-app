import { Box, Stack, Typography } from "@mui/material";

import { useForm } from "react-hook-form";
import { AppreciateUserInput } from "src/api/appreciate/types";
import AreaSelect from "src/components/appreciate-components/select-area";
import HashtagSelect from "src/components/appreciate-components/select-hashtag";
import { ControlledTextArea } from "src/components/form/controlled/controlled-text-area";

const AppreciatePage = () => {
  const { control, setValue } = useForm<AppreciateUserInput>({
    defaultValues: {
      _id: "",
    },
  });

  return (
    <Stack gap={2} paddingX={2}>
      <AreaSelect
        onSelect={(shade) =>
          shade ? setValue("hashtag", shade._id) : setValue("shade", "")
        }
      />
      <HashtagSelect
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
          rows={8}
          multiline
          control={control}
          name="comment"
        />
      </Box>
    </Stack>
  );
};

export default AppreciatePage;
