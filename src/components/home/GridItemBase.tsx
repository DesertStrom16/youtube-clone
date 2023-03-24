import {
  Box,
  Button,
  Flex,
  FlexProps,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { Video } from "../../types/video";
import { Link } from "react-router-dom";
import { areImagesDisabled } from "../../utils/env";
import GridItemTitle from "./GridItemTitle";
import GridItemChannel from "./GridItemChannel";
import { xsMin } from "../../utils/breakpoints";
import useIsTouchscreen from "../../hooks/use-is-touchscreen";
import { useAppDispatch } from "../../app/hooks";
import { setActiveVideo } from "../../store/dataSlice";
import { MouseEvent, useRef } from "react";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = Video & {
  wrapperProps?: FlexProps["sx"];
  viewCountWrapper?: FlexProps["sx"];
};

export default function GridItemBase({
  title,
  avatarUrl,
  channel,
  thumbnailUrl,
  uploadDate,
  videoId,
  viewCount,
  length,
  wrapperProps,
  viewCountWrapper,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const isTouchScreen = useIsTouchscreen();
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    const pos = ref.current?.getBoundingClientRect().y;

    dispatch(
      setActiveVideo({
        activeVideoId: videoId,
        openPosition: isTouchScreen ? pos : undefined,
      })
    );
  };

  const imgProps = isTouchScreen ? {} : { to: `/watch/${videoId}` };
  return (
    <Flex
      ref={ref}
      direction="column"
      h="fit-content"
      w="100%"
      mb={24}
      sx={{
        ...wrapperProps,
      }}
      onClick={isTouchScreen ? clickHandler : undefined}
    >
      <Box
        className="image-wrapper"
        sx={{
          borderRadius: 12,

          "@media (pointer: coarse)": {
            borderRadius: 0,
          },
          [`@media (min-width: ${xsMin}px)`]: {
            borderRadius: 12,
          },
        }}
      >
        <Box
          w="100%"
          h="100%"
          pos="absolute"
          top={0}
          bottom={0}
          left={0}
          sx={{ cursor: "pointer" }}
          //@ts-ignore
          component={isTouchScreen ? Box : Link}
          {...imgProps}
        >
          {!areImagesDisabled && (
            <img
              src={thumbnailUrl}
              width="100%"
              height="100%"
              style={{
                background: "transparent",
                objectFit: "cover",
                display: "inline-block",
                minWidth: "1px",
                minHeight: "1px",
              }}
            />
          )}
        </Box>
        {length.trim() !== "" && (
          <Box
            pos="absolute"
            bottom={0}
            right={0}
            m={4}
            p="3px 4px"
            bg="rgba(0,0,0,0.8)"
            sx={{
              borderRadius: 4,
              "@media (pointer: coarse)": {
                margin: 5,
                padding: "1px 4px",
              },
            }}
          >
            <Text
              fw={500}
              sx={{ fontSize: 12, letterSpacing: 0.35 }}
              color="#fff"
              lh="12px"
              mah={12}
            >
              {length}
            </Text>
          </Box>
        )}
      </Box>
      <Flex
        direction="row"
        sx={{
          margin: "0px 12px",
          cursor: "pointer",
          "@media (min-width: 392px)": {
            margin: 0,
          },

          "@media (pointer: coarse)": {
            marginLeft: 12,
          },
        }}
      >
        <Box
          h={36}
          component="a"
          href={""}
          mt={12}
          mr={12}
          display="inline-block"
          sx={{ cursor: "pointer" }}
        >
          <Box
            bg="rgba(0,0,0,0.1)"
            w={36}
            h={36}
            sx={{ overflow: "hidden", borderRadius: "50%" }}
          >
            <img src={avatarUrl} width={36} style={{ overflow: "clip" }} />
          </Box>
        </Box>

        <Flex direction="column" pr={24} sx={{ overflowX: "hidden" }}>
          <GridItemTitle title={title} />
          <GridItemChannel channel={channel} />
          <Flex
            sx={{
              maxHeight: 36,
              ...viewCountWrapper,
            }}
          >
            <Text
              lh="20px"
              mah={40}
              lineClamp={2}
              maw="100%"
              display="flex"
              sx={{ flexWrap: "wrap" }}
            >
              <Text
                component="span"
                display="inline-block"
                color="#aaa"
                fw={400}
                sx={{
                  fontSize: 14,
                  lineHeight: "18px",
                }}
              >
                {viewCount}
              </Text>
              <Text
                component="span"
                display="inline-block"
                className={
                  !uploadDate ||
                  !viewCount ||
                  uploadDate === "" ||
                  viewCount === ""
                    ? undefined
                    : "dateWrapper"
                }
                color="#aaa"
                fw={400}
                sx={{
                  fontSize: 14,
                  lineHeight: "18px",
                }}
              >
                {uploadDate}
              </Text>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
