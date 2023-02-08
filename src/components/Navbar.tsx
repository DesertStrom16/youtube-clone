import { Box, Button, Flex, Title, Drawer } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import NavbarLeft from "./NavbarLeft";

type Props = {
  menuClickHandler: () => void;
};

export default function Navbar(props: Props): JSX.Element {
  const { menuClickHandler } = props;

  return (
    <Flex
      bg="blue"
      w="100%"
      h="56px"
      pr="16px"
      sx={{
        zIndex: 0,
        "@media (min-width: 1300px)": {
          zIndex: 99,
        },
      }}
    >
      <NavbarLeft bg="orange" menuClickHandler={menuClickHandler} />
    </Flex>
  );
}
