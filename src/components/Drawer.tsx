import { Box, Button, Flex, Title, Text, ScrollArea } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";
import { fetchVideos } from "../utils/API";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { IconHome, IconVideo } from "@tabler/icons-react";
import Navbar from "./Navbar";
import DrawerItem from "./DrawerItem";

type Props = {
  isOpen: boolean;
  isDrawer: boolean;
  isSmall: boolean;
};

export default function Drawer({ isOpen, isDrawer, isSmall }: Props): JSX.Element {
  const matches = useMediaQuery("(min-width: 1200px)");

  return (
    <Flex
      h="700px"
      bg="blue"
      pos="absolute"
      top={0}
      bottom={0}
      left={0}
      sx={{
        transitionDuration: matches ? "0ms" : isSmall ? "200ms" : "0ms",
        transform: isDrawer || (isOpen && matches)
          ? "translate3d(0,0,0)"
          : "translate3d(-100%,0,0)",
      }}
    >
      <ScrollArea
        style={{ height: "100%", width: "100%" }}
        scrollHideDelay={0}
        offsetScrollbars={true}
        styles={() => ({
          scrollbar: {
            "&, &:hover": {
              background: "transparent",
            },
            "&:hover > .mantine-ScrollArea-thumb": {
              background: "#717171",
            },
          },
          thumb: {
            background: "#717171",
          },
        })}
      >
        <Flex
          w="228px"
          // 1200px Temporary!
          h="1200px"
          direction="column"
        >
          <Flex
            w="100%"
            direction="column"
            p="12px"
            sx={{ borderBottom: "1px solid rgba(255,255,255,.2)" }}
          >
            <DrawerItem text="Home" url="/" icon={<IconHome size={24} />} />
            <DrawerItem
              text="Shorts"
              url="/search-results"
              icon={<IconVideo size={24} />}
            />
          </Flex>
        </Flex>
      </ScrollArea>
    </Flex>
  );
}
