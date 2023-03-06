import { Video } from "./video";

export type GetHome = {
  token: string;
  content: Video[];
};

export type GetHomeTypeResponse = {
  key: string;
  client: any;
  content: GetHome;
};

export type GetHomeType = GetHomeTypeResponse & {
  tokens: string[];
};

export type HomeContinuation = {
  client: any;
  token: string;
  key: string;
};
