import { Box, Button, Flex, Title, Drawer } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useMatch } from "react-router-dom";
import NavbarLeft from "./NavbarLeft";
import SearchBar from "../search/SearchBar";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import useIsTouchscreen from "../../hooks/use-is-touchscreen";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setActiveVideo } from "../../store/dataSlice";

type Props = {
  menuClickHandler: () => void;
};

export default function Navbar(props: Props): JSX.Element {
  const { menuClickHandler } = props;
  const dispatch = useAppDispatch();
  let match = useMatch("/watch/:slug");
  const [searchOpen, setSearchOpen] = useState(false);
  const isTouchScreen = useIsTouchscreen();
  const activeVideoId = useAppSelector((state) => state.data.activeVideoId);
  const isRedirect = useAppSelector((state) => state.data.isRedirect);
  const maxWidthBreakpoint = useMediaQuery(`(max-width: 656px)`);

  useEffect(() => {
    if (!maxWidthBreakpoint) {
      setSearchOpen(false);
    }
  }, [maxWidthBreakpoint]);

  useEffect(() => {
    if (!isTouchScreen && activeVideoId) {
      dispatch(setActiveVideo({ activeVideoId: undefined }));
    }
  }, [isTouchScreen, activeVideoId]);

  return (
    <Flex
      w="calc(100% - 16px)"
      h="56px"
      pr="16px"
      pos="fixed"
      align="center"
      justify="space-between"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="#0f0f0f"
      sx={{
        zIndex: 2000,
        "@media (min-width: 1300px)": match
          ? {}
          : {
              zIndex: 2099,
            },
        "@media (max-width: 656px)": {
          paddingRight: 8,
        },

        "@media (pointer:coarse)": {
          width: "100%",
        },
      }}
    >
      <NavbarLeft
        // BackgroundColorHere
        // bg="orange"
        menuClickHandler={menuClickHandler}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />

      <SearchBar searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    </Flex>
  );
}
