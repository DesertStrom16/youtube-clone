import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "../utils/env";
import { GetHomeType, GetHomeTypeResponse, HomeContinuation } from "../types/home";
import { GetHome } from "../types/home";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ["Home"],
  endpoints: (build) => ({
    getHome: build.query<GetHomeType, string>({
      query: () => "home/fetchHome",
      transformResponse: (response: GetHomeTypeResponse) => {
        return { ...response, tokens: [response.content.token], overallLength: response.content.content.length || 0, };
      },
    }),
    getHomeContinuation: build.query<GetHome, HomeContinuation>({
      query: (body) => ({
        url: `home/postHomeContinuation`,
        method: "POST",
        body: body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data: continuationItem } = await queryFulfilled;

          const patchResult = dispatch(
            homeApi.util.updateQueryData(
              "getHome",
              '',
              (draft) => {
                draft.tokens.push(continuationItem.token);
                draft.overallLength = draft.overallLength + continuationItem.content.length;
              }
            )
          );
        } catch {}
      },
    }),
  }),
});

export const { useGetHomeQuery, useGetHomeContinuationQuery } = homeApi;