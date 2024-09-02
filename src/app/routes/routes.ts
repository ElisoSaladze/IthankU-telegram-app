import { createRoute } from './create-route';
import { paths } from './paths';

export const authRoutes = [
  createRoute({
    path: paths.joinGroup,
    factory: () => import('src/pages/join-group'),
    title: 'Join Group',
  }),
  createRoute({
    path: paths.post,
    factory: () => import('src/pages/postPage'),
    title: 'Post Details',
  }),
  createRoute({
    path: paths.privatePost,
    factory: () => import('src/pages/private-post'),
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
    factory: () => import('src/pages/group-details'),
    title: 'Group Details',
  }),
  createRoute({
    path: paths.createGroup,
    factory: () => import('src/pages/create-group'),
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
    factory: () => import('src/pages/appreciate'),
    title: 'Appreciate',
  }),
  createRoute({
    path: paths.getAppreciate,
    factory: () => import('src/pages/get-appreciate'),
    title: 'Get Appreciate',
  }),
  createRoute({
    path: paths.qrOptions,
    factory: () => import('src/pages/get-appreciate/qr-options'),
    title: 'QR Options',
  }),
  createRoute({
    path: paths.transactions,
    factory: () => import('src/pages/transaction-details'),
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
    factory: () => import('src/pages/home'),
    title: 'Home',
  }),
  createRoute({
    path: paths.groups,
    factory: () => import('src/pages/groups'),
    title: 'Groups',
  }),
  createRoute({
    path: paths.groupSettings,
    factory: () => import('src/pages/groups/group-settings'),
    title: 'Group Settings',
  }),
  createRoute({
    path: paths.groupSettingsFollowings,
    factory: () => import('src/pages/groups/group-settings/following'),
    title: 'Group Followings',
  }),
  createRoute({
    path: paths.groupSettingsInvitations,
    factory: () => import('src/pages/groups/group-settings/invitations'),
    title: 'Group Invitations',
  }),
  createRoute({
    path: paths.map,
    factory: () => import('src/pages/map'),
    title: 'Map',
  }),
  createRoute({
    path: paths.more,
    factory: () => import('src/pages/more'),
    title: 'More',
  }),
  createRoute({
    path: paths.listing,
    factory: () => import('src/pages/more/listing'),
    title: 'Listing',
  }),
  createRoute({
    path: paths.accounts,
    factory: () => import('src/pages/more/accounts'),
    title: 'Accounts',
  }),
  createRoute({
    path: paths.transactionsList,
    factory: () => import('src/pages/transactions'),
    title: 'Transactions',
  }),
  createRoute({
    path: paths.language,
    factory: () => import('src/pages/language'),
    title: 'Language',
  }),
  createRoute({
    path: paths.pendingTransactions,
    factory: () => import('src/pages/pending-transactions'),
    title: 'Pending Transactions',
  }),
];

export const unauthRoutes = [
  createRoute({
    path: paths.introduceYourself,
    factory: () => import('src/pages/introduce-yourself'),
    title: 'Introduce Yourself',
  }),
  createRoute({
    path: paths.interests,
    factory: () => import('src/pages/interests'),
    title: 'Interests',
  }),
  createRoute({
    path: paths.onboarding,
    factory: () => import('src/pages/onboarding'),
    title: 'Onboarding',
  }),
];

export const routes = [...authRoutes, ...unauthRoutes];
