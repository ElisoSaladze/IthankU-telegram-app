import { Button, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { telegramSignUp } from "src/api/auth/api";
import { TelegramSignUpRequestBody } from "src/api/auth/types";
import { Shade } from "src/api/shade";
import Loader from "src/components/loader";
import ShadeComponent from "src/components/shade-component";
import { useAuthContext } from "src/providers/auth";
import { useFetchItemsContext } from "src/providers/hashtag-shade";

const InterestsPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, authorize } = useAuthContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "interest",
  });

  const [selectedShades, setSelectedShades] = useState<string[]>([]);
  const { shades, shadesLoading } = useFetchItemsContext();

  const handleSelectShade = (shadeName: string) => {
    if (selectedShades.includes(shadeName)) {
      setSelectedShades((prev) => prev.filter((name) => name !== shadeName));
      const index = fields.findIndex((field) => field.value === shadeName);
      remove(index);
    } else {
      setSelectedShades((prev) => [...prev, shadeName]);
      append({ value: shadeName });
    }
  };

  const mutation = useMutation({
    mutationKey: ["newUser"],
    mutationFn: (data: TelegramSignUpRequestBody) => telegramSignUp(data),
    onSuccess: (data) => {
      authorize(data);
      navigate("/join-group");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({
      ...data,
      interest: data.interest.map((tag) => tag.value),
    });
  });

  return (
    <Stack
      spacing={2}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={2}
    >
      <Stack alignItems={"center"}>
        <Button onClick={onSubmit} sx={{ alignSelf: "end" }} color="secondary">
          Skip
        </Button>
        <Typography fontSize={24} fontWeight={600}>
          Choose your interest
        </Typography>
        <Typography textAlign={"center"}>
          Choose the area that excites you the most.
        </Typography>
        {shadesLoading ? (
          <Loader />
        ) : (
          <Stack gap={0.5} direction={"row"} flexWrap={"wrap"}>
            {shades?.data.map((shade: Shade) => (
              <ShadeComponent
                key={shade._id}
                selectable
                selected={selectedShades.includes(shade.en)}
                onSelect={() => handleSelectShade(shade.en)}
                color={shade.color}
                name={shade.en}
              />
            ))}
          </Stack>
        )}
      </Stack>

      <Button
        size="large"
        onClick={onSubmit}
        variant="contained"
        color="primary"
        fullWidth
      >
        Continue
      </Button>
    </Stack>
  );
};

export default InterestsPage;
