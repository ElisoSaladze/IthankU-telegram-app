import { createRoute } from './create-route';
import { paths } from './paths';

export const authRoutes = [
  createRoute({
    path: paths.joinGroup,
    factory: () => import('src/pages/join-group/index'),
    title: 'Join Group',
  }),
  createRoute({
    path: paths.createPost,
    factory: () => import('src/pages/create-post/index'),
    title: 'Create Post',
  }),
  createRoute({
    path: paths.post,
    factory: () => import('src/pages/postPage/index'),
    title: 'Post Details',
  }),
  createRoute({
    path: paths.privatePost,
    factory: () => import('src/pages/postPage/index'),
    title: 'Private Post',
  }),
  createRoute({
    path: paths.invitationQR,
    factory: () => import('src/pages/group-details/invitation-qr'),
    title: 'QR Invitatrion',
  }),
  createRoute({
    path: paths.inviteUser,
    factory: () => import('src/pages/group-details/invite-users'),
    title: 'Invite User',
  }),
  createRoute({
    path: paths.groupDetails,
    factory: () => import('src/pages/group-details/index'),
    title: 'Group Details',
  }),
  createRoute({
    path: paths.createGroup,
    factory: () => import('src/pages/create-group/index'),
    title: 'Create Group',
  }),
  createRoute({
    path: paths.createGroupDetails,
    factory: () => import('src/pages/create-group/details'),
    title: 'Group Details',
  }),
  createRoute({
    path: paths.createGroupInterests,
    factory: () => import('src/pages/create-group/interests'),
    title: 'Group Interests',
  }),
  createRoute({
    path: paths.createGroupFinal,
    factory: () => import('src/pages/create-group/finish'),
    title: 'Group Final',
  }),
  createRoute({
    path: paths.thankYou,
    factory: () => import('src/pages/appreciate/thanku'),
    title: 'Thank You',
  }),
  createRoute({
    path: paths.phoneNumberAppreciate,
    factory: () => import('src/pages/appreciate/phone-number'),
    title: 'Appreciate',
  }),
  createRoute({
    path: paths.scanQRCode,
    factory: () => import('src/pages/appreciate/scanner'),
    title: 'Scan QR Code',
  }),
  createRoute({
    path: paths.appreciate,
    factory: () => import('src/pages/appreciate/index'),
    title: 'Appreciate',
  }),
  createRoute({
    path: paths.getAppreciate,
    factory: () => import('src/pages/get-appreciate/index'),
    title: 'Get Appreciate',
  }),
  createRoute({
    path: paths.qrOptions,
    factory: () => import('src/pages/get-appreciate/qr-options'),
    title: 'QR Options',
  }),
  createRoute({
    path: paths.transactions,
    factory: () => import('src/pages/transaction-details/index'),
    title: 'Transactions',
  }),
  createRoute({
    path: paths.userDetails,
    factory: () => import('src/pages/user-details'),
    title: 'User Details',
  }),
  createRoute({
    path: paths.userLocation,
    factory: () => import('src/pages/user-details/location'),
    title: 'User Locations',
  }),
  createRoute({
    path: paths.home,
    factory: () => import('src/pages/home/index'),
    title: 'Home',
  }),
  createRoute({
    path: paths.groups,
    factory: () => import('src/pages/groups/index'),
    title: 'Groups',
  }),
  createRoute({
    path: paths.groupSettings,
    factory: () => import('src/pages/groups/group-settings'),
    title: 'Group Settings',
  }),
  createRoute({
    path: paths.groupSettingsFollowings,
    factory: () => import('src/pages/groups/following'),
    title: 'Group Followings',
  }),
  createRoute({
    path: paths.groupSettingsInvitations,
    factory: () => import('src/pages/groups/invitations'),
    title: 'Group Invitations',
  }),
  createRoute({
    path: paths.map,
    factory: () => import('src/pages/map/index'),
    title: 'Map',
  }),
  createRoute({
    path: paths.more,
    factory: () => import('src/pages/more/index'),
    title: 'More',
  }),
  createRoute({
    path: paths.listing,
    factory: () => import('src/pages/listing/index'),
    title: 'Listing',
  }),
  createRoute({
    path: paths.groupsList,
    factory: () => import('src/pages/listing/groups'),
    title: 'Groups',
  }),
  createRoute({
    path: paths.usersList,
    factory: () => import('src/pages/listing/users'),
    title: 'Users',
  }),
  createRoute({
    path: paths.accounts,
    factory: () => import('src/pages/accounts/index'),
    title: 'Accounts',
  }),
  createRoute({
    path: paths.transactionsList,
    factory: () => import('src/pages/transactions/index'),
    title: 'Transactions',
  }),
  createRoute({
    path: paths.incomingTransactions,
    factory: () => import('src/pages/transactions/incoming'),
    title: 'Incoming Transactions',
  }),
  createRoute({
    path: paths.outgoingTransactions,
    factory: () => import('src/pages/transactions/outgoing'),
    title: 'Outgoing Transactions',
  }),
  createRoute({
    path: paths.language,
    factory: () => import('src/pages/language/index'),
    title: 'Language',
  }),
  createRoute({
    path: paths.pendingTransactions,
    factory: () => import('src/pages/pending-transactions/index'),
    title: 'Pending Transactions',
  }),
  createRoute({
    path: paths.incomingPendingTransactions,
    factory: () => import('src/pages/pending-transactions/incoming'),
    title: 'Incoming Pending Transactions',
  }),
  createRoute({
    path: paths.outgoingPendingTransactions,
    factory: () => import('src/pages/pending-transactions/outgoing'),
    title: 'Outgoing Pending Transactions',
  }),
];

export const unauthRoutes = [
  createRoute({
    path: paths.introduceYourself,
    factory: () => import('src/pages/introduce-yourself/index'),
    title: 'Introduce Yourself',
  }),
  createRoute({
    path: paths.interests,
    factory: () => import('src/pages/interests/index'),
    title: 'Interests',
  }),
  createRoute({
    path: paths.onboarding,
    factory: () => import('src/pages/onboarding'),
    title: 'Onboarding',
  }),
];

export const routes = [...authRoutes, ...unauthRoutes];
