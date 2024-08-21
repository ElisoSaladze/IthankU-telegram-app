import { Avatar, ListItemButton, Stack, Typography } from "@mui/material";

import defaultImageUrl from "../../assets/images/itu-circle.png";

import { generatePath, useNavigate } from "react-router-dom";
import { Group } from "../../api/group/types";
import ShadeComponent from "../shade-component";
import TagItem from "../tag";
import { paths } from "src/app/routes";

type Props = {
  group: Group;
};

const GroupItem = ({ group }: Props) => {
  const navigate = useNavigate();
  const groupId = group._id;
  return (
    <ListItemButton
      sx={{
        width: "100%",
        borderRadius: 5,
        padding: 1,
        boxShadow: "0px 0px 8.2px -1px #00000026",
      }}
      onClick={() =>
        navigate({
          pathname: generatePath(paths.groupDetails, {
            groupId,
          }),
        })
      }
    >
      <Stack
        sx={{ width: "100%" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Stack gap={1} alignItems={"center"} direction={"row"}>
          <Avatar
            sx={{ width: 70, height: 70, borderRadius: 4 }}
            variant="rounded"
            src={group.groupImage || defaultImageUrl}
          />
          <Stack gap={0.5}>
            <Typography fontSize={15} fontWeight={600}>
              {group.name}
            </Typography>
            <ShadeComponent color="green" name={group.shade} />
            <Stack direction={"row"}>
              {group.tags?.map((tag, i) => (
                <TagItem key={i} tag={tag} />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Avatar sx={{ bgcolor: "black" }}>
          <Typography color="white">{group.membersCount}</Typography>
        </Avatar>
      </Stack>
    </ListItemButton>
  );
};

export default GroupItem;
