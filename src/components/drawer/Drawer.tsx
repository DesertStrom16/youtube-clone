import { Box, Flex, ScrollArea } from "@mantine/core";
import { IconFile, IconHome, IconVideo } from "@tabler/icons-react";
import { useMatch } from "react-router-dom";
import DrawerItem from "./DrawerItem";
import ItemWrapper from "../ItemWrapper";
import NavbarLeft from "../navbar/NavbarLeft";

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
  let match = useMatch("/watch/:slug");

  return (
    <Flex
    >
      <Box
        pos="absolute"
        top={0}
        bottom={0}
        left={0}
        bg="rgba(0,0,0,0.5)"
        w="100%"
        h="100%"
        onClick={menuClickHandler}
        sx={{
          zIndex: 2000,
          visibility: isDrawer ? "visible" : "hidden",
          opacity: isDrawer ? 1 : 0,
          transitionDuration: isSmall ? "200ms" : "0ms",

          "@media (min-width: 1300px)": match
            ? {}
            : {
                visibility: "hidden",
                opacity: 0,
                transitionDuration: "0ms",
              },
        }}
      ></Box>
      <Flex
        h="100%"
        // BackgroundColorHere
        // bg="yellow"
        bg="#0f0f0f"
        pos="fixed"
        top={0}
        bottom={0}
        left={0}
        direction="column"
        sx={{
          zIndex: 2001,
          transitionDuration: isSmall ? "200ms" : "0ms",
          transform: isDrawer ? "translate3d(0,0,0)" : "translate3d(-100%,0,0)",

          "@media (min-width: 1300px)": match
            ? {}
            : {
                transitionDuration: "0ms",
                transform: isOpen
                  ? "translate3d(0,0,0)"
                  : "translate3d(-100%,0,0)",
              },
        }}
      >
        <Box mih="56px">
          <NavbarLeft
            // BackgroundColorHere
            // bg="red"
            display={{ base: "flex", lg: match ? "flex" : "none" }}
            menuClickHandler={menuClickHandler}
            isDrawer={isDrawer}
          />
        </Box>

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
            // TODO: 1200px Temporary!
            h="1200px"
            direction="column"
          >
            <ItemWrapper>
              <DrawerItem
                text="Home"
                url="/"
                icon={<IconHome size={24} stroke={1} />}
              />
              <DrawerItem
                text="Shorts"
                url="/search-results"
                icon={<IconVideo size={24} stroke={1} />}
              />
              <DrawerItem
                text="Subscriptions"
                url="/subscriptions"
                icon={<IconFile size={24} stroke={1} />}
              />
            </ItemWrapper>
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  );
}
