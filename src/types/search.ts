import { Video } from "./video";

export type GetSearch = {
  query: string;
  token: string;
  content: Video[];
};

export type GetSearchTypeResponse = {
  key: string;
  query: string;
  client: any;
  content: GetSearch[];
};

export type GetSearchType = GetSearchTypeResponse & {
  tokens: string[];
};
