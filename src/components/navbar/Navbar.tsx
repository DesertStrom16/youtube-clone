import { Box, Button, Flex, Title, Drawer } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useMatch } from "react-router-dom";
import NavbarLeft from "./NavbarLeft";
import SearchBar from "../SearchBar";

type Props = {
  menuClickHandler: () => void;
};

export default function Navbar(props: Props): JSX.Element {
  const { menuClickHandler } = props;
  let match = useMatch("/watch/:slug");

  return (
    <Flex
      bg="#fff"
      // bg="blue"
      w="calc(100% - 12px)"
      h="56px"
      pr="16px"
      pos="fixed"
      align="center"
      justify="space-between"
      top={0}
      left={0}
      right={0}
      bottom={0}
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
      }}
    >
      <NavbarLeft bg="orange" menuClickHandler={menuClickHandler} />

      <SearchBar />
      <Flex miw={225}></Flex>
    </Flex>
  );
}
