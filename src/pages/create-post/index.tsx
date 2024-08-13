/* eslint-disable @typescript-eslint/no-explicit-any */
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  ListItemButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import paid from "src/assets/images/paid.png";

import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Params, useNavigate, useParams } from "react-router-dom";
import { Visibility } from "src/api/post/types";
import { useAuthContext } from "src/providers/auth";
import { createPost } from "src/api/post";
import VisibilityStatus from "src/components/visibility-status";
import { ControlledTextField } from "src/components/form/controlled/controlled-text-field";
import { ControlledTextArea } from "src/components/form/controlled/controlled-text-area";
import PreviewImg from "src/components/preview-img";
import TagItem from "src/components/tag";
import ConfirmationDialog from "src/components/confirmation-diallog";
type Tag = {
  value: string;
};

type Files = {
  value: File;
};
type CreatePostFormData = {
  content: string;
  group: string | null;
  images: Files[];
  summary: string;
  tags: Tag[];
  visibility: Visibility;
  currentTag: string;
  preview?: string;
  files: Files[];
};
const defaultPostValue: CreatePostFormData = {
  content: "",
  group: null,
  images: [],
  summary: "",
  tags: [] as Tag[],
  visibility: Visibility.Public,
  currentTag: "#",
  preview: "",
  files: [],
};
const CreatePostPage = () => {
  const [error, setError] = useState<string | null>(null);
  const { groupId } = useParams<Params>();
  const maxFileSize = 25 * 1024 * 1024;
  const maxLength = 300;
  const navigate = useNavigate();
  const { userData } = useAuthContext();
  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      ...defaultPostValue,
      group: groupId!,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });
  const {
    fields: imgFields,
    append: imgAppend,
    remove: imgRemove,
  } = useFieldArray({
    control,
    name: "images",
  });

  const {
    fields: fileFields,
    append: fileAppend,
    remove: fileRemove,
  } = useFieldArray({
    control,
    name: "files",
  });

  const mutation = useMutation({
    mutationKey: ["new-post"],
    mutationFn: (data: CreatePostFormData) => {
      const formData = new FormData();
      formData.append("content", data.content);
      if (groupId) formData.append("group", groupId);
      formData.append("summary", data.summary);
      formData.append("visibility", data.visibility);
      for (const tag of data.tags) formData.append("tags", tag.value);
      for (const img of data.images) formData.append("images", img.value);
      for (const file of data.files) formData.append("files", file.value);
      if (data.preview!.trim().length > 0) {
        formData.append("preview", data.preview!);
      }
      return createPost(formData);
    },
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isImage: boolean
  ) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > maxFileSize) {
        setError("File size should not exceed 25MB.");
      } else {
        if (isImage) {
          fileRemove(0); // Remove any existing file
          imgRemove(0); // Remove any existing image/video
          imgAppend({ value: file }); // Append new image/video
        } else {
          imgRemove(0); // Remove any existing image/video
          fileRemove(0); // Remove any existing file
          fileAppend({ value: file }); // Append new file
        }
        setError(null); // Clear any previous errors
      }
    }
  };

  const handlePhotoVideoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange(event, true);
  };

  const handleAttachmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange(event, false);
  };
  const photoVideoInputRef = useRef<HTMLInputElement | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoVideoClick = () => {
    photoVideoInputRef.current?.click();
  };

  const handleAttachmentClick = () => {
    attachmentInputRef.current?.click();
  };
  return (
    <Stack>
      <AppBar>
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <CloseIcon />
          </IconButton>
          <Typography
            fontWeight={500}
            variant="h6"
            component="div"
            sx={{ textAlign: "center", color: "black", fontSize: 20 }}
          >
            Create Post
          </Typography>
          <Box width={40}></Box>
        </Toolbar>
      </AppBar>
      {userData.isFetched && (
        <Stack p={2} gap={1} alignItems={"center"} direction={"row"}>
          <Avatar
            src={userData.data?.user.picture}
            sx={{ width: 65, height: 65 }}
          />
          <Typography fontSize={20} fontWeight={600}>
            {userData.data?.user.name}
          </Typography>
        </Stack>
      )}

      <Stack width={"100%"} p={2} gap={2}>
        <VisibilityStatus
          name="visibility"
          control={control}
          labels={[
            "Fully visible to everyone.",
            "Preview only. 1 coin to unlock",
          ]}
        />
        <Stack
          sx={{
            border: "1px solid #ccc",
            borderRadius: 4,
            paddingTop: 1,
          }}
        >
          <Typography
            marginLeft={1.5}
            color={"primary.light"}
            fontSize={"small"}
          >
            Summary
          </Typography>
          <ControlledTextField
            required
            name="summary"
            control={control}
            rows={1}
            InputProps={{
              sx: {
                padding: 0,
                "& fieldset": {
                  border: "none", // Remove the border
                },
              },
            }}
          />
        </Stack>
        <Stack
          sx={{
            border: "1px solid #ccc",
            borderRadius: 7,
            padding: 2,
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography color={"primary.light"} fontSize={"small"}>
              Text
            </Typography>
            <Typography color={"red"} fontSize={"small"}>
              {maxLength - watch("content").length}
            </Typography>
          </Stack>
          <ControlledTextArea
            required
            name="content"
            control={control}
            rows={5}
            maxLength={maxLength}
            InputProps={{
              sx: {
                padding: 0,
                "& fieldset": {
                  border: "none", // Remove the border
                },
              },
            }}
            multiline
          />
          <Stack direction="row" spacing={1}>
            <input
              accept="image/*,video/*"
              type="file"
              id="photo-video-upload"
              style={{ display: "none" }}
              onChange={handlePhotoVideoChange}
              ref={photoVideoInputRef}
            />

            <input
              accept="*/*"
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              onChange={handleAttachmentChange}
              ref={attachmentInputRef}
            />
            <Button variant="outlined" onClick={handlePhotoVideoClick}>
              Photo/Video
            </Button>
            <Button variant="outlined" onClick={handleAttachmentClick}>
              Attachment
            </Button>
          </Stack>
        </Stack>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Stack spacing={0.5} direction={"row"}>
          {fileFields.length > 0 && (
            <ListItemButton
              onClick={() => {
                const fileURL = URL.createObjectURL(fileFields[0].value);
                window.open(fileURL, "_blank");
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <AttachmentOutlinedIcon />
                <Typography>{fileFields[0].value.name}</Typography>
                <IconButton onClick={() => fileRemove(0)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </ListItemButton>
          )}
        </Stack>
        <Stack spacing={0.5} direction={"row"}>
          {imgFields.length > 0 && (
            <PreviewImg
              remove={() => imgRemove(0)}
              image={imgFields[0].value}
            />
          )}
        </Stack>

        {watch("visibility") === "Private" && (
          <Stack
            sx={{
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: 2,
            }}
          >
            <Typography color={"primary.light"} fontSize={"small"}>
              Preview Text
            </Typography>
            <ControlledTextArea
              multiline
              rows={2}
              name="preview"
              control={control}
              InputProps={{
                sx: {
                  padding: 0,
                  "& fieldset": {
                    border: "none", // Remove the border
                  },
                },
              }}
            />
          </Stack>
        )}
        <Stack
          sx={{
            border: "1px solid #ccc",
            borderRadius: 4,
            paddingTop: 1,
          }}
        >
          <Typography
            marginLeft={1.5}
            color={"primary.light"}
            fontSize={"small"}
          >
            Tags
          </Typography>
          <ControlledTextField
            name="currentTag"
            control={control}
            InputProps={{
              sx: {
                padding: 0,
                paddingRight: 1.5,
                "& fieldset": {
                  border: "none", // Remove the border
                },
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      append({ value: watch("currentTag") });
                      setValue("currentTag", "#");
                    }}
                    edge="end"
                  >
                    <DoneIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack spacing={0.5} direction={"row"} flexWrap={"wrap"}>
          {fields.map((tag, index) => (
            <TagItem
              key={tag.id}
              clickable
              onClick={() => remove(index)}
              tag={tag.value}
            />
          ))}
        </Stack>
        {watch("visibility") === "Public" ? (
          <Button
            disabled={mutation.isLoading}
            onClick={onSubmit}
            size="large"
            variant="contained"
          >
            {mutation.isLoading ? <CircularProgress /> : "Post"}
          </Button>
        ) : (
          <ConfirmationDialog
            response={onSubmit}
            title=""
            confirmButtonText="Publish"
            description={
              <Stack gap={1} alignItems={"center"} textAlign={"center"}>
                <img width={120} src={paid} alt="paid" />
                <Typography fontSize={30} fontWeight={600}>
                  Ready to publish your paid post?
                </Typography>
                <Typography fontSize={"small"}>
                  Publishing a paid post requires{" "}
                  <Typography component={"span"} color={"primary"}>
                    one coin.
                  </Typography>{" "}
                  Please confirm your payment of one coin to proceed.
                </Typography>
              </Stack>
            }
          >
            {(showDialog) => (
              <Button onClick={showDialog} size="large" variant="contained">
                Post
              </Button>
            )}
          </ConfirmationDialog>
        )}
      </Stack>
    </Stack>
  );
};

export default CreatePostPage;
