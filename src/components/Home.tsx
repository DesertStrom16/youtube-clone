import {
  Box,
  Button,
  Flex,
  Title,
  Drawer,
  Anchor,
  Text,
  ScrollArea,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";
import { fetchVideos } from "../utils/API";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { IconHome, IconVideo } from "@tabler/icons-react";
import Navbar from "./Navbar";
import DrawerItem from "./DrawerItem";

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.data.videos);
  const loading = useAppSelector((state) => state.data.loading);
  const [isOpen, setIsOpen] = useState(true);
  const [isDrawer, setIsDrawer] = useState(false);

  const matches = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    if (!matches) {
      setIsDrawer(false);
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

  return (
    <Flex bg="#0f0f0f" mih="100vh" direction="column">
      {matches && (
        <Drawer
          opened={isDrawer}
          onClose={() => {
            setIsDrawer(false);
          }}
          transitionDuration={isDrawer ? 300 : matches ? 300 : 0}
          title="Register"
          padding="xl"
          size="xl"
        >
          {/* Drawer content */}
        </Drawer>
      )}

      <Navbar
        setIsDrawer={setIsDrawer}
        setIsOpen={setIsOpen}
        isDrawer={isDrawer}
        isOpen={isOpen}
        matches={matches}
      />

      <Flex>
        <Flex
          miw={{ base: "0px", sm: "72px", lg: isOpen ? "240px" : "72px" }}
          w={{ base: "0px" }}
          h="700px"
          bg="blue"
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
            <Flex w="100%" h="1200px" direction="column">
              <Flex
                w="100%"
                direction="column"
                p="12px"
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,.2)",
                }}
              >
                <DrawerItem text="Home" activeUrl='/' icon={<IconHome size={24} />} />
                <DrawerItem text="Shorts" activeUrl='/search-results' icon={<IconVideo size={24} />} />
              </Flex>
            </Flex>
          </ScrollArea>
        </Flex>

        <Flex w="100%" h="700px" bg="green"></Flex>
      </Flex>
    </Flex>
  );
}
