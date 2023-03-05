import { Box, Button, Flex, Loader, ScrollArea, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";
import { fetchVideos } from "../utils/API";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Navbar from "./navbar/Navbar";
import Drawer from "./drawer/Drawer";
import MiniDrawer from "./drawer/MiniDrawer";
import GridItem from "./GridItem";
import { useGetHomeQuery } from "../services/home";
import { mdMin, smMin, xsMin } from "../utils/breakpoints";
import GridItemSkeleton from "./GridItemSkeleton";
import GridContinuation from "./GridContinuation";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  isOpen: boolean;
};

export default function Home({ isOpen }: Props): JSX.Element {
  const xlMin = isOpen ? 2303 : 2135;
  const lgMin = isOpen ? 1968 : 1800;

  const dispatch = useAppDispatch();
  const xsMinMatch = useMediaQuery(`(min-width: ${xsMin}px)`);
  const smMinMatch = useMediaQuery(`(min-width: ${smMin}px)`);
  const mdMinMatch = useMediaQuery(`(min-width: ${mdMin}px)`);
  const lgMinMatch = useMediaQuery(`(min-width: ${lgMin}px)`);
  const xlMinMatch = useMediaQuery(`(min-width: ${xlMin}px)`);

  const {
    data: homeData,
    isLoading,
    isFetching,
    isError,
    //@ts-expect-error
  } = useGetHomeQuery(null);

  const homeHasData =
    homeData && homeData.content && homeData.content.content?.length > 0;

  const numBlocks = xlMinMatch
    ? 6
    : lgMinMatch
    ? 5
    : mdMinMatch
    ? 4
    : smMinMatch
    ? 3
    : xsMinMatch
    ? 2
    : 1;

  const remainder =
    homeHasData && xsMinMatch ? homeData.content.content.length % numBlocks : 0;

  const isInitialLoading = isLoading || isFetching;

  const initialData = isInitialLoading ? (
    <Loader />
  ) : isError ? (
    <Text>Error</Text>
  ) : (
    homeHasData &&
    homeData.content.content.map((video, index) => {
      if (
        remainder &&
        homeData.content.content.length - (index + 1) < remainder
      ) {
        console.log("aborted", index + 1);
      } else {
        return (
          <GridItem
            key={`${video.videoId}${index}`}
            isOpen={isOpen}
            dataLength={homeData.content.content.length}
            index={index}
            {...video}
          />
        );
      }
    })
  );

  // const skeletonData = homeHasData ?  : null;

  return (
    <Flex
      w="100%"
      h="fit-content"
      mt={24}
      // BackgroundColorHere
      // bg="pink"
      justify="center"
      sx={{
        overflowX: "visible",

        "@media (max-width: 600px)": {
          overflowX: "clip",
        },
      }}
    >
      <Flex
        // BackgroundColorHere
        // bg="red"
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
        {initialData}

        <GridContinuation isOpen={isOpen} numBlocks={numBlocks} />
      </Flex>
    </Flex>
  );
}
