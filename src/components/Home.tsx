import { Box, Button, Flex, ScrollArea, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";
import { fetchVideos } from "../utils/API";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import MiniDrawer from "./MiniDrawer";
import GridItem from "./GridItem";
import {
  useGetSearchAutocompleteQuery,
  useGetSearchQuery,
} from "../services/search";

// type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  isOpen: boolean;
};

export default function Home({ isOpen }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.data.videos);
  const loading = useAppSelector((state) => state.data.loading);
  // const {
  //   data: autoSearchData,
  //   isFetching,
  //   isLoading,
  // } = useGetSearchAutocompleteQuery("racecar");
  const { data: searchData } = useGetSearchQuery("racecar");

  if (searchData) {
    console.log(searchData);
  }

  useEffect(() => {
    fetchVideosHandler();
  }, []);

  const fetchVideosHandler = async () => {
    dispatch(setLoading(true));

    try {
      let videos = await fetchVideos();

      if (videos) {
        dispatch(setVideos(videos));
      }
    } catch (e) {
      dispatch(setLoading(false));
    }
  };

  return (
    <Flex
      w="100%"
      h="fit-content"
      mt={24}
      bg="pink"
      justify="center"
      sx={{
        overflowX: "visible",

        "@media (max-width: 600px)": {
          overflowX: "clip",
        },
      }}
    >
      <Flex
        bg="red"
        w="100%"
        h="fit-content"
        wrap="wrap"
        sx={{
          maxWidth: "calc(320px + 16px)",
          justifyContent: "center",

          "@media (max-width: 600px)": {
            // Removes side margins to fit more on small screens
            margin: "0 -8px",
            width: "calc(100% + 16px)",
          },
          "@media (min-width: 601px)": {
            margin: "0px 16px",
          },
          "@media (min-width: 512px)": {
            maxWidth: "calc((320px + 16px) * 2)",
            justifyContent: "flex-start",
          },
          "@media (min-width: 887px)": {
            maxWidth: "calc((320px + 16px) * 3)",
          },
          "@media (min-width: 1143px)": {
            maxWidth: "calc((320px + 16px) * 4)",
          },
          [`@media (min-width: ${isOpen ? "calc(1463px + 168px)" : "1463px"})`]:
            {
              maxWidth: "calc((360px + 16px) * 4)",
            },
          [`@media (min-width: ${isOpen ? "1968px" : "1800px"})`]: {
            maxWidth: "calc((360px + 16px) * 5)",
          },
          [`@media (min-width: ${isOpen ? "2303px" : "2135px"})`]: {
            maxWidth: "calc((360px + 16px) * 6)",
          },
        }}
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          videos.map((video) => (
            <GridItem key={`${video.videoId}`} isOpen={isOpen} {...video} />
          ))
        )}
      </Flex>
    </Flex>
  );
}
