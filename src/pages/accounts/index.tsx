import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useFieldArray } from "react-hook-form";

import { ControlledTextArea } from "src/components/form/controlled/controlled-text-area";
import { ControlledTextField } from "src/components/form/controlled/controlled-text-field";
import Loader from "src/components/loader";
import { useGetUserDetailsContext } from "src/providers/user-data";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { updateUserBio } from "src/api/auth/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userGroups } from "src/api/group";
import LikesItem from "src/components/likes";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const navigate = useNavigate();
  const { control, isLoading, isFetching, handleSubmit } =
    useGetUserDetailsContext();
  const { fields: socials } = useFieldArray({
    control,
    name: "linkedAccounts",
  });

  const { data, isLoading: groupsLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => userGroups(),
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentField, setCurrentField] = useState<string | null>(null);
  const [editableField, setEditableField] = useState<string | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    fieldName: string
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentField(fieldName);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (currentField) {
      setEditableField(currentField); // Set the field as editable
      setAnchorEl(null);
    }
  };

  const handleDelete = () => {
    // Handle delete logic here
    setAnchorEl(null);
  };
  const { mutate: changeBio } = useMutation({
    mutationFn: (bio: string) => updateUserBio({ bio }),
  });

  const handleBlur = handleSubmit((data) => {
    // This will trigger when the user unfocuses from the input field
    if (editableField) {
      // Handle saving data based on the current editable field
      if (editableField === "bio") {
        changeBio(data.bio);
      }
      // Add other cases here for phoneNumber, email, etc.

      // Reset editable field after saving
      setEditableField(null);
    }
  });

  if (isLoading || isFetching) return <Loader />;

  return (
    <Stack
      marginBottom={10}
      height={"100%"}
      gap={1}
      px={2}
      alignItems={"center"}
    >
      <Typography fontSize={24}>Accounts</Typography>

      <Typography fontSize={12} alignSelf={"flex-start"}>
        About me
      </Typography>
      <ControlledTextArea
        onBlur={handleBlur}
        disabled={editableField !== "bio"}
        fullWidth
        control={control}
        name="bio"
        multiline
        rows={2}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                edge="end"
                onClick={(event) => handleClick(event, "bio")}
              >
                <MoreVertIcon fontSize="small" color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography fontSize={12} alignSelf={"flex-start"}>
        Phone Numbers
      </Typography>
      <ControlledTextField
        disabled={editableField !== "phoneNumber"}
        fullWidth
        control={control}
        name="phoneNumber"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                edge="end"
                onClick={(event) => handleClick(event, "phoneNumber")}
              >
                <MoreVertIcon fontSize="small" color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography fontSize={12} alignSelf={"flex-start"}>
        Emails
      </Typography>
      <ControlledTextField
        disabled={editableField !== "email"}
        fullWidth
        control={control}
        name="email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                edge="end"
                onClick={(event) => handleClick(event, "email")}
              >
                <MoreVertIcon fontSize="small" color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography fontSize={12} alignSelf={"flex-start"}>
        Socials
      </Typography>
      <Stack width={"100%"} flexWrap={"wrap"} direction={"row"}>
        {socials.map((social) => (
          <Typography key={social.id}>{social.type}</Typography>
        ))}
        <IconButton
          sx={{
            boxShadow: "0px 0px 9.1px 1px #0000001F",
          }}
        >
          <AddIcon color="primary" />
        </IconButton>
      </Stack>

      <Typography fontSize={12} alignSelf={"flex-start"}>
        Groups
      </Typography>
      <Box
        sx={{
          width: "100%",
        }}
        onClick={() => navigate("/groups")}
      >
        <Stack
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
          direction={"row"}
        >
          {groupsLoading ? (
            <Typography>...</Typography>
          ) : (
            <LikesItem
              size="medium"
              likes={data!.data
                .map((data) => ({
                  _id: data._id,
                  picture: data.groupImage,
                  name: data.name,
                }))
                .slice(0, 5)}
            />
          )}
          <ArrowForwardIosIcon />
        </Stack>
      </Box>

      <Menu
        sx={{
          "& .MuiPaper-root": {
            border: "none", // Removes the border
            boxShadow: "0px 2px 8.8px -2px #00000030",
            borderRadius: 2,
          },
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          sx={{
            minHeight: "30px",
            padding: "5px 16px",
          }}
          onClick={handleEdit}
        >
          Edit
        </MenuItem>
        <Divider
          sx={{
            "&.MuiDivider-root": {
              margin: "0 !important",
            },
          }}
        />
        <MenuItem
          sx={{
            minHeight: "30px",
            padding: "5px 16px",
          }}
          onClick={handleDelete}
        >
          Delete
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default Accounts;
