export type AppreciateUserInput = {
  _id: string
  shade?: string
  hashtag?: string
  comment?: string
}

export type GetAppreciateUserInput = {
  appreciateId: string
}

export type AppreciateQRCode = {
  code: number
  success: boolean
  data: {
    code: string
    area: string
    hashtag: string
    oneTimeUse: boolean
    receiver: boolean
  }
}
