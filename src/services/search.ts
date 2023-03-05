import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setSearchPaginateError,
  setSearchPaginateLoading,
} from "../store/data/dataSlice";
import { serverUrl } from "../utils/env";
import type {
  GetSearch,
  GetSearchType,
  GetSearchTypeResponse,
} from "../types/search";

type SearchContinuation = {
  client: any;
  token: string;
  key: string;
  query: string;
};

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ["Search"],
  endpoints: (build) => ({
    getSearchAutocomplete: build.query<string[], string>({
      query: (name) => "main/fetchAutoSearch?q=" + name,
      transformResponse: (response: { data: string[] }, meta, arg) =>
        response.data,
    }),
    getSearch: build.query<GetSearchType, string>({
      query: (name) => "main/fetchSearch?q=" + name.replace(' ', '+'),
      transformResponse: (response: GetSearchTypeResponse) => {
        console.log("FIRING TRANSFORM NOW");
        return { ...response, tokens: [response.content.token] };
      },
    }),
    getSearchContinuation: build.query<GetSearch, SearchContinuation>({
      query: (body) => ({
        url: `main/postSearchContinuation`,
        method: "POST",
        body: body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data: continuationItem } = await queryFulfilled;

          const patchResult = dispatch(
            searchApi.util.updateQueryData(
              "getSearch",
              continuationItem.query,
              (draft) => {
                draft.tokens.push(continuationItem.token);
              }
            )
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetSearchAutocompleteQuery,
  useGetSearchQuery,
  useGetSearchContinuationQuery,
} = searchApi;
