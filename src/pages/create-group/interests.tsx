/* eslint-disable @typescript-eslint/no-explicit-any */
import DoneIcon from "@mui/icons-material/Done";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { getShades, Shade } from "src/api/shade";
import { ControlledTextField } from "src/components/form/controlled/controlled-text-field";
import Loader from "src/components/loader";
import ShadeComponent from "src/components/shade-component";
import TagItem from "src/components/tag";
import { useCreateGroupContext } from "src/providers/create-group-provider";

const NewGroupInterests = () => {
  const { control, watch, setValue } = useCreateGroupContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const [selectedShade, setSelectedShade] = useState("");

  const shades = useQuery({
    queryKey: ["shades"],
    queryFn: async () => getShades(),
  });

  const handleSelectShade = (shade: Shade) => {
    if (selectedShade === shade.en) {
      setSelectedShade("");
      setValue("shade", "");
      setValue("shadeColor", "");
    } else {
      setSelectedShade(shade.en);
      setValue("shade", shade.en);
      setValue("shadeColor", shade.color);
    }
  };

  return (
    <Stack marginTop={5} p={2} gap={1}>
      <Typography>Shade</Typography>
      {shades.isFetching ? (
        <Loader />
      ) : (
        <Stack gap={0.5} direction={"row"} flexWrap={"wrap"}>
          {shades.data?.data.map((shade: any) => (
            <ShadeComponent
              key={shade._id}
              selectable
              selected={selectedShade === shade.en}
              onSelect={() => handleSelectShade(shade)}
              color={shade.color}
              name={shade.en}
            />
          ))}
        </Stack>
      )}

      <Typography>Tags</Typography>
      <ControlledTextField
        InputProps={{
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
        name="currentTag"
        control={control}
      />
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
    </Stack>
  );
};

export default NewGroupInterests;
