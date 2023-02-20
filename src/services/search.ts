import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Socket } from "socket.io-client";
import Video from "../models/video";
import { socket } from "../socket";
import { searchBarUrl, serverUrl } from "../utils/env";
// import type { Search } from './types'

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
    getSearch: build.query<Video[], string>({
      query: (name) => serverUrl + "main/fetchSearch?q=" + name,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const listener = (res: any) => {
          console.log(res, "HERERER");

          // updateCachedData((draft) => {
          //   draft.push(data)
          // })
        };
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message

          socket.on("streamingTest", listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        socket.off("streamingTest", listener);
      },
    }),
  }),
});

export const { useGetSearchAutocompleteQuery, useGetSearchQuery } = searchApi;
