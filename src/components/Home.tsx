import { Box, Button, Flex, Title, Text, ScrollArea } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";
import { fetchVideos } from "../utils/API";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { IconHome, IconVideo } from "@tabler/icons-react";
import Navbar from "./Navbar";
import DrawerItem from "./DrawerItem";
import Drawer from "./Drawer";
import MiniDrawer from "./MiniDrawer";

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
  console.log(isOpen)
  return (
    <Flex bg="#0f0f0f" mih="100vh" direction="column">
      <Navbar
        setIsDrawer={setIsDrawer}
        setIsSmall={setIsSmall}
        setIsOpen={setIsOpen}
        isDrawer={isDrawer}
        isOpen={isOpen}
        matches={matches}
      />

      <Flex sx={{position: 'relative'}}>
        <Drawer isOpen={isOpen} isDrawer={isDrawer} isSmall={isSmall} />
        <Flex w="100%" h="700px" bg="green"></Flex>
      </Flex>
    </Flex>
  );
}

// {!matches && (
//   <Drawer
//     opened={isDrawer}
//     onClose={() => {
//       setIsDrawer(false);
//     }}
//     transitionDuration={isDrawer ? 300 : !matches ? 300 : 0}
//     title="Menu Drawer"
//     size={240}
//   >
//     {/* Drawer content */}
//   </Drawer>
// )}
