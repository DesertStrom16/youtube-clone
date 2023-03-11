import { Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import IconWrapper from "./IconWrapper";
import NavButton from "./navbar/NavButton";
import "./GridItem.css";
import { Link } from "react-router-dom";
import { Video } from "../types/video";
import { mdMin, smMin, xsMin } from "../utils/breakpoints";
import GridItemTitle from "./grid-item/GridItemTitle";
import GridItemChannel from "./grid-item/GridItemChannel";
import { areImagesDisabled } from "../utils/env";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = Video & {
  isOpen: boolean;
  dataLength: number;
  index: number;
};

export default function GridItem({
  isOpen,
  title,
  avatarUrl,
  channel,
  thumbnailUrl,
  uploadDate,
  videoId,
  viewCount,
  length,
  dataLength,
  index,
}: Props): JSX.Element {
  const xlMin = isOpen ? 2303 : 2135;
  const lgMin = isOpen ? 1968 : 1800;

  return (
    <Flex
      h="fit-content"
      w="calc(100% - 16px)"
      direction="column"
      maw={320}
      sx={{
        [`@media (min-width: ${xsMin}px)`]: {
          // 2
          width: "calc(50% - 16px)",
        },
        [`@media (min-width: ${smMin}px)`]: {
          // 3
          width: "calc((100% / 3) - 16px)",
        },
        [`@media (min-width: ${mdMin}px)`]: {
          // 4
          width: "calc(25% - 16px)",
        },
        [`@media (min-width: ${isOpen ? "calc(1463px + 168px)" : "1463px"})`]: {
          maxWidth: 360,
        },
        [`@media (min-width: ${lgMin}px)`]: {
          // 5
          width: "calc(20% - 16px)",
        },
        [`@media (min-width: ${xlMin}px)`]: {
          // 6
          width: "calc((100% / 6) - 16px)",
        },
      }}
      mb={40}
      mx={8}
    >
      <div className="image-wrapper">
        <Box
          component={Link}
          w="100%"
          h="100%"
          pos="absolute"
          top={0}
          bottom={0}
          left={0}
          to={`/watch/${videoId}`}
          sx={{ cursor: "pointer" }}
        >
          {!areImagesDisabled && <img
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
          />}
        </Box>
      </div>
      <Flex
        direction="row"
        sx={{
          margin: "0px 12px",
          cursor: "pointer",
          "@media (min-width: 392px)": {
            margin: 0,
          },
        }}
        // Redirect here
        onClick={() => {}}
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
          <GridItemChannel channel={channel} isOpen={isOpen} />
          <Flex
            sx={{
              maxHeight: 36,

              [`@media (min-width: ${
                isOpen ? "calc(1631px + 168px)" : "1631px"
              })`]: {
                maxHeight: 40,
              },
            }}
          >
            <Text lh='20px' mah={40} lineClamp={2} maw='100%' display='flex' sx={{flexWrap: 'wrap'}}>
              <Text
                component="span"
                display='inline-block'
                color="#aaa"
                fw={400}
                sx={{
                  fontSize: 14,
                  // fontSize: 12,
                  lineHeight: "18px",

                  // [`@media (min-width: ${
                  //   isOpen ? "calc(1631px + 168px)" : "1631px"
                  // })`]: {
                  //   fontSize: 14,
                  //   lineHeight: "20px",
                  // },
                }}
              >
                {viewCount}
              </Text>
              <Text
                component="span"
                display='inline-block'
                className={
                  !uploadDate ||
                  !viewCount ||
                  uploadDate === "" ||
                  viewCount === ""
                    ? undefined
                    : "dateWrapper"
                }
                // color="#606060"
                color="#aaa"
                fw={400}
                sx={{
                  fontSize: 14,
                  // fontSize: 12,
                  lineHeight: "18px",

                  // [`@media (min-width: ${
                  //   isOpen ? "calc(1631px + 168px)" : "1631px"
                  // })`]: {
                  //   fontSize: 14,
                  //   lineHeight: "20px",
                  // },
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
