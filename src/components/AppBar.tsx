import { Box, Button, Flex, Title, ScrollArea } from "@mantine/core";
import { useMatch } from "react-router-dom";
import MiniDrawer from "./MiniDrawer";
import Drawer from "./Drawer";
import Navbar from "./Navbar";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = React.PropsWithChildren & {
  isOpen: boolean;
  isSmall: boolean;
  isDrawer: boolean;
  matches: boolean;
  setIsDrawer: SetState;
  setIsSmall: SetState;
  setIsOpen: SetState;
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
}: Props): JSX.Element {
  let match = useMatch("/watch/:slug");

  const menuClickHandler = () => {
    if (!matches || match) {
      setIsDrawer(!isDrawer);
      setIsSmall(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

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
            >
              {children}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ScrollArea>
  );
}
