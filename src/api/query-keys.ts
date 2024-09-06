import { buildModuleCacheKey } from 'src/lib/react-query-utils';
import { GetInvitationsInput, GetUserGroupsInput, GroupId, groupUserParams } from './groups';
import { GetPostDetailsInput } from './posts';
import { GetUserInput, GetUsersInput } from './users';
import { GetAppreciateUser, GetAppreciateUserInput } from './appreciate';
import { GetPendingTransactionsInput, GetTransactionDetailsInput, GetUserTransactionsInput } from './transactions';
import { RefreshTokenInput } from './auth';

/**
 * Same list can be displayed with the standard page pagination in one place (useQuery)
 * and with the infinite scroll pagination in another place (useInfiniteQuery)
 * We want to keep appropriate query cache entries for them separately
 * So we add { infinite: true } to the query key used with useInfiniteQuery
 */
export type InfiniteQueryKey = {
  infinite?: true;
};

/**
 * `qk` stands for "query keys"
 */
export const qk = buildModuleCacheKey({
  auth: {
    refresh: (input: RefreshTokenInput) => [input],
  },
  shades: null,
  groups: {
    list: null,
    details: (input: GroupId) => [input],
    posts: (input: GroupId) => [input],
    members: (input: groupUserParams) => [input],
    getUserGroups: (input: GetUserGroupsInput) => [input],
    getInvitations: (input: GetInvitationsInput) => [input],
    getInvitationCode: (input: GroupId) => [input],
    getUserToInvite: (input: GroupId) => [input],
  },
  posts: {
    list: null,
    details: (input: GetPostDetailsInput) => [input],
  },
  users: {
    me: null,
    list: (input: GetUsersInput) => [input],
    details: (input: GetUserInput) => [input],
    check: null,
  },
  appreciate: {
    getUser: (input: GetAppreciateUserInput) => [input],
    getQRCode: (input: GetAppreciateUser) => [input],
  },
  hashtags: null,
  transactions: {
    userTransactions: (input: GetUserTransactionsInput) => [input],
    details: (input: GetTransactionDetailsInput) => [input],
    pendingTransactions: (input: GetPendingTransactionsInput) => [input],
  },
  map: {
    list: (input: GetUsersInput) => [input],
  },
});
