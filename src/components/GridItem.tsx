import { Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import IconWrapper from "./IconWrapper";
import NavButton from "./NavButton";
import "./GridItem.css";
import Video from "../models/video";
import { Link } from "react-router-dom";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = Video & {
  isOpen: boolean;
};

// Unsure on :active styling, may revert back to mantine
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
}: Props): JSX.Element {
  return (
    <Flex
      h="fit-content"
      w="calc(100% - 16px)"
      direction="column"
      maw={320}
      sx={{
        "@media (min-width: 512px)": {
          width: "calc(50% - 16px)",
        },
        "@media (min-width: 887px)": {
          width: "calc((100% / 3) - 16px)",
        },
        "@media (min-width: 1143px)": {
          width: "calc(25% - 16px)",
        },
        [`@media (min-width: ${isOpen ? "calc(1463px + 168px)" : "1463px"})`]: {
          maxWidth: 360,
        },
        // Sidebar opening in page after 1300px
        // Makes counting # of items in row hard without js
        // If drawer is open then its 1800px + (Drawer - MiniDrawer)
        // So 1800px + (240 - 72);
        // That'll dictate 4 vs 5 items without a ton of logic
        [`@media (min-width: ${isOpen ? "1968px" : "1800px"})`]: {
          width: "calc(20% - 16px)",
        },
        [`@media (min-width: ${isOpen ? "2303px" : "2135px"})`]: {
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
          bg="orange"
          to={`/watch/${videoId}`}
          sx={{cursor: 'pointer'}}
        >
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

        <Flex direction="column" pr={24}>
          <Text
            mt={12}
            mb={4}
            sx={{
              fontFamily: "Roboto, Arial, sans-serif",
              fontSize: 14,
              lineHeight: "20px",
              maxHeight: "40px",

              "@media (min-width: 1464px)": {
                fontSize: 16,
                lineHeight: "22px",
                maxHeight: "44px",
              },
            }}
            lineClamp={2}
            fw={500}
          >
            {title}
          </Text>
          <Text
            component="a"
            href=""
            fw={400}
            lh="20px"
            sx={{ wordBreak: "break-word", fontSize: 14, whiteSpace: "pre" }}
            color="#606060"
          >
            {channel}
          </Text>
          <Flex mah="40px">
            <Text color="#606060" lh="20px" size={14} fw={400}>
              {viewCount}
            </Text>
            <Text
              className="dateWrapper"
              color="#606060"
              lh="20px"
              size={14}
              fw={400}
            >
              {uploadDate}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
