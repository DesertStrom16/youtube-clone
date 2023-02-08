import { Box, Button, Flex, Title, Text, ScrollArea } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";
import { fetchVideos } from "../utils/API";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import MiniDrawer from "./MiniDrawer";
import GridRow from "./GridRow";

// type SetState = React.Dispatch<React.SetStateAction<boolean>>;

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.data.videos);
  const loading = useAppSelector((state) => state.data.loading);
  const [isOpen, setIsOpen] = useState(true);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const matches = useMediaQuery("(min-width: 1300px)");

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
    <Flex
      bg="#0f0f0f"
      mih="100vh"
      h="100vh"
      maw="100vw"
      direction="column"
      pos="relative"
    >
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
          pt={24}
          w="100%"
          h="100%"
          bg="green"
          justify="center"
          sx={{
            overflow: "visible",

            "@media (max-width: 600px)": {
              overflow: "hidden",
            },
          }}
        >
          <Flex
            bg="red"
            w="100%"
            wrap="wrap"
            // Removes side margins to fit more on small screens
            sx={{
              maxWidth: "calc(320px + 16px)",
              justifyContent: "center",

              "@media (max-width: 600px)": {
                margin: "0 -8px",
                width: "calc(100% + 16px)",
              },
              "@media (min-width: 601px)": {
                margin: "0px 16px",
              },
              "@media (min-width: 512px)": {
                maxWidth: "calc((320px + 16px) * 2)",
                justifyContent: "flex-start",
              },
              "@media (min-width: 887px)": {
                maxWidth: "calc((320px + 16px) * 3)",
              },
              "@media (min-width: 1143px)": {
                maxWidth: "calc((320px + 16px) * 4)",
              },
              [`@media (min-width: ${
                isOpen ? "calc(1463px + 168px)" : "1463px"
              })`]: {
                maxWidth: "calc((360px + 16px) * 4)",
              },
              [`@media (min-width: ${isOpen ? "1868px" : "1800px"})`]: {
                maxWidth: "calc((360px + 16px) * 5)",
              },
            }}
          >
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map(() => (
              <GridRow isOpen={isOpen} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
