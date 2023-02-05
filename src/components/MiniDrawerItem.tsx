import { Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import { useMatch } from "react-router-dom";
import { DrawerItemProps as Props } from "../types/general";
import IconWrapper from "./IconWrapper";
import NavButton from "./NavButton";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

export default function MiniDrawerItem({
  text,
  icon,
  url,
}: Props): JSX.Element {
  let match = useMatch(url);
  return (
    <Box
      sx={{
        borderRadius: "10px",
      }}
    >
      <NavButton url={url}>
        <Flex
          w="100%"
          h="100%"
          px="0px"
          pt="16px"
          pb="14px"
          direction="column"
          justify="center"
          align="center"
          bg="transparent"
        >
          <IconWrapper match={match}>{icon}</IconWrapper>

          <Text fz={10} fw={400} mt={6} color="#FFFFFF">
            {text}
          </Text>
        </Flex>
      </NavButton>
    </Box>
  );
}
