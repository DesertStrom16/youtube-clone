import { Box, Button, Flex, Loader, ScrollArea, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";
import { fetchVideos } from "../utils/API";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Navbar from "./navbar/Navbar";
import Drawer from "./drawer/Drawer";
import MiniDrawer from "./drawer/MiniDrawer";
import GridItem from "./GridItem";
import { useGetHomeQuery } from "../services/home";
import { mdMin, smMin, xsMin } from "../utils/breakpoints";
import GridItemSkeleton from "./GridItemSkeleton";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  isOpen: boolean;
  numBlocks: number;
};

export default function GridContinuation({
  isOpen,
  numBlocks,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  //   const {
  //     data: homeData,
  //     isLoading,
  //     isFetching,
  //     isError,
  //     //@ts-expect-error
  //   } = useGetHomeQuery(null);

  return (
    <>
      {numBlocks > 0 && (
        <>
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
        </>
      )}
      {numBlocks > 1 && (
        <>
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
        </>
      )}
    </>
  );
}
