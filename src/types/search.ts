import { GetHome, GetHomeTypeResponse } from "./home";

export type GetSearch = GetHome & {
  query: string;
};

export type GetSearchTypeResponse = GetHomeTypeResponse & {
  query: string;
};

export type GetSearchType = GetSearchTypeResponse & {
  tokens: string[];
};
