import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Socket } from "socket.io-client";
import Video from "../models/video";
import { socket } from "../socket";
import {
  setSearchPaginateError,
  setSearchPaginateLoading,
} from "../store/data/dataSlice";
import { searchBarUrl, serverUrl } from "../utils/env";
// import type { Search } from './types'

type GetSearch = {
  token: string;
  content: Video[];
};

type GetSearchType = {
  client: any;
  key: string;
  content: GetSearch[];
};

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: searchBarUrl }),
  tagTypes: ["Search"],
  endpoints: (build) => ({
    getSearchAutocomplete: build.query<string[], string>({
      query: (name) => serverUrl + "main/fetchAutoSearch?q=" + name,
      transformResponse: (response: { data: string[] }, meta, arg) =>
        response.data,
    }),
    getSearch: build.query<GetSearchType, string>({
      query: (name) => serverUrl + "main/fetchSearch?q=" + name,
      // transformResponse: (response: GetSearch) => [response],
      async onCacheEntryAdded(
        arg,
        { dispatch, updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const listener = (data: GetSearch) => {
          console.log(data, "Paginate Socket Response");

          if (data.token && data.content && data.content.length > 0) {
            updateCachedData((draft) => {
              draft.content.push(data);
            });
          } else {
            dispatch(setSearchPaginateError(true));
          }

          dispatch(setSearchPaginateLoading(false));
        };

        const listenerError = (error: string) => {
          console.log("Paginate Socket Error", error);

          dispatch(setSearchPaginateLoading(false));
          dispatch(setSearchPaginateError(true));
        };

        try {
          await cacheDataLoaded;

          socket.on("paginateSearchReponse", listener);
          socket.on("paginateSearchError", listenerError);
        } catch {
          // no-op
        }
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        socket.off("paginateSearchReponse", listener);
        socket.off("paginateSearchError", listenerError);
      },
    }),
  }),
});

export const { useGetSearchAutocompleteQuery, useGetSearchQuery } = searchApi;
