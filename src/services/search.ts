import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Video from "../models/video";
import { searchBarUrl, serverUrl } from "../utils/env";
// import type { Search } from './types'

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: searchBarUrl }),
  tagTypes: ["Search"],
  endpoints: (build) => ({
    getSearchAutocomplete: build.query<string[], string>({
      query: (name) => serverUrl + "main/fetchAutoSearch?q=" + name,
      transformResponse: (response: { data: string[] }, meta, arg) => response.data,
    }),
    getSearch: build.query<Video[], string>({
      query: (name) => serverUrl + "main/fetchSearch?q=" + name,
    }),
  }),
});

export const { useGetSearchAutocompleteQuery, useGetSearchQuery } = searchApi;
