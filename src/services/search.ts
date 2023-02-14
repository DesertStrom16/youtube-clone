import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { searchBarUrl, serverUrl } from "../utils/env";
// import type { Search } from './types'

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: searchBarUrl }),
  tagTypes: ["Search"],
  endpoints: (build) => ({
    getSearchAutocomplete: build.query<any, string>({
      query: (name) => serverUrl + "main/fetchAutoSearch?q=" + name,
    }),
    getSearch: build.query<any, string>({
      query: (name) => serverUrl + "main/fetchSearch?q=" + name,
    }),
  }),
});

export const { useGetSearchAutocompleteQuery, useGetSearchQuery } = searchApi;
