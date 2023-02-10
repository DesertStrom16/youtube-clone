import { Box, Flex } from "@mantine/core";
import { IconHome, IconVideo } from "@tabler/icons-react";
import MiniDrawerItem from "./MiniDrawerItem";

type Props = {
  isOpen: boolean;
  isDisplayed: boolean;
};

export default function MiniDrawer({ isOpen, isDisplayed }: Props): JSX.Element {
  return (
    <Box
      h="100%"
      bg="blue"
      px="4px"
      pt="60px"
      w="72px"
      pos='fixed'
      top={0}
      left={0}
      right={0}
      bottom={0}
      display={isDisplayed ? { base: "none", sm: "flex", lg: isOpen ? "none" : "flex" } : 'none'}
      sx={{ flexDirection: "column" }}
    >
      <MiniDrawerItem text="Home" url="/" icon={<IconHome size={24} />} />
      <MiniDrawerItem
        text="Shorts"
        url="/search-results"
        icon={<IconVideo size={24} />}
      />
    </Box>
  );
}
