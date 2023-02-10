import { Box, Button, Flex, Title, Drawer } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useMatch } from "react-router-dom";
import NavbarLeft from "./NavbarLeft";

type Props = {
  menuClickHandler: () => void;
};

export default function Navbar(props: Props): JSX.Element {
  const { menuClickHandler } = props;
  let match = useMatch("/watch/:slug");

  return (
    <Flex
      bg="blue"
      w="calc(100% - 12px)"
      h="56px"
      pr="16px"
      pos="fixed"
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
      }}
    >
      <NavbarLeft bg="orange" menuClickHandler={menuClickHandler} />
    </Flex>
  );
}
