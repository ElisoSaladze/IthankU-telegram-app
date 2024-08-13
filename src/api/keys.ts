export const keys = {
  users: {
    list: () => null,
    details: (id: string) => [id],
  },
  reissueToken: {
    token: () => ['reissue-token'],
  },
}
