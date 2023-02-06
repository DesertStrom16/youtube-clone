import { Box, Button, Flex, Title, Text, ScrollArea } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";
import { fetchVideos } from "../utils/API";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import MiniDrawer from "./MiniDrawer";

// type SetState = React.Dispatch<React.SetStateAction<boolean>>;

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.data.videos);
  const loading = useAppSelector((state) => state.data.loading);
  const [isOpen, setIsOpen] = useState(true);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const matches = useMediaQuery("(min-width: 1200px)");

  useEffect(() => {
    if (matches) {
      setIsDrawer(false);
      setIsSmall(false);
    }
  }, [matches]);

  const fetchVideosHandler = async () => {
    dispatch(setLoading(true));

    try {
      let videos = await fetchVideos();

      if (videos) {
        dispatch(setVideos(videos));
      }
    } catch (e) {
      dispatch(setLoading(false));
    }
  };

  const menuClickHandler = () => {
    if (!matches) {
      setIsDrawer(!isDrawer);
      setIsSmall(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Flex bg="#0f0f0f" mih="100vh" h="100vh" direction="column" pos="relative">
      <Navbar menuClickHandler={menuClickHandler} />

      <Flex h="100%">
        <MiniDrawer isOpen={isOpen} />
        <Drawer
          menuClickHandler={menuClickHandler}
          isOpen={isOpen}
          isDrawer={isDrawer}
          isSmall={isSmall}
        />
        <Flex
          pl={{ base: 0, lg: isOpen ? 240 : 0 }}
          w="100%"
          h="100%"
          bg="green"
        >
         
        </Flex>
      </Flex>
    </Flex>
  );
}
