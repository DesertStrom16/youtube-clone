import { Box, Flex } from "@mantine/core";
import { IconHome, IconVideo } from "@tabler/icons-react";
import MiniDrawerItem from "./MiniDrawerItem";

type Props = {
  isOpen: boolean;
  isDisplayed: boolean;
};

export default function MiniDrawer({
  isOpen,
  isDisplayed,
}: Props): JSX.Element {
  return (
    <Box
      h="100%"
      // BackgroundColorHere
      // bg="blue"
      px="4px"
      pt="60px"
      w="72px"
      pos="fixed"
      top={0}
      left={0}
      display={
        isDisplayed
          ? { base: "none", sm: "flex", lg: isOpen ? "none" : "flex" }
          : "none"
      }
      sx={{
        flexDirection: "column",

        "@media (pointer:coarse)": {
          width: "100%",
          height: 48,
          borderTop: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          flexDirection: "row",
          top: "auto",
          bottom: 0,
          padding: 0,
          boxSizing: "content-box",
          backgroundColor: 'rgb(15,15,15)'
        },
      }}
    >
      <MiniDrawerItem
        text="Home"
        url="/"
        icon={<IconHome size={24} stroke={1} />}
      />
      <MiniDrawerItem
        text="Shorts"
        url="/search-results"
        icon={<IconVideo size={24} stroke={1} />}
      />
    </Box>
  );
}
