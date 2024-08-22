import { buildRoute } from "src/app/lazy-routing/build-route";
import { paths } from "./paths";

export const routes = [
  buildRoute({
    path: paths.introduceYourself,
    factory: () => import("src/pages/introduce-yourself/index"),
    state: "unauthenticated",
  }),
  buildRoute({
    path: paths.interests,
    factory: () => import("src/pages/interests/index"),
    state: "unauthenticated",
  }),
  buildRoute({
    path: paths.onboarding,
    factory: () => import("src/pages/onboarding"),
    state: "unauthenticated",
  }),
  buildRoute({
    path: paths.joinGroup,
    factory: () => import("src/pages/join-group/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.createPost,
    factory: () => import("src/pages/create-post/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.post,
    factory: () => import("src/pages/postPage/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.privatePost,
    factory: () => import("src/pages/postPage/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.invitationQR,
    factory: () => import("src/pages/group-details/invitation-qr"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.inviteUser,
    factory: () => import("src/pages/group-details/invite-users"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.groupDetails,
    factory: () => import("src/pages/group-details/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.createGroup,
    factory: () => import("src/pages/create-group/index"),
    state: "authenticated",
    children: [
      {
        path: paths.createGroupDetails,
        factory: () => import("src/pages/create-group/details"),
        state: "authenticated",
      },
      {
        path: paths.createGroupInterests,
        factory: () => import("src/pages/create-group/interests"),
        state: "authenticated",
      },
      {
        path: paths.createGroupFinal,
        factory: () => import("src/pages/create-group/finish"),
        state: "authenticated",
      },
    ],
  }),
  buildRoute({
    path: paths.thankYou,
    factory: () => import("src/pages/appreciate/thanku"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.phoneNumberAppreciate,
    factory: () => import("src/pages/appreciate/phone-number"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.scanQRCode,
    factory: () => import("src/pages/appreciate/scanner"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.appreciate,
    factory: () => import("src/pages/appreciate/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.getAppreciate,
    factory: () => import("src/pages/get-appreciate/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.qrOptions,
    factory: () => import("src/pages/get-appreciate/qr-options"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.transactions,
    factory: () => import("src/pages/transaction-details/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.userDetails,
    factory: () => import("src/pages/user-details"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.userLocation,
    factory: () => import("src/pages/user-details/location"),
    state: "authenticated",
  }),
  buildRoute({
    path: paths.mainLayout,
    factory: () => import("src/pages/main-layout/index"),
    state: "authenticated",
    defaultNavigation: paths.home,
    children: [
      {
        path: paths.home,
        factory: () => import("src/pages/home/index"),
        state: "authenticated",
      },
      {
        path: paths.groups,
        factory: () => import("src/pages/groups/index"),
        state: "authenticated",
      },
      {
        path: paths.groupSettings,
        factory: () => import("src/pages/groups/group-settings"),
        state: "authenticated",
      },
      {
        path: paths.groupSettingsFollowings,
        factory: () => import("src/pages/groups/following"),
        state: "authenticated",
      },
      {
        path: paths.groupSettingsInvitations,
        factory: () => import("src/pages/groups/invitations"),
        state: "authenticated",
      },
      {
        path: paths.map,
        factory: () => import("src/pages/map/index"),
        state: "authenticated",
      },
      {
        path: paths.more,
        factory: () => import("src/pages/more/index"),
        state: "authenticated",
      },
      {
        path: paths.listing,
        factory: () => import("src/pages/listing/index"),
        state: "authenticated",
        children: [
          {
            path: paths.groupsList,
            factory: () => import("src/pages/listing/groups"),
            state: "authenticated",
          },
          {
            path: paths.usersList,
            factory: () => import("src/pages/listing/users"),
            state: "authenticated",
          },
        ],
      },
      {
        path: paths.accounts,
        factory: () => import("src/pages/accounts/index"),
        state: "authenticated",
      },
      {
        path: paths.transactionsList,
        factory: () => import("src/pages/transactions/index"),
        state: "authenticated",
        children: [
          {
            path: paths.incomingTransactions,
            factory: () => import("src/pages/transactions/incoming"),
            state: "authenticated",
          },
          {
            path: paths.outgoingTransactions,
            factory: () => import("src/pages/transactions/outgoing"),
            state: "authenticated",
          },
        ],
      },
      {
        path: paths.language,
        factory: () => import("src/pages/language/index"),
        state: "authenticated",
      },
      {
        path: paths.pendingTransactions,
        factory: () => import("src/pages/pending-transactions/index"),
        state: "authenticated",
        children: [
          {
            path: paths.incomingPendingTransactions,
            factory: () => import("src/pages/pending-transactions/incoming"),
            state: "authenticated",
          },
          {
            path: paths.outgoingPendingTransactions,
            factory: () => import("src/pages/pending-transactions/outgoing"),
            state: "authenticated",
          },
        ],
      },
    ],
  }),
];
