import { buildRoute } from "src/app/lazy-routing/build-route";
export const routes = [
  buildRoute({
    path: "introduce-yourself",
    factory: () => import("src/pages/introduce-yourself/index"),
    state: "unauthenticated",
  }),
  buildRoute({
    path: "interests",
    factory: () => import("src/pages/interests/index"),
    state: "unauthenticated",
  }),
  buildRoute({
    path: "onboarding",
    factory: () => import("src/pages/onboarding/index"),
    state: "unauthenticated",
  }),
  buildRoute({
    path: "join-group",
    factory: () => import("src/pages/join-group/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: "create-post/:groupId?",
    factory: () => import("src/pages/create-post/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: "/post/:postId",
    factory: () => import("src/pages/postPage/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: "/private-post/:postId",
    factory: () => import("src/pages/postPage/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: "/group/:groupId",
    factory: () => import("src/pages/group-details/index"),
    state: "authenticated",
  }),
  buildRoute({
    path: "/create-group",
    factory: () => import("src/pages/create-group/index"),
    state: "authenticated",
    children: [
      {
        path: "details",
        factory: () => import("src/pages/create-group/details"),
        state: "authenticated",
      },
      {
        path: "group-interests",
        factory: () => import("src/pages/create-group/interests"),
        state: "authenticated",
      },
      {
        path: "final",
        factory: () => import("src/pages/create-group/finish"),
        state: "authenticated",
      },
    ],
  }),
  buildRoute({
    path: "/",
    factory: () => import("src/pages/main-layout/index"),
    state: "authenticated",
    defaultNavigation: "/home",
    children: [
      {
        path: "home",
        factory: () => import("src/pages/home/index"),
        state: "authenticated",
      },
      {
        path: "groups",
        factory: () => import("src/pages/groups/index"),
        state: "authenticated",
      },
      {
        path: "map",
        factory: () => import("src/pages/map/index"),
        state: "authenticated",
      },
      {
        path: "more",
        factory: () => import("src/pages/more/index"),
        state: "authenticated",
      },
      {
        path: "more/listing",
        factory: () => import("src/pages/listing/index"),
        state: "authenticated",
        children: [
          {
            path: "groups-list",
            factory: () => import("src/pages/listing/groups"),
            state: "authenticated",
          },
          {
            path: "users-list",
            factory: () => import("src/pages/listing/users"),
            state: "authenticated",
          },
        ],
      },
      {
        path: "more/accounts",
        factory: () => import("src/pages/accounts/index"),
        state: "authenticated",
      },
      {
        path: "more/transactions",
        factory: () => import("src/pages/transactions/index"),
        state: "authenticated",
      },
      {
        path: "more/language",
        factory: () => import("src/pages/language/index"),
        state: "authenticated",
      },
      {
        path: "more/details/:userId",
        factory: () => import("src/pages/current-user-details/index"),
        state: "authenticated",
      },
      {
        path: "more/pending-transactions",
        factory: () => import("src/pages/pending-transactions/index"),
        state: "authenticated",
      },
      {
        path: "appreciate",
        factory: () => import("src/pages/appreciate/index"),
        state: "authenticated",
      },
      {
        path: "get-appreciate",
        factory: () => import("src/pages/get-appreciate/index"),
        state: "authenticated",
      },
      {
        path: "get-appreciate/qr-options",
        factory: () => import("src/pages/get-appreciate/qr-options"),
        state: "authenticated",
      },
      {
        path: "scan-qr-code",
        factory: () => import("src/pages/appreciate/scanner"),
        state: "authenticated",
      },
    ],
  }),
];
