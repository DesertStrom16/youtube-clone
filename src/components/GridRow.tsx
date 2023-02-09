import { Box, Button, Flex, Text } from "@mantine/core";
import IconWrapper from "./IconWrapper";
import NavButton from "./NavButton";
import "./GridRow.css";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  isOpen: boolean;
};

// Unsure on :active styling, may revert back to mantine
export default function GridRow({ isOpen }: Props): JSX.Element {
  return (
    <Flex
      h="fit-content"
      w="calc(100% - 16px)"
      maw={320}
      sx={{
        "@media (min-width: 512px)": {
          width: "calc(50% - 16px)",
        },
        "@media (min-width: 887px)": {
          width: "calc((100% / 3) - 16px)",
        },
        "@media (min-width: 1143px)": {
          width: "calc(25% - 16px)",
        },
        [`@media (min-width: ${isOpen ? "calc(1463px + 168px)" : "1463px"})`]: {
          maxWidth: 360,
        },
        // Sidebar opening in page after 1300px
        // Makes counting # of items in row hard without js
        // Maybe have a query for 1800px if the drawer is closed
        // If drawer is open then its 1800px + (Drawer - MiniDrawer)
        // So 1800px + (240 - 72);
        // That'll dictate 4 vs 5 items without a ton of logic
        [`@media (min-width: ${isOpen ? "1968px" : "1800px"})`]: {
          width: "calc(20% - 16px)",
        },
        [`@media (min-width: ${isOpen ? "2303px" : "2135px"})`]: {
          width: "calc((100% / 6) - 16px)",
        },
      }}
      mb={40}
      mx={8}
    >
      <div className="image-wrapper">
        <Flex
          w="100%"
          h="100%"
          pos="absolute"
          top={0}
          bottom={0}
          left={0}
          bg="orange"
        ></Flex>
      </div>
    </Flex>
  );
}
