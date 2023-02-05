import { Box, Flex } from "@mantine/core";
import { IconHome, IconVideo } from "@tabler/icons-react";
import MiniDrawerItem from "./MiniDrawerItem";

type Props = {
  isOpen: boolean;
};

export default function MiniDrawer({ isOpen }: Props): JSX.Element {
  return (
    <Box
      h="700px"
      bg="blue"
      display={{ base: "none", sm: "flex", lg: isOpen ? "none" : "flex" }}
    >
      <Flex w="72px" px="4px" pt="4px" direction="column">
        <MiniDrawerItem text="Home" url="/" icon={<IconHome size={24} />} />
        <MiniDrawerItem
          text="Shorts"
          url="/search-results"
          icon={<IconVideo size={24} />}
        />
      </Flex>
    </Box>
  );
}
