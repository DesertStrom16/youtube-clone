import { Box, Button, Flex, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useGetRecommendedQuery } from "../services/watch";
import VideoScreenItem from "./VideoScreenItem";
import { useEffect, useRef } from "react";

type Props = {};

export default function VideoScreen({}: Props): JSX.Element {
  const { id } = useParams();
  const playerRef = useRef<any>(null);

  // @ts-expect-error
  const { data, isLoading, isFetching, isError } = useGetRecommendedQuery(id, {
    skip: !id,
  });

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
      <Flex ml={24} pt={24} pr={24} sx={{ flexGrow: 1 }} direction="column">
        <Flex
          pos="relative"
          pt="56.25%"
          w="100%"
          bg="rgb(0,0,0)"
          mah={0}
          sx={{
            maxWidth: "calc((100vh - (56px + 24px + 36px)) * (16/9))",

            "@media (min-width: 1015px)": {
              minWidth: "calc(360px * (16 / 9))",
            },
            "@media (min-width: 1343px)": {
              minWidth: "calc(480px * (16 / 9))",
            },
          }}
        >
          <ReactPlayer
            width="100%"
            height="100%"
            ref={playerRef}
            controls={true}
            playing={true}
            config={{
              // @ts-expect-error
              youtube: {
                playerVars: { autoplay: 1 },
                // If video fails to play with sound, set mute and start again.
                onUnstarted: () => {
                  playerRef?.current?.player.player.player.mute();
                  playerRef?.current?.player.player.player.playVideo();
                }
              },
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            url={`https://www.youtube.com/watch?v=${id}`}
          />
        </Flex>
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
