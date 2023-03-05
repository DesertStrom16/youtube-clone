import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "../utils/env";
import { GetHomeType, GetHomeTypeResponse } from "../types/home";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ["Home"],
  endpoints: (build) => ({
    getHome: build.query<GetHomeType, string>({
      query: () => "home/fetchHome",
      transformResponse: (response: GetHomeTypeResponse) => {
        return { ...response, tokens: [response.content.token] };
      },
    }),
  }),
});

export const { useGetHomeQuery } = homeApi;
