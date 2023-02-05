import { Box, Button, Flex, Title, Drawer } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  setIsDrawer: SetState;
  setIsSmall: SetState;
  setIsOpen: SetState;
  isDrawer: boolean;
  isOpen: boolean;
  matches: boolean;
};

export default function Navbar(props: Props): JSX.Element {
  const { setIsDrawer, setIsOpen, setIsSmall, isDrawer, isOpen, matches } = props;
  const menuClickHandler = () => {
    if (!matches) {
      setIsDrawer(!isDrawer);
      setIsSmall(true);
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
    <Flex bg="blue" w="100%" h="56px" px="16px" align="center">
      <Button styles={menuButtonStyles} onClick={menuClickHandler}>
        <IconMenu2 size={24} />
      </Button>
      <Title size="h3" color="#FFFFFF" lh="normal">
        YT-Clone
      </Title>
    </Flex>
  );
}
