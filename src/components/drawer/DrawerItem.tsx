import { Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import { useMatch } from "react-router-dom";
import { DrawerItemProps as Props } from "../../types/general";
import IconWrapper from "../IconWrapper";
import NavButton from "../navbar/NavButton";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

// Unsure on :active styling, may revert back to mantine
export default function DrawerItem({ text, icon, url }: Props): JSX.Element {
  let match = useMatch(url);

  return (
    <Box
      h="40px"
      sx={{
        /* Active Link */
        backgroundColor: match ? "rgba(255,255,255,.1)" : "transparent",
        borderRadius: "10px",
      }}
    >
      <NavButton url={url}>
        <Flex
          w="100%"
          h="100%"
          px="12px"
          direction="row"
          justify="flex-start"
          align="center"
          bg="transparent"
        >
          <IconWrapper match={match}>{icon}</IconWrapper>
          <Text fz={14} fw={600} ml={24} color="#FFFFFF">
            {text}
          </Text>
        </Flex>
      </NavButton>
    </Box>
  );
}
