import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "../utils/env";
import type {
  GetSearch,
  GetSearchType,
  GetSearchTypeResponse,
  SearchContinuation,
} from "../types/search";

export const channelApi = createApi({
  reducerPath: "channelApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ["Channel"],
  endpoints: (build) => ({
    getChannel: build.query<GetSearchType, string>({
      query: (name) => "channel/fetchChannel?q=" + name,
      transformResponse: (response: GetSearchTypeResponse) => {
        return { ...response, tokens: [response.content.token] };
      },
    }),
    // getSearchContinuation: build.query<GetSearch, SearchContinuation>({
    //   query: (body) => ({
    //     url: `main/postSearchContinuation`,
    //     method: "POST",
    //     body: body,
    //   }),
    //   async onQueryStarted(body, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data: continuationItem } = await queryFulfilled;

    //       const patchResult = dispatch(
    //         searchApi.util.updateQueryData(
    //           "getSearch",
    //           continuationItem.query,
    //           (draft) => {
    //             draft.tokens.push(continuationItem.token);
    //           }
    //         )
    //       );
    //     } catch {}
    //   },
    // }),
  }),
});

export const {
    useGetChannelQuery,
//   useGetSearchAutocompleteQuery,
//   useGetSearchQuery,
//   useGetSearchContinuationQuery,
} = channelApi;
