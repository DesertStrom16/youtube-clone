import { Box, Button, Flex, Title, ScrollArea } from "@mantine/core";
import { useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MiniDrawer from "./drawer/MiniDrawer";
import Drawer from "./drawer/Drawer";
import Navbar from "./navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import { useGetSearchQuery } from "../services/search";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = React.PropsWithChildren & {
  isOpen: boolean;
  isSmall: boolean;
  isDrawer: boolean;
  minWidth1300: boolean;
  setIsDrawer: SetState;
  setIsSmall: SetState;
  setIsOpen: SetState;
};

export default function AppBar({
  children,
  isOpen,
  isSmall,
  isDrawer,
  minWidth1300,
  setIsDrawer,
  setIsSmall,
  setIsOpen,
}: Props): JSX.Element {
  const homeMatch = useMatch("");
  const videoMatch = useMatch("/watch/:slug");
  const searchMatch = useMatch("/search/:slug");
  let query = searchMatch?.pathname.replace("/search/", "").replace("/", "");
  const dispatch = useAppDispatch();

  const searchPaginateLoading = useAppSelector(
    (state) => state.data.searchPaginateLoading
  );
  const searchPaginateError = useAppSelector(
    (state) => state.data.searchPaginateError
  );

  //@ts-expect-error
  const { data: searchData } = useGetSearchQuery(query, {
    skip: !query || query === "",
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (homeMatch) {
      setIsDrawer(false);
      if (minWidth1300) {
        setIsSmall(false);
      }
    }
  }, [homeMatch]);

  useEffect(() => {
    if (videoMatch) {
      setIsDrawer(false);
      setIsSmall(false);
    }
  }, [videoMatch]);

  const menuClickHandler = () => {
    if (!minWidth1300 || videoMatch) {
      setIsDrawer(!isDrawer);
      setIsSmall(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleScrollSearch = ({ x, y }: { x: number; y: number }) => {
    let divHeight = wrapperRef.current?.getBoundingClientRect().height;

    // 46: 56px for navbar minus a 10px buffer
    if (
      searchData &&
      !searchPaginateLoading &&
      !searchPaginateError &&
      y > 0 &&
      divHeight &&
      divHeight - window.innerHeight + 46 < y
    ) {
      // Paginate onScroll Handler Here
      // console.log("FIRE PAGINATE REQUEST", query);
    }
  };

  return (
    <ScrollArea.Autosize
      maxHeight="100vh"
      sx={{ flex: 1 }}
      style={{ height: "100%", width: "100%" }}
      scrollbarSize={16}
      bg="#0f0f0f"
      scrollHideDelay={0}
      type="always"
      onScrollPositionChange={searchMatch ? handleScrollSearch : undefined}
      styles={() => ({
        scrollbar: {
          "&, &:hover": {
            background: "transparent",
          },
          "&:hover > .mantine-ScrollArea-thumb": {
            background: "#717171",
          },
          padding: 0,
        },
        thumb: {
          background: "hsl(0,0%,67%)",
          border: "4px solid #0f0f0f",

          "&:hover": {
            background: "#717171",
          },
        },
        corner: {
          background: "transparent",
          height: "0px",
        },
      })}
    >
      <Flex
        bg="#0f0f0f"
        w="100%"
        h="100%"
        mih='100vh'
        pos={{
          base: isDrawer ? "fixed" : "relative",
          lg: isDrawer && videoMatch ? "fixed" : "relative",
        }}
        pr={16}
        top={0}
        left={0}
        right={0}
        bottom={0}
      >
        <Flex w="100%" h="100%" direction="column" pos="relative">
          <Navbar menuClickHandler={menuClickHandler} />

          <Flex h="100%">
            <MiniDrawer isOpen={isOpen} isDisplayed={!videoMatch} />
            <Drawer
              menuClickHandler={menuClickHandler}
              isOpen={videoMatch ? false : isOpen}
              isDrawer={isDrawer}
              isSmall={isSmall}
            />

            <Flex
              mt={56}
              ml={videoMatch ? 0 : { base: 0, sm: 72, lg: isOpen ? 240 : 72 }}
              w="100%"
              h="fit-content"
              // BackgroundColorHere
              // bg="green"
              ref={wrapperRef}
              justify="center"
            >
              {children}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ScrollArea.Autosize>
  );
}
