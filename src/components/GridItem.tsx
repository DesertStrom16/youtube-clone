import { Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import IconWrapper from "./IconWrapper";
import NavButton from "./NavButton";
import "./GridItem.css";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  isOpen: boolean;
};

// Unsure on :active styling, may revert back to mantine
export default function GridItem({ isOpen }: Props): JSX.Element {
  return (
    <Flex
      h="fit-content"
      w="calc(100% - 16px)"
      direction="column"
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
      <Flex
        direction="row"
        sx={{
          margin: "0px 12px",
          cursor: "pointer",
          "@media (min-width: 392px)": {
            margin: 0,
          },
        }}
      >
        <UnstyledButton
          component="a"
          href={""}
          h={36}
          mt={12}
          mr={12}
          display="inline-block"
          sx={{ cursor: "pointer" }}
        >
          <Box
            bg="rgba(0,0,0,0.1)"
            w={36}
            h={36}
            sx={{ overflow: "hidden", borderRadius: "50%" }}
          ></Box>
        </UnstyledButton>
        <Text
          sx={{
            fontFamily: "Roboto, Arial, sans-serif",
            fontSize: 14,
            lineHeight: "2rem",
            maxHeight: "4rem",

            "@media (min-width: 1464px)": {
              fontSize: 16,
              lineHeight: "2.2rem",
              maxHeight: "4.4rem",
            },
          }}
          lineClamp={2}
          fw={500}
        >
          Test Title Here and It Happens To Overflow like this
        </Text>
      </Flex>
    </Flex>
  );
}
