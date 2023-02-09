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
      pos='fixed'
      top={0}
      left={0}
      right={0}
      bottom={0}
      sx={{
        zIndex: 2000,
        "@media (min-width: 1300px)": {
          zIndex: 2099,
        },
      }}
    >
      <NavbarLeft bg="orange" menuClickHandler={menuClickHandler} />
    </Flex>
  );
}
