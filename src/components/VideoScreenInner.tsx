import { Box, Button, Flex } from "@mantine/core";
import { useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import ReactPlayer from "react-player";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {id: string};

export default function VideoScreenInner({id}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const playerRef = useRef<any>(null);

  return (
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
          youtube: {
            playerVars: { autoplay: 1, modestbranding: 1 },
            // If video fails to play with sound, set mute and start again.
            onUnstarted: () => {
              playerRef?.current?.player.player.player.mute();
              playerRef?.current?.player.player.player.playVideo();
            },
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
  );
}
