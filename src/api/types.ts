export type ApiResponse<T, M = undefined> = {
  success: boolean;
  data: T;
  meta?: M;
};

export type Meta = {
  currentPage: number;
  totalPages: number;
  totalDocs: number;
};
