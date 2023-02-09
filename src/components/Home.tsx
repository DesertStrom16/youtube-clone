import { Box, Button, Flex, ScrollArea } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";
import { fetchVideos } from "../utils/API";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import MiniDrawer from "./MiniDrawer";
import GridItem from "./GridItem";

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

  const dummyArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <ScrollArea
      style={{ height: "100%", width: "100%" }}
      bg="#0f0f0f"
      scrollHideDelay={0}
      type="always"
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
          background: 'transparent',
          height: '0px'
        }
      })}
    >
      <Flex
        bg="#0f0f0f"
        mih="100vh"
        h="100vh"
        maw="100vw"
        pos={{ base: isDrawer ? "fixed" : "relative", lg: "relative" }}
        pr={12}
        top={0}
        left={0}
        right={0}
        bottom={0}
      >
        <Flex w="100%" h="100%" direction="column" pos="relative">
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
              pt={24}
              mt={56}
              ml={{ base: 0, sm: 72, lg: isOpen ? 240 : 72 }}
              w="100%"
              h='fit-content'
              bg="pink"
              justify="center"
              sx={{
                overflowX: "visible",
                // overflowY: "scroll",

                "@media (max-width: 600px)": {
                  overflowX: "clip",
                },
              }}
            >
              <Flex
                bg="red"
                w="100%"
                h="fit-content"
                wrap="wrap"
                sx={{
                  maxWidth: "calc(320px + 16px)",
                  justifyContent: "center",

                  "@media (max-width: 600px)": {
                    // Removes side margins to fit more on small screens
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
                  [`@media (min-width: ${isOpen ? "1968px" : "1800px"})`]: {
                    maxWidth: "calc((360px + 16px) * 5)",
                  },
                  [`@media (min-width: ${isOpen ? "2303px" : "2135px"})`]: {
                    maxWidth: "calc((360px + 16px) * 6)",
                  },
                }}
              >
                {dummyArray.map(() => (
                  <GridItem isOpen={isOpen} />
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ScrollArea>
  );
}
