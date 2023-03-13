import { Box, Button, Flex } from "@mantine/core";
import { useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MiniDrawer from "./drawer/MiniDrawer";
import Drawer from "./drawer/Drawer";
import Navbar from "./navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from '@mantine/hooks';
import ScrollBarWrapper from "./ScrollBarWrapper";

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
  const dispatch = useAppDispatch();
  const homeMatch = useMatch("");
  const videoMatch = useMatch("/watch/:slug");
  // const isTouchScreen = useMediaQuery('(pointer:coarse)');

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

  return (
    <ScrollBarWrapper>
      <Flex
        bg="#0f0f0f"
        w="100%"
        maw='100vw'
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
      </ScrollBarWrapper>
  );
}
