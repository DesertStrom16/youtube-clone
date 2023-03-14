import { Box, Button, Flex, Loader, ScrollArea, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@mantine/hooks";
import GridItem from "./GridItem";
import { useGetHomeQuery } from "../services/home";
import { mdMin, smMin, xsMin } from "../utils/breakpoints";
import GridItemSkeleton from "./GridItemSkeleton";
import GridContinuation from "./GridContinuation";
import HomeLoadingSkeleton from "./HomeLoadingSkeleton";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  isOpen: boolean;
};

export default function Home({ isOpen }: Props): JSX.Element {
  const xlMin = isOpen ? 2303 : 2135;
  const lgMin = isOpen ? 1968 : 1800;

  const dispatch = useAppDispatch();
  const isTouchScreen = useMediaQuery("(pointer:coarse)");
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
  } = useGetHomeQuery("");

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
          justifyContent: "center",

          "@media (pointer:fine) or (pointer:none)": {
            maxWidth: "calc(320px + 16px)",
          },
          "@media (max-width: 600px) and ((pointer:fine) or (pointer:none))": {
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
        {isInitialLoading ? (
          <HomeLoadingSkeleton isOpen={isOpen} numBlocks={numBlocks} />
        ) : isError ? (
          <Flex w="100%" justify="center">
            <Text color="#FFFFFF" sx={{ fontSize: 16 }}>
              Error Occured
            </Text>
          </Flex>
        ) : (
          homeHasData &&
          homeData.content.content.map((video, index) => {
            if (
              remainder &&
              homeData.tokens.length === 1 &&
              homeData.content.content.length - (index + 1) < remainder
            ) {
              console.log("aborted Main Home", index + 1);
            } else {
              return (
                <GridItem
                  key={`${video.videoId}${index}`}
                  isOpen={isOpen}
                  {...video}
                />
              );
            }
          })
        )}
        {homeHasData &&
          !isInitialLoading &&
          !isError &&
          homeData?.tokens.map((item, index) => {
            return (
              <GridContinuation
                isOpen={isOpen}
                numBlocks={numBlocks}
                token={item}
                index={index}
                dataLength={homeData.tokens.length - 1}
                client={homeData.client}
                key={`${item}${index}`}
                requestKey={homeData.key}
                xsMinMatch={xsMinMatch}
                overallLength={homeData.overallLength}
              />
            );
          })}
      </Flex>

      {/* <Box h={2000}></Box> */}
    </Flex>
  );
}
