import { Author } from "../post/types";
import { ApiResponse } from "../types";

export type Group = {
  _id: string;
  name: string;
  tags?: string[];
  groupImage?: string;
  shade: string;
  membersCount: number;
};

export type Invitation = {
  _id: string;
  group: Group;
  status: string;
  createdAt: string;
};

export type GroupDetails = {
  _id: string;
  name: string;
  description: string;
  tags?: string[];
  shade: string;
  groupPrivacy: "Public" | "Private";
  groupImage?: string;
  groupCover?: string;
  membersCount: number;
  isUserJoined: boolean;
  users?: Author[];
};
export type InviteCodeResponse = {
  data: {
    inviteCode: string;
  };
};

export type UserToInvite = {
  _id: string;
  name: string;
  picture: string;
};

export type InviteUser = {
  groupId: string;
  inviteeId: string;
};
export type GroupsResponse = ApiResponse<Group[]>;
export type InvitationsResponse = ApiResponse<Invitation[]>;
export type GroupDetailsResponse = ApiResponse<GroupDetails>;
export type UsersToInviteResponse = ApiResponse<UserToInvite[]>;
