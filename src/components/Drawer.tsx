import { Box, Button, Flex, Title, Text, ScrollArea } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";
import { fetchVideos } from "../utils/API";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { IconFile, IconHome, IconVideo } from "@tabler/icons-react";
import DrawerItem from "./DrawerItem";
import ItemWrapper from "./ItemWrapper";
import NavbarLeft from "./NavbarLeft";

type Props = {
  isOpen: boolean;
  isDrawer: boolean;
  isSmall: boolean;
  menuClickHandler: () => void;
};

export default function Drawer({
  isOpen,
  isDrawer,
  isSmall,
  menuClickHandler,
}: Props): JSX.Element {
  const matches = useMediaQuery("(min-width: 1200px)");

  return (
    <Flex
      h="100%"
      bg="yellow"
      pos="absolute"
      top={0}
      bottom={0}
      left={0}
      direction="column"
      sx={{
        transitionDuration: matches ? "0ms" : isSmall ? "200ms" : "0ms",
        transform:
          isDrawer || (isOpen && matches)
            ? "translate3d(0,0,0)"
            : "translate3d(-100%,0,0)",
      }}
    >
      <NavbarLeft
        bg="red"
        display={{base: 'flex', lg: 'none'}}
        menuClickHandler={menuClickHandler}
      />
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
          // FIXME: 1200px Temporary!
          h="1200px"
          direction="column"
        >
          <ItemWrapper>
            <DrawerItem text="Home" url="/" icon={<IconHome size={24} />} />
            <DrawerItem
              text="Shorts"
              url="/search-results"
              icon={<IconVideo size={24} />}
            />
            <DrawerItem
              text="Subscriptions"
              url="/subscriptions"
              icon={<IconFile size={24} />}
            />
          </ItemWrapper>
        </Flex>
      </ScrollArea>
    </Flex>
  );
}
