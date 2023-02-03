import { Box, Button, Flex, Title, Drawer } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";
import { fetchVideos } from "../utils/API";
import { IconMenu2 } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.data.videos);
  const loading = useAppSelector((state) => state.data.loading);
  const [isOpen, setIsOpen] = useState(true);
  const [isDrawer, setIsDrawer] = useState(false);

  const { width } = useViewportSize();
  const matches = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    if (width > 1200) {
      setIsDrawer(false);
    }
  }, [width]);

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
    if (matches) {
      setIsDrawer(!isDrawer);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const menuButtonStyles = () => ({
    root: {
      border: 0,
      paddingLeft: 0,
      paddingRight: 0,
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 14,

      "&:hover": {
        border: 0,
        backgroundColor: "rgba(255,255,255,.1)",
      },
    },
  });

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

      <Flex bg="blue" w="100%" h="56px" px="16px" align="center">
        <Button styles={menuButtonStyles} onClick={menuClickHandler}>
          <IconMenu2 size={24} />
        </Button>
        <Title size="h3" color="#FFFFFF" lh="normal">
          YT-Clone
        </Title>
      </Flex>

      <Flex>
        <Flex
          miw={{ base: "0px", sm: "72px", lg: isOpen ? "240px" : "72px" }}
          w={{ base: "0px" }}
          h="500px"
          bg="blue"
        ></Flex>

        <Flex w="100%" h="500px" bg="green"></Flex>
      </Flex>
    </Flex>
  );
}
