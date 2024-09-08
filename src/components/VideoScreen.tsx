import { Box, Button, Flex, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { areImagesDisabled } from "../utils/env";
import { useGetRecommendedQuery } from "../services/watch";
import VideoScreenItem from "./VideoScreenItem";
import React, { Fragment, useEffect, useRef } from "react";
import useIsMobileDevice from "../hooks/use-is-mobile-device";
import ChannelAndSubComp from "./video-screen/ChannelAndSubComp";
import VideoPlayer from "./video-screen/VideoPlayer";

type Props = {};

export default function VideoScreen({}: Props): JSX.Element {
  const { id } = useParams();
  const isMobileDevice = useIsMobileDevice();

  // @ts-expect-error
  const { data, isLoading, isFetching, isError, isSuccess } = useGetRecommendedQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    window.addEventListener("resize", reportWindowSize);

    return () => {
      window.removeEventListener("resize", reportWindowSize);
    }
  }, [])

  const allDataLoaded =
    data?.channelCannonicalURL &&
    data?.channelThumbnail.length > 0 &&
    data?.channelTitle &&
    data?.channelSubCount;

    const reportWindowSize = (event: any) => {
      console.log(event.currentTarget.innerWidth + " x " + event.currentTarget.innerHeight)
    }

  return (
    <Flex
      w="100%"
      sx={{
        flexDirection: "column",
        maxWidth: "calc(1280px + 402px + (3 * 24px))",

        "@media (min-width: 1015px)": {
          flexDirection: "row",
        },
      }}
    >
      <Flex style={isMobileDevice ? {padding: 0} : {padding: '24px 24px 0'}} sx={{ flexGrow: 1 }} direction="column">
        <Flex
          pos="relative"
          pt="56.25%"
          w="100%"
          bg="rgb(0,0,0)"
          mah={0}
          sx={{
            // TODO
            // These max widths need to be rechecked. They may not be needed/can be done better.
            maxWidth: "calc((100vh - (56px + 24px + 36px)) * (16/9))",

            "@media (min-width: 1015px)": {
              minWidth: "calc(360px * (16 / 9))",
            },
            "@media (min-width: 1343px)": {
              minWidth: "calc(480px * (16 / 9))",
            },
          }}
        >
          <VideoPlayer />
        </Flex>

        {/* Mobile/touchscreen only for now. Desktop/cursor is purely title. */}
        {isMobileDevice ? (
          <Flex direction='column' px={16} style={allDataLoaded ? {} : {display: 'none'}}>
            {/* Video Title */}
            <Flex mt={12} mb={3} style={{flexDirection: 'column'}}>
              <Text
                lh="26px"
                color="rgb(241,241,241)"
                fw={500}
                sx={{
                  fontSize: 18,
                  // fontFamily: "Youtube Sans",
                  wordBreak: "break-word",
                }}
              >
                {data?.watchTitle}
              </Text>
              <Text
                lh="16px"
                color="rgb(170,170,170)"
                style={{
                  fontSize: 12,
                }}
              >
                {data?.videoViewCount}{" · "}{data?.videoDateText}
              </Text>
            </Flex>

            {/* Channel Avatar, Name, Sub Count, and Subscribe Button Container */}
            <ChannelAndSubComp />
          </Flex>
        ) : (
          <Flex mt={12}>
            <Text
              lh="28px"
              color="rgb(241,241,241)"
              fw={600}
              sx={{
                fontSize: 20,
                fontFamily: "Youtube Sans",
                wordBreak: "break-word",
              }}
            >
              {data?.watchTitle}
            </Text>
          </Flex>
        )}
      </Flex>

      <Box
        sx={{
          paddingRight: 24,
          marginLeft: 24,
          paddingTop: 48,

          "@media (min-width: 1015px)": {
            minWidth: 300,
            maxWidth: 402,
            width: "100%",
            paddingTop: 24,
            paddingRight: 24,
            marginLeft: 0,
            // overflow: 'hidden'
          },
        }}
      >
        {data && data.content.content.length > 0
          ? data.content.content.map((item, index) => (
              <VideoScreenItem key={`${item.videoId}${index}`} {...item} />
            ))
          : null}
      </Box>
    </Flex>
  );
}
