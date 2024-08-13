/* eslint-disable @typescript-eslint/no-explicit-any */
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import { Box, Stack, Typography } from "@mui/material";

import { Control } from "react-hook-form";
import { ControlledRadioGroup } from "src/components/form/controlled/controlled-radio-group";
import { Visibility } from "src/api/post/types";

type Props = {
  control: Control<any, any>;
  name: string;
  labels: [string, string];
};
const VisibilityStatus = ({ control, name, labels }: Props) => {
  return (
    <Box width={"100%"}>
      <ControlledRadioGroup
        fullWidth
        name={name}
        control={control}
        options={[
          {
            label: (
              <Stack gap={1} alignItems={"center"} direction={"row"}>
                <Box borderRadius={1.5} p={1} bgcolor={"secondary.main"}>
                  <PublicIcon />
                </Box>
                <Stack>
                  <Typography fontWeight={600}>Public</Typography>
                  <Typography fontSize={"small"}>{labels[0]}</Typography>
                </Stack>
              </Stack>
            ),
            value: Visibility.Public,
          },
          {
            label: (
              <Stack gap={1} alignItems={"center"} direction={"row"}>
                <Box borderRadius={1.5} p={1} bgcolor={"secondary.main"}>
                  <LockIcon />
                </Box>
                <Stack>
                  <Typography fontWeight={600}>Private</Typography>
                  <Typography fontSize={"small"}>{labels[1]}</Typography>
                </Stack>
              </Stack>
            ),
            value: Visibility.Private,
          },
        ]}
      />
    </Box>
  );
};

export default VisibilityStatus;
