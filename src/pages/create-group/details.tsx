import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ControlledTextArea } from "src/components/form/controlled/controlled-text-area";
import { ControlledTextField } from "src/components/form/controlled/controlled-text-field";
import PfpComponent from "src/components/pfp-component";
import VisibilityStatus from "src/components/visibility-status";
import { useCreateGroupContext } from "src/providers/create-group-provider";

const NewGroupDetails = () => {
  const { control, setValue, watch } = useCreateGroupContext();

  const coverFile = watch("cover");
  const coverUrl = coverFile ? URL.createObjectURL(coverFile) : "";

  return (
    <Stack
      width={"100%"}
      textAlign={"start"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        zIndex={1}
        bgcolor="#222222"
        height={150}
        sx={{
          backgroundImage: `url(${coverUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <IconButton
          color="primary"
          component="label"
          sx={{
            position: "absolute",
            bottom: 2,
            right: 2,
            backgroundColor: "white",
            boxShadow: "0px 5px 7.8px 0px #00000040",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => {
              const file = event.target.files![0];
              if (file) {
                setValue("cover", file);
              }
            }}
          />
          <CameraAltIcon fontSize="small" sx={{ color: "black" }} />
        </IconButton>
      </Box>
      <Box zIndex={2} mt={12}>
        <PfpComponent onChange={(file) => setValue("image", file)} isEditable />
      </Box>
      <Stack marginTop={1} paddingX={2}>
        <Typography width={"100%"}>Group Name</Typography>
        <ControlledTextField required fullWidth control={control} name="name" />
        <Typography width={"100%"}>Description</Typography>
        <ControlledTextArea
          required
          fullWidth
          rows={4}
          multiline
          control={control}
          name="description"
        />
        <Typography width={"100%"}>Group Status</Typography>
        <VisibilityStatus
          name="privacy"
          control={control}
          labels={[
            "Anyone can join this group",
            "Only visible to those you share with",
          ]}
        />
      </Stack>
    </Stack>
  );
};

export default NewGroupDetails;
