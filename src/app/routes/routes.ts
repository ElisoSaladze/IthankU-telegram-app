import { createRoute } from './create-route';
import { paths } from './paths';

export const authRoutes = [
  createRoute({
    path: paths.joinSpace,
    factory: () => import('src/pages/join-space'),
    title: 'Join Space',
  }),
  createRoute({
    path: paths.post,
    factory: () => import('~/pages/post-details'),
    title: 'Post Details',
  }),
  createRoute({
    path: paths.privatePost,
    factory: () => import('src/pages/private-post'),
    title: 'Private Post',
  }),
  createRoute({
    path: paths.invitationQR,
    factory: () => import('src/pages/space-details/invite-with-qr'),
    title: 'QR Invitatrion',
  }),
  createRoute({
    path: paths.spaceDetails,
    factory: () => import('src/pages/space-details'),
    title: 'Space Details',
  }),
  createRoute({
    path: paths.createSpace,
    factory: () => import('src/pages/create-space'),
    title: 'Create Space',
    children: [
      createRoute({
        path: paths.createSpaceDetails,
        factory: () => import('src/pages/create-space/details'),
        title: 'Space Details',
      }),
      createRoute({
        path: paths.createSpaceInterests,
        factory: () => import('src/pages/create-space/interests'),
        title: 'Space Interests',
      }),
      createRoute({
        path: paths.createSpaceFinal,
        factory: () => import('src/pages/create-space/finish'),
        title: 'Space Final',
      }),
    ],
  }),
  createRoute({
    path: paths.appreciate,
    factory: () => import('src/pages/appreciate'),
    title: 'Appreciate',
  }),
  createRoute({
    path: paths.qrOptions,
    factory: () => import('src/pages/get-appreciate/qr-options'),
    title: 'QR Options',
  }),
  createRoute({
    path: paths.transactionDetails,
    factory: () => import('src/pages/transaction-details'),
    title: 'Transaction details',
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
    path: paths.spaces,
    factory: () => import('src/pages/spaces'),
    title: 'Spaces',
  }),
  createRoute({
    path: paths.spaceSettings,
    factory: () => import('src/pages/spaces/space-settings'),
    title: 'Space Settings',
  }),
  createRoute({
    path: paths.spaceSettingsFollowings,
    factory: () => import('src/pages/spaces/space-settings/following'),
    title: 'Space Followings',
  }),
  createRoute({
    path: paths.spaceSettingsInvitations,
    factory: () => import('src/pages/spaces/space-settings/invitations'),
    title: 'Space Invitations',
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
  createRoute({
    path: paths.interests,
    factory: () => import('src/pages/interests'),
    title: 'Interests',
  }),
];

export const unauthRoutes = [
  createRoute({
    path: paths.onboarding,
    factory: () => import('src/pages/onboarding'),
    title: 'Onboarding',
  }),
  createRoute({
    path: paths.introduceYourself,
    factory: () => import('src/pages/introduce-yourself'),
    title: 'Introduce Yourself',
  }),
];

export const routes = [...authRoutes, ...unauthRoutes];
