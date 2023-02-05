import { Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import { useMatch } from "react-router-dom";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;
type RouteType = "/" | "/search-results";

type Props = {
  url: RouteType;
  text: string;
  icon: JSX.Element;
};

// Unsure on :active styling, may revert back to mantine
export default function DrawerItem({
  text,
  icon,
  url,
}: Props): JSX.Element {
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
      <UnstyledButton
        component="a"
        href={url}
        w="100%"
        h="100%"
        display="block"
        p={0}
        sx={{
          backgroundColor: "rgba(255,255,255,0)",
          borderRadius: "10px",
          transition: "background 0.3s ease",
          color: "#FFFFFF",

          "&:hover": {
            backgroundColor: "rgba(255,255,255,.1)",
          },
          "&:active": {
            backgroundColor: "rgba(255,255,255,.2)",
            transition: "background 0s ease",
          },
        }}
      >
        <Flex
          w="100%"
          h="100%"
          px="12px"
          direction="row"
          justify="flex-start"
          align="center"
          bg="transparent"
        >
          {icon}
          <Text fz={14} fw={600} ml={24} color="#FFFFFF">
            {text}
          </Text>
        </Flex>
      </UnstyledButton>
    </Box>
  );
}
