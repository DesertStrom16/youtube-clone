import { Box, Button, Flex, Title, Drawer, FlexProps } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";

type Props = FlexProps  & {
  menuClickHandler: () => void;
};

export default function NavbarLeft(props: Props): JSX.Element {
  const { menuClickHandler, display = 'flex', ...flexProps } = props;

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
    <Box {...flexProps} display={display} mih="56px" sx={{alignItems: 'center'}}>
      <Button ml="16px" styles={menuButtonStyles} onClick={menuClickHandler}>
        <IconMenu2 size={24} />
      </Button>
      <Title size="h3" color="#FFFFFF" lh="normal">
        YT-Clone
      </Title>
    </Box>
  );
}