import { Box, Button, Flex, Title, ScrollArea } from "@mantine/core";
import { useMatch, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MiniDrawer from "./drawer/MiniDrawer";
import Drawer from "./drawer/Drawer";
import Navbar from "./navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import { setSearchPaginateLoading } from "../store/data/dataSlice";
import {
  useGetSearchQuery,
} from "../services/search";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = React.PropsWithChildren & {
  isOpen: boolean;
  isSmall: boolean;
  isDrawer: boolean;
  matches: boolean;
  setIsDrawer: SetState;
  setIsSmall: SetState;
  setIsOpen: SetState;
  socketRef: React.MutableRefObject<any>;
};

export default function AppBar({
  children,
  isOpen,
  isSmall,
  isDrawer,
  matches,
  setIsDrawer,
  setIsSmall,
  setIsOpen,
  socketRef,
}: Props): JSX.Element {
  const query = window.location.pathname
    .replace("/search/", "")
    .replace("/", "");
  const dispatch = useAppDispatch();

  const searchPaginateLoading = useAppSelector(
    (state) => state.data.searchPaginateLoading
  );
  const searchPaginateError = useAppSelector(
    (state) => state.data.searchPaginateError
  );

  const { data: searchData } = useGetSearchQuery(query, {
    skip: query === "",
  });

  let match = useMatch("/watch/:slug");
  let searchMatch = useMatch("/search/:slug");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const menuClickHandler = () => {
    if (!matches || match) {
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
      console.log("FIRE PAGINATE REQUEST", query);

      // getContinuation({
      //   client: searchData.client,
      //   key: searchData.key,
      //   token: searchData.tokens[0],
      // });

      // dispatch(setSearchPaginateLoading(true));

      // // Emit socket event
      // if (searchData && searchData.content && searchData.content.length > 0) {
      //   const { token } = searchData.content[searchData.content.length - 1];
      //   const { client, key } = searchData;

      //   // Paginate infinite scroll
      //   socketRef.current?.emit("getPaginateSearch", {
      //     client: client,
      //     token: token,
      //     key: key,
      //   });
      // }
    }
  };

  return (
    <ScrollArea
      style={{ height: "100%", width: "100%" }}
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
        },
        thumb: {
          background: "hsl(0,0%,67%)",

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
        mih="100vh"
        h="100vh"
        maw="100vw"
        pos={{
          base: isDrawer ? "fixed" : "relative",
          lg: isDrawer && match ? "fixed" : "relative",
        }}
        pr={12}
        top={0}
        left={0}
        right={0}
        bottom={0}
      >
        <Flex w="100%" h="100%" direction="column" pos="relative">
          <Navbar menuClickHandler={menuClickHandler} />

          <Flex h="100%">
            <MiniDrawer isOpen={isOpen} isDisplayed={!match} />
            <Drawer
              menuClickHandler={menuClickHandler}
              isOpen={match ? false : isOpen}
              isDrawer={isDrawer}
              isSmall={match ? true : isSmall}
            />

            <Flex
              mt={56}
              ml={match ? 0 : { base: 0, sm: 72, lg: isOpen ? 240 : 72 }}
              w="100%"
              h="fit-content"
              bg="green"
              ref={wrapperRef}
              justify="center"
            >
              {children}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ScrollArea>
  );
}
