export type AppreciateUserInput = {
  _id: string;
  postId?: string;
  shade?: string;
  hashtag?: string;
  comment?: string;
};

export type GetAppreciateUserInput = {
  area?: string;
  hashtag?: string;
};

export type GetAppreciateQRCode = {
  code: number;
  success: boolean;
  data: string;
};

export type AppreciateQRCode = {
  code: number;
  success: boolean;
  data: {
    code: string;
    area: string;
    hashtag: string;
    oneTimeUse: boolean;
    receiver: boolean;
  };
};
