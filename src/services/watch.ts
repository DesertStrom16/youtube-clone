import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "../utils/env";
import type {
  GetSearch,
  GetSearchType,
  GetSearchTypeResponse,
  SearchContinuation,
} from "../types/search";

export const watchApi = createApi({
  reducerPath: "watchApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ["Watch"],
  endpoints: (build) => ({
    getRecommended: build.query<any, string>({
      query: (videoId) => "watch/fetchRecommended?v=" + videoId,
      //   transformResponse: (response: GetSearchTypeResponse) => {
      //     return { ...response, tokens: [response.content.token] };
      //   },
    }),
  }),
});

export const { useGetRecommendedQuery } = watchApi;
